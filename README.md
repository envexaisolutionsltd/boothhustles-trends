# Product Trends Dashboard

An e-com product research dashboard for UK reselling. Type a keyword, pull Google
Trends demand data (via SerpApi) and live eBay UK listing data through Supabase Edge
Functions, and get a rules-based Sell/Skip read — plus an AI research assistant that
sees what's on screen.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase (Postgres + Edge Functions) for storage and the SerpApi/eBay proxy
- Recharts for charts
- OpenAI API for the sliding research assistant

## Structure

```
├── app/
│   ├── api/agent/route.ts   # chat endpoint for the sliding assistant
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx             # renders Dashboard
├── Dashboard/
│   ├── Dashboard.tsx        # page layout: search, verdict, stats, charts, agent
│   └── useTrendSearch.ts    # data fetching/state for a trend search
├── components/
│   ├── charts/               # InterestOverTimeChart, InterestByRegionChart, RelatedList
│   ├── AgentSidebar.tsx      # sliding chat panel
│   ├── UkVerdictBadge.tsx    # Sell/Skip badge + reasons
│   ├── RoiInputs.tsx         # cost / expected resale price -> live ROI
│   ├── EbayListingsCard.tsx  # eBay UK active listing count + price range
│   ├── SearchBar.tsx
│   ├── StatCard.tsx
│   ├── RecentSearches.tsx
│   └── ChartCard.tsx
├── lib/
│   ├── supabaseClient.ts
│   ├── types.ts
│   ├── deriveStats.ts
│   ├── ukVerdict.ts          # rules-based Sell/Skip scoring
│   ├── roi.ts                # ROI calculation + 30% flip threshold
│   ├── agentContext.ts       # summarizes dashboard state for the assistant
│   └── format.ts
└── supabase/
    ├── functions/fetch-trends/index.ts  # calls SerpApi + eBay, upserts into `trends`
    └── migrations/
        ├── 0001_init.sql              # `trends` table + RLS
        ├── 0002_uk_interest.sql       # uk_interest column
        └── 0003_ebay_listings.sql     # ebay_* columns
```

## The Sell/Skip verdict

`lib/ukVerdict.ts` scores an item as **SELL** only if it clears every gate that's
actually known (gates, not an additive score, so no single strong factor can outvote
a real blocker):

- **UK demand** — popular in the UK (interest score ≥ 25/100)
- **Trend** — not meaningfully declining (not down 20%+ recently)
- **ROI** — 30%+ margin, *only once you've entered a cost and expected resale price*
  in the "Flip margin" box; leaving those blank keeps the read demand-only

No live pricing data is pulled automatically — ROI is estimated by you.

## Setup

1. **Supabase project** — create one at supabase.com, then apply the schema:

   ```bash
   supabase link --project-ref your-project-ref
   supabase db push
   ```

2. **Edge function secrets** (not the Next.js env — these are Supabase-side):

   ```bash
   supabase secrets set SERPAPI_KEY=your-serpapi-key
   supabase secrets set EBAY_CLIENT_ID=your-ebay-client-id
   supabase secrets set EBAY_CLIENT_SECRET=your-ebay-client-secret
   ```

   eBay credentials come from a free [eBay Developer Program](https://developer.ebay.com)
   account (Production keys). If they're not set, eBay listing data is simply skipped —
   Google Trends data still works.

3. **Deploy the edge function:**

   ```bash
   supabase functions deploy fetch-trends
   ```

4. **App env vars** — copy `.env.local.example` to `.env` (or `.env.local`) and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from your Supabase project settings
   - `OPENAI_API_KEY` — powers `/api/agent`

5. **Run it:**

   ```bash
   npm install
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). (In WebContainer-based environments like
   bolt.new, use `npm run dev:webpack` instead — Turbopack needs native bindings those
   environments can't provide.)

## How it works

1. The search bar calls `supabase.functions.invoke("fetch-trends", { body: { keyword } })`
   directly from the browser using the anon key.
2. The edge function calls SerpApi's `google_trends` engine (timeseries, geo map, related
   queries/topics) and eBay's Browse API (UK marketplace, OAuth2 client-credentials) in
   parallel, normalizes both, and upserts a row into the `trends` table using the service
   role key (bypassing RLS — the client can only read). Every sub-request except
   TIMESERIES degrades to empty on failure rather than losing the whole search; eBay is
   skipped entirely if its credentials aren't configured.
3. The dashboard computes the Sell/Skip verdict client-side and renders it alongside
   stat tiles, the eBay listings card, an interest-over-time line chart, an
   interest-by-region bar chart, and related queries/topics.
4. The sliding assistant (`components/AgentSidebar.tsx`) sends your question plus a
   text summary of the current dashboard state — including the verdict, ROI, and eBay
   data (`lib/agentContext.ts`) — to `/api/agent`, which calls the OpenAI API and
   returns a reply.

## Notes

- **Vinted, Facebook Marketplace, and Gumtree are intentionally not integrated** —
  none of them expose a public API for listings/search data, so pulling from them
  would mean unofficial scraping: fragile, and against their Terms of Service.
- There's no auth in this build — it's a single-user tool, and the `trends` table
  uses an open read policy so the anon key can read directly (writes only happen via
  the edge function, using the service role key). If this ever becomes multi-user,
  add a `user_id` column and scope policies to `auth.uid()`.
- `lib/supabaseClient.ts` falls back to placeholder values instead of throwing if the
  Supabase env vars aren't set, so a misconfigured deployment shows a normal, visible
  error instead of a blank crashed page. `app/error.tsx` and `app/global-error.tsx`
  add the same safety net for any other unexpected render error.
