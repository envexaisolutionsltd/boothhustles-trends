-- Approximate signal for Vinted and Gumtree: a count of Google-indexed
-- pages matching the keyword on each site (site: search via SerpApi's
-- regular Google Search engine). This is NOT live listing/price data —
-- neither platform has a public API, and this only reflects what Google
-- has publicly indexed, which is why it's stored separately from the
-- real eBay listing figures.
alter table trends add column if not exists vinted_index_count bigint;
alter table trends add column if not exists gumtree_index_count bigint;
