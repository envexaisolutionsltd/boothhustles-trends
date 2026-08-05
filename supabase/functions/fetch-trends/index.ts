// Supabase Edge Function: fetch-trends
// Pulls Google Trends data for a keyword from SerpApi and stores it in the
// `trends` table. Invoked from the dashboard via supabase.functions.invoke().

import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SERPAPI_KEY = Deno.env.get("SERPAPI_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const EBAY_CLIENT_ID = Deno.env.get("EBAY_CLIENT_ID");
const EBAY_CLIENT_SECRET = Deno.env.get("EBAY_CLIENT_SECRET");

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

interface SerpApiTimelinePoint {
  date: string;
  timestamp?: string;
  values: { value: string; extracted_value: number }[];
}

interface SerpApiRegionPoint {
  location: string;
  value?: string;
  extracted_value?: number;
}

interface SerpApiRelatedQuery {
  query: string;
  value?: string;
  extracted_value?: number;
  link?: string;
}

interface SerpApiRelatedTopic {
  topic: { title: string; type: string };
  value?: string;
  extracted_value?: number;
  link?: string;
}

async function fetchSerpApi(keyword: string, dataType: string) {
  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google_trends");
  url.searchParams.set("q", keyword);
  url.searchParams.set("data_type", dataType);
  url.searchParams.set("api_key", SERPAPI_KEY);

  // A hung SerpApi request would otherwise stall the whole edge function
  // (and the browser's "Searching…" state) indefinitely.
  const res = await fetch(url.toString(), { signal: AbortSignal.timeout(20_000) });
  if (!res.ok) {
    throw new Error(`SerpApi ${dataType} request failed: ${res.status}`);
  }
  return res.json();
}

// Vinted and Gumtree have no public API — this is a legal alternative
// (not scraping their servers at all): a site-restricted Google search
// via SerpApi's regular search engine, reading only Google's own public
// index. It's an approximate "how much indexed content exists" signal,
// not live listing counts or prices.
async function fetchGoogleIndexCount(keyword: string, site: string): Promise<number | null> {
  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google");
  url.searchParams.set("q", `site:${site} ${keyword}`);
  url.searchParams.set("api_key", SERPAPI_KEY);

  const res = await fetch(url.toString(), { signal: AbortSignal.timeout(15_000) });
  if (!res.ok) {
    throw new Error(`Google index search for ${site} failed: ${res.status}`);
  }
  const data = await res.json();
  const total = data.search_information?.total_results;
  return typeof total === "number" ? total : null;
}

interface EbayItemSummary {
  price?: { value?: string; currency?: string };
}

interface EbaySearchResponse {
  total?: number;
  itemSummaries?: EbayItemSummary[];
}

interface EbayListingsSummary {
  count: number;
  avgPrice: number | null;
  minPrice: number | null;
  maxPrice: number | null;
}

// eBay's client-credentials token is valid ~2 hours; cached in module scope
// so a warm edge function instance doesn't re-authenticate on every search.
let cachedEbayToken: { token: string; expiresAt: number } | null = null;

async function getEbayToken(): Promise<string> {
  if (cachedEbayToken && cachedEbayToken.expiresAt > Date.now()) {
    return cachedEbayToken.token;
  }

  const credentials = btoa(`${EBAY_CLIENT_ID}:${EBAY_CLIENT_SECRET}`);
  const res = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: "grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope",
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) {
    throw new Error(`eBay auth failed: ${res.status}`);
  }
  const data = await res.json();
  cachedEbayToken = {
    token: data.access_token,
    // Refresh a couple minutes early to avoid using an about-to-expire token.
    expiresAt: Date.now() + (data.expires_in - 120) * 1000,
  };
  return cachedEbayToken.token;
}

async function fetchEbayListings(keyword: string): Promise<EbayListingsSummary> {
  if (!EBAY_CLIENT_ID || !EBAY_CLIENT_SECRET) {
    throw new Error("eBay API credentials are not configured.");
  }

  const token = await getEbayToken();
  const url = new URL("https://api.ebay.com/buy/browse/v1/item_summary/search");
  url.searchParams.set("q", keyword);
  url.searchParams.set("limit", "50");

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-EBAY-C-MARKETPLACE-ID": "EBAY_GB",
    },
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) {
    throw new Error(`eBay search failed: ${res.status}`);
  }

  const data: EbaySearchResponse = await res.json();
  const prices = (data.itemSummaries ?? [])
    .map((item) => Number(item.price?.value))
    .filter((value) => Number.isFinite(value));

  return {
    count: data.total ?? 0,
    avgPrice: prices.length > 0 ? prices.reduce((sum, p) => sum + p, 0) / prices.length : null,
    minPrice: prices.length > 0 ? Math.min(...prices) : null,
    maxPrice: prices.length > 0 ? Math.max(...prices) : null,
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { keyword } = await req.json();
    if (!keyword || typeof keyword !== "string" || !keyword.trim()) {
      return new Response(JSON.stringify({ error: "keyword is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const cleanKeyword = keyword.trim();

    // TIMESERIES is the core chart data, so a failure there fails the whole
    // request. Everything else is supporting data — if one of them has a
    // hiccup, degrade to empty rather than losing the whole search.
    // GEO_MAP_0 (country-level) is used instead of GEO_MAP (sub-region level,
    // which needs an extra `region` param and 400s without one). eBay is
    // skipped entirely (not even attempted) if credentials aren't set yet.
    const [
      timeseriesResult,
      geoMapResult,
      relatedQueriesResult,
      relatedTopicsResult,
      ebayResult,
      vintedIndexResult,
      gumtreeIndexResult,
    ] = await Promise.allSettled([
      fetchSerpApi(cleanKeyword, "TIMESERIES"),
      fetchSerpApi(cleanKeyword, "GEO_MAP_0"),
      fetchSerpApi(cleanKeyword, "RELATED_QUERIES"),
      fetchSerpApi(cleanKeyword, "RELATED_TOPICS"),
      fetchEbayListings(cleanKeyword),
      fetchGoogleIndexCount(cleanKeyword, "vinted.co.uk"),
      fetchGoogleIndexCount(cleanKeyword, "gumtree.com"),
    ]);

    if (timeseriesResult.status === "rejected") {
      throw new Error(`Could not load interest-over-time data: ${timeseriesResult.reason}`);
    }

    const timeseries = timeseriesResult.value;
    const geoMap = geoMapResult.status === "fulfilled" ? geoMapResult.value : {};
    const relatedQueries = relatedQueriesResult.status === "fulfilled" ? relatedQueriesResult.value : {};
    const relatedTopics = relatedTopicsResult.status === "fulfilled" ? relatedTopicsResult.value : {};
    const ebayListings = ebayResult.status === "fulfilled" ? ebayResult.value : null;
    const vintedIndexCount = vintedIndexResult.status === "fulfilled" ? vintedIndexResult.value : null;
    const gumtreeIndexCount = gumtreeIndexResult.status === "fulfilled" ? gumtreeIndexResult.value : null;

    const interestOverTime = (timeseries.interest_over_time?.timeline_data ?? []).map(
      (point: SerpApiTimelinePoint) => ({
        date: point.date,
        value: point.values?.[0]?.extracted_value ?? 0,
      }),
    );

    const rawRegions: SerpApiRegionPoint[] = geoMap.interest_by_region ?? [];

    const interestByRegion = rawRegions
      .map((r) => ({
        location: r.location,
        value: r.extracted_value ?? 0,
      }))
      .filter((r: { value: number }) => r.value > 0)
      .sort((a: { value: number }, b: { value: number }) => b.value - a.value)
      .slice(0, 15);

    // Captured separately from the top-15 list above so it's available even
    // when the UK isn't among a keyword's top global markets.
    const ukInterest =
      rawRegions.find((r) => r.location?.toLowerCase() === "united kingdom")?.extracted_value ?? null;

    const mapRelatedQuery = (q: SerpApiRelatedQuery) => ({
      query: q.query,
      value: q.extracted_value ?? 0,
      formattedValue: q.value ?? String(q.extracted_value ?? ""),
      link: q.link,
    });

    const mapRelatedTopic = (t: SerpApiRelatedTopic) => ({
      title: t.topic?.title ?? "Unknown",
      type: t.topic?.type ?? "",
      value: t.extracted_value ?? 0,
      formattedValue: t.value ?? String(t.extracted_value ?? ""),
      link: t.link,
    });

    const relatedQueriesPayload = {
      top: (relatedQueries.related_queries?.top ?? []).slice(0, 10).map(mapRelatedQuery),
      rising: (relatedQueries.related_queries?.rising ?? []).slice(0, 10).map(mapRelatedQuery),
    };

    const relatedTopicsPayload = {
      top: (relatedTopics.related_topics?.top ?? []).slice(0, 10).map(mapRelatedTopic),
      rising: (relatedTopics.related_topics?.rising ?? []).slice(0, 10).map(mapRelatedTopic),
    };

    const { data, error } = await supabase
      .from("trends")
      .upsert(
        {
          keyword: cleanKeyword,
          interest_over_time: interestOverTime,
          interest_by_region: interestByRegion,
          uk_interest: ukInterest,
          related_queries: relatedQueriesPayload,
          related_topics: relatedTopicsPayload,
          ebay_listing_count: ebayListings?.count ?? null,
          ebay_avg_price: ebayListings?.avgPrice ?? null,
          ebay_min_price: ebayListings?.minPrice ?? null,
          ebay_max_price: ebayListings?.maxPrice ?? null,
          vinted_index_count: vintedIndexCount,
          gumtree_index_count: gumtreeIndexCount,
          created_at: new Date().toISOString(),
        },
        { onConflict: "keyword_slug" },
      )
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
