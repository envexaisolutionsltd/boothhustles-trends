import { SearchHistoryItem, TrendRecord, WatchlistItem } from "./types";
import { deriveStats } from "./deriveStats";
import { VerdictResult } from "./verdict";

export function buildDashboardContext(
  trend: TrendRecord | null,
  history: SearchHistoryItem[],
  verdict: VerdictResult | null,
  watchlistItem: WatchlistItem | null,
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

  const lines = [
    `Current item: "${trend.keyword}", last updated ${trend.created_at}.`,
    `Interest over time: current=${stats.current ?? "n/a"}, peak=${stats.peak?.value ?? "n/a"} on ${stats.peak?.date ?? "n/a"}, average=${stats.average?.toFixed(1) ?? "n/a"}, trend change=${stats.changePct?.toFixed(1) ?? "n/a"}%.`,
    `Top regions by interest: ${topRegions}.`,
    `Top related queries: ${topQueries}.`,
    `Rising related queries: ${risingQueries}.`,
    `Top related topics: ${topTopics}.`,
    `Rising related topics: ${risingTopics}.`,
  ];

  if (verdict) {
    lines.push(
      `Computed verdict for this item: ${verdict.verdict.toUpperCase()} (score ${verdict.score}). Reasons: ${verdict.reasons.join(" ")}`,
    );
  }

  if (watchlistItem) {
    lines.push(
      `This item is already on the user's watchlist — status: ${watchlistItem.status}, cost entered: ${watchlistItem.cost !== null ? `$${watchlistItem.cost}` : "none"}, notes: ${watchlistItem.notes ?? "none"}.`,
    );
  } else {
    lines.push("This item is not currently on the user's watchlist.");
  }

  lines.push(`Recent keyword searches in this session: ${recent}.`);

  return lines.join("\n");
}
