# Product Trends Dashboard

An e-com product research dashboard. Type a keyword, pull Google Trends data via
SerpApi through a Supabase Edge Function, store it in Supabase, and explore it with
charts plus an AI research assistant that sees what's on screen.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase (Postgres + Edge Functions) for storage and the SerpApi proxy
- Recharts for charts
- Anthropic API for the sliding research assistant

## Structure

```
├── app/
│   ├── api/agent/route.ts   # chat endpoint for the sliding assistant
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx             # renders Dashboard
├── Dashboard/
│   ├── Dashboard.tsx        # page layout: search, stats, charts, agent
│   └── useTrendSearch.ts    # data fetching/state for a trend search
├── components/
│   ├── charts/               # InterestOverTimeChart, InterestByRegionChart, RelatedList
│   ├── AgentSidebar.tsx      # sliding chat panel
│   ├── SearchBar.tsx
│   ├── StatCard.tsx
│   ├── RecentSearches.tsx
│   └── ChartCard.tsx
├── lib/
│   ├── supabaseClient.ts
│   ├── types.ts
│   ├── deriveStats.ts
│   ├── agentContext.ts       # summarizes dashboard state for the assistant
│   └── format.ts
└── supabase/
    ├── functions/fetch-trends/index.ts  # calls SerpApi, upserts into `trends`
    └── migrations/0001_init.sql          # `trends` table + RLS
```

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

4. **App env vars** — copy `.env.local.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from your Supabase project settings
   - `ANTHROPIC_API_KEY` — powers `/api/agent`

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
3. The dashboard renders the returned row: stat tiles, an interest-over-time line
   chart, an interest-by-region bar chart, and related queries/topics.
4. The sliding assistant (`components/AgentSidebar.tsx`) sends your question plus a
   text summary of the current dashboard state (`lib/agentContext.ts`) to
   `/api/agent`, which calls the Anthropic API and returns a reply.
