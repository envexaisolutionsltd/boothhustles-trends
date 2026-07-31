# Resell Radar

A dashboard for resellers: search an item, pull live Google Trends data via SerpApi
through a Supabase Edge Function, and get a rules-based **Buy / Watch / Skip** read on
whether current demand makes it worth buying to flip. Save candidates to a watchlist,
track cost/notes/status, and ask an AI resale advisor that sees what's on screen.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase (Postgres + Edge Functions) for storage and the SerpApi proxy
- Recharts for charts
- OpenAI API for the sliding resell advisor

## Structure

```
├── app/
│   ├── api/agent/route.ts   # chat endpoint for the sliding advisor
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx             # renders Dashboard
├── Dashboard/
│   ├── Dashboard.tsx        # page layout: research tab, watchlist tab, agent
│   ├── useTrendSearch.ts    # data fetching/state for a trend search
│   └── useWatchlist.ts      # CRUD for saved watchlist items
├── components/
│   ├── charts/               # InterestOverTimeChart, InterestByRegionChart, RelatedList
│   ├── AgentSidebar.tsx      # sliding chat panel
│   ├── VerdictBadge.tsx      # Buy/Watch/Skip badge + reasons
│   ├── WatchlistPanel.tsx    # saved items: status, cost, notes
│   ├── SearchBar.tsx
│   ├── StatCard.tsx
│   ├── RecentSearches.tsx
│   └── ChartCard.tsx
├── lib/
│   ├── supabaseClient.ts
│   ├── types.ts
│   ├── deriveStats.ts
│   ├── verdict.ts            # rules-based Buy/Watch/Skip scoring
│   ├── agentContext.ts       # summarizes dashboard state for the advisor
│   └── format.ts
└── supabase/
    ├── functions/fetch-trends/index.ts   # calls SerpApi, upserts into `trends`
    └── migrations/
        ├── 0001_init.sql                  # `trends` table + RLS
        └── 0002_watchlist.sql             # `watchlist` table + RLS
```

## The Buy/Watch/Skip verdict

`lib/verdict.ts` scores an item purely on demand signals from the trend data — no
price data involved:

- **Momentum** — is average interest rising or falling recently (± the changePct stat)
- **Position vs. peak** — is current interest still near its high, or well past it
- **Breakout** — is a related query/topic currently marked "Breakout" by Google Trends
- **Overall volume** — is there enough absolute search interest to be worth chasing

The score maps to **BUY** (≥3), **SKIP** (≤‑1), or **WATCH** (in between), each shown
with the specific reasons behind it. There's no live resale-price/margin data source
connected — the watchlist has an optional cost field per item, and the AI advisor can
reason qualitatively about margin from its own knowledge when asked, but it's explicit
that it isn't pulling real marketplace comps.

## Setup

1. **Supabase project** — create one at supabase.com, then apply the schema:

   ```bash
   supabase link --project-ref your-project-ref
   supabase db push
   ```

2. **Edge function secrets** (SerpApi key, not the Next.js env):

   ```bash
   supabase secrets set SERPAPI_KEY=your-serpapi-key
   ```

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

   Open [http://localhost:3000](http://localhost:3000).

## How it works

1. The search bar calls `supabase.functions.invoke("fetch-trends", { body: { keyword } })`
   directly from the browser using the anon key.
2. The edge function calls SerpApi's `google_trends` engine (timeseries, geo map,
   related queries, related topics), normalizes the response, and upserts a row into
   the `trends` table using the service role key (bypassing RLS — the client can only
   read).
3. The dashboard computes a Buy/Watch/Skip verdict client-side from that data and
   renders it alongside stat tiles, an interest-over-time line chart, an
   interest-by-region bar chart, and related queries/topics.
4. "+ Add to watchlist" saves the keyword and verdict to the `watchlist` table. The
   Watchlist tab lets you edit status (watching/bought/passed), cost, and notes inline,
   and jump back into the research view for any saved item.
5. The sliding advisor (`components/AgentSidebar.tsx`) sends your question plus a text
   summary of the current dashboard state — including the verdict and any watchlist
   entry — (`lib/agentContext.ts`) to `/api/agent`, which calls the OpenAI API and
   returns a reply.

## Notes

- There's no auth in this build — it's a single-user tool, and the `watchlist` and
  `trends` tables use open RLS policies so the anon key can read/write directly. If
  this ever becomes multi-user, add a `user_id` column and scope policies to
  `auth.uid()`.
