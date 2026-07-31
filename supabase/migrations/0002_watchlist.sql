-- Items a reseller is actively deciding on: the computed verdict at the time
-- it was saved, plus optional cost/notes the user fills in themselves.
create type watchlist_status as enum ('watching', 'bought', 'passed');

create table if not exists watchlist (
  id uuid primary key default gen_random_uuid(),
  keyword text not null,
  verdict text not null,
  verdict_score int not null default 0,
  status watchlist_status not null default 'watching',
  cost numeric,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists watchlist_created_at_idx on watchlist (created_at desc);

alter table watchlist enable row level security;

-- No auth in this build (single-user tool) — the anon key can read/write
-- directly from the browser. If this ever becomes multi-user, add a user_id
-- column and scope these policies to auth.uid() instead.
create policy "Public read access" on watchlist for select using (true);
create policy "Public insert access" on watchlist for insert with check (true);
create policy "Public update access" on watchlist for update using (true);
create policy "Public delete access" on watchlist for delete using (true);
