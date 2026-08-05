import { SearchHistoryItem, TrendRecord } from "./types";
import { deriveStats } from "./deriveStats";
import { computeUkVerdict } from "./ukVerdict";

export function buildDashboardContext(
  trend: TrendRecord | null,
  history: SearchHistoryItem[],
  roiPct?: number | null,
): string {
  const recent = history.map((h) => h.keyword).join(", ") || "none yet";

  if (!trend) {
    return `The dashboard currently has no keyword selected. Recent searches: ${recent}.`;
  }

  const stats = deriveStats(trend);
  const topQueries = trend.related_queries.top.slice(0, 5).map((q) => q.query).join(", ") || "none";
  const risingQueries =
    trend.related_queries.rising.slice(0, 5).map((q) => `${q.query} (${q.formattedValue})`).join(", ") ||
    "none";
  const topTopics = trend.related_topics.top.slice(0, 5).map((t) => t.title).join(", ") || "none";
  const risingTopics =
    trend.related_topics.rising.slice(0, 5).map((t) => `${t.title} (${t.formattedValue})`).join(", ") ||
    "none";
  const topRegions = trend.interest_by_region
    .slice(0, 5)
    .map((r) => `${r.location} (${Math.round(r.value)})`)
    .join(", ") || "none";

  const ukVerdict = computeUkVerdict(trend.uk_interest, stats, roiPct);
  const hasUkInterest = typeof trend.uk_interest === "number" && Number.isFinite(trend.uk_interest);
  const hasRoi = typeof roiPct === "number" && Number.isFinite(roiPct);
  const hasEbayData = typeof trend.ebay_listing_count === "number" && Number.isFinite(trend.ebay_listing_count);
  const ebaySummary = hasEbayData
    ? `${trend.ebay_listing_count} active UK listings${
        typeof trend.ebay_avg_price === "number"
          ? `, avg price £${trend.ebay_avg_price.toFixed(2)} (range £${trend.ebay_min_price?.toFixed(2)}–£${trend.ebay_max_price?.toFixed(2)})`
          : ""
      }`
    : "no eBay data (API not connected or no listings found)";

  const vintedCount = typeof trend.vinted_index_count === "number" ? trend.vinted_index_count : null;
  const gumtreeCount = typeof trend.gumtree_index_count === "number" ? trend.gumtree_index_count : null;

  return [
    `Current keyword: "${trend.keyword}", last updated ${trend.created_at}.`,
    `Interest over time: current=${stats.current ?? "n/a"}, peak=${stats.peak?.value ?? "n/a"} on ${stats.peak?.date ?? "n/a"}, average=${stats.average?.toFixed(1) ?? "n/a"}, trend change=${stats.changePct?.toFixed(1) ?? "n/a"}%.`,
    `UK-specific interest: ${hasUkInterest ? Math.round(trend.uk_interest as number) : "no data"}.${hasRoi ? ` User-entered ROI estimate: ${(roiPct as number).toFixed(0)}% (30%+ is treated as a potential flip).` : " No cost/resale price entered yet."} Computed UK sell/skip read: ${ukVerdict.verdict.toUpperCase()} (${ukVerdict.reasons.join(" ")})`,
    `eBay UK marketplace: ${ebaySummary}.`,
    `Other marketplaces (approximate Google-indexed page counts, NOT live listings — neither has a public API): Vinted=${vintedCount ?? "n/a"}, Gumtree=${gumtreeCount ?? "n/a"}. No signal available for Facebook Marketplace (blocked from Google's index).`,
    `Top regions by interest: ${topRegions}.`,
    `Top related queries: ${topQueries}.`,
    `Rising related queries: ${risingQueries}.`,
    `Top related topics: ${topTopics}.`,
    `Rising related topics: ${risingTopics}.`,
    `Recent keyword searches in this session: ${recent}.`,
  ].join("\n");
}
