-- UK-specific interest score, captured separately from interest_by_region
-- (which only keeps the global top 15) so the UK figure is always available
-- even when the UK isn't among a keyword's top global markets.
alter table trends add column if not exists uk_interest numeric;
