-- Stores the latest Google Trends snapshot for each searched keyword.
create table if not exists trends (
  id uuid primary key default gen_random_uuid(),
  keyword text not null,
  keyword_slug text generated always as (lower(trim(keyword))) stored,
  interest_over_time jsonb not null default '[]',
  interest_by_region jsonb not null default '[]',
  related_queries jsonb not null default '{"top": [], "rising": []}',
  related_topics jsonb not null default '{"top": [], "rising": []}',
  created_at timestamptz not null default now()
);

create unique index if not exists trends_keyword_slug_idx on trends (keyword_slug);
create index if not exists trends_created_at_idx on trends (created_at desc);

alter table trends enable row level security;

-- Dashboard reads directly from the client with the anon key.
-- Writes only happen from the fetch-trends edge function using the service role key.
create policy "Public read access" on trends
  for select
  using (true);
