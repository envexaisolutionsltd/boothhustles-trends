import { TrendRecord } from "./types";

export interface DashboardStats {
  current: number | null;
  peak: { value: number; date: string } | null;
  average: number | null;
  changePct: number | null;
  topRegion: { location: string; value: number } | null;
  topRisingQuery: { query: string; formattedValue: string } | null;
}

export function deriveStats(trend: TrendRecord): DashboardStats {
  const timeline = trend.interest_over_time ?? [];

  const current = timeline.length > 0 ? timeline[timeline.length - 1].value : null;

  const peak = timeline.reduce<{ value: number; date: string } | null>((acc, point) => {
    if (!acc || point.value > acc.value) return { value: point.value, date: point.date };
    return acc;
  }, null);

  const average =
    timeline.length > 0
      ? timeline.reduce((sum, point) => sum + point.value, 0) / timeline.length
      : null;

  let changePct: number | null = null;
  if (timeline.length >= 2) {
    const midpoint = Math.floor(timeline.length / 2);
    const firstHalf = timeline.slice(0, midpoint);
    const secondHalf = timeline.slice(midpoint);
    const firstAvg = firstHalf.reduce((s, p) => s + p.value, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((s, p) => s + p.value, 0) / secondHalf.length;
    changePct = firstAvg === 0 ? null : ((secondAvg - firstAvg) / firstAvg) * 100;
  }

  const regions = trend.interest_by_region ?? [];
  const topRegion = regions.reduce<{ location: string; value: number } | null>((acc, r) => {
    if (!acc || r.value > acc.value) return { location: r.location, value: r.value };
    return acc;
  }, null);

  const rising = trend.related_queries?.rising ?? [];
  const topRisingQuery = rising.length > 0 ? { query: rising[0].query, formattedValue: rising[0].formattedValue } : null;

  return { current, peak, average, changePct, topRegion, topRisingQuery };
}
