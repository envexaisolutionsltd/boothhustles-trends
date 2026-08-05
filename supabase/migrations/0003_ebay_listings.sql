-- eBay UK active-listing snapshot for a keyword, from the official eBay
-- Browse API (EBAY_GB marketplace). Supply-side signal alongside the
-- Google Trends demand data already in this table.
alter table trends add column if not exists ebay_listing_count integer;
alter table trends add column if not exists ebay_avg_price numeric;
alter table trends add column if not exists ebay_min_price numeric;
alter table trends add column if not exists ebay_max_price numeric;
