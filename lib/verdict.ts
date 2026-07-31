import { TrendRecord } from "./types";
import { DashboardStats } from "./deriveStats";

export type Verdict = "buy" | "watch" | "skip";

export interface VerdictResult {
  verdict: Verdict;
  score: number;
  reasons: string[];
}

function hasBreakout(trend: TrendRecord): boolean {
  return [...trend.related_queries.rising, ...trend.related_topics.rising].some(
    (item) => item.formattedValue.toLowerCase() === "breakout",
  );
}

/**
 * Rules-based flip signal from trend momentum only — no price data involved.
 * buy: rising demand with room left to run. skip: demand is fading or too thin
 * to bother with. watch: everything in between.
 */
export function computeVerdict(trend: TrendRecord, stats: DashboardStats): VerdictResult {
  let score = 0;
  const reasons: string[] = [];

  if (stats.changePct !== null) {
    if (stats.changePct >= 15) {
      score += 2;
      reasons.push(`Rising demand — up ${stats.changePct.toFixed(0)}% recently.`);
    } else if (stats.changePct <= -15) {
      score -= 2;
      reasons.push(`Falling demand — down ${Math.abs(stats.changePct).toFixed(0)}% recently.`);
    } else {
      reasons.push("Demand is holding roughly steady.");
    }
  }

  if (stats.peak && stats.current !== null && stats.peak.value > 0) {
    const ratio = stats.current / stats.peak.value;
    if (ratio >= 0.85) {
      score += 1;
      reasons.push("Still near its peak — the window hasn't closed.");
    } else if (ratio < 0.5) {
      score -= 2;
      reasons.push("Well below its peak — may already be past its moment.");
    }
  }

  if (hasBreakout(trend)) {
    score += 1;
    reasons.push("A related search just broke out — fresh buyer interest forming.");
  }

  if (stats.average !== null) {
    if (stats.average >= 50) {
      score += 1;
      reasons.push("Solid overall search volume — a real audience is looking.");
    } else if (stats.average < 20) {
      score -= 1;
      reasons.push("Low overall search volume — demand may be too thin to bother with.");
    }
  }

  let verdict: Verdict;
  if (score >= 3) verdict = "buy";
  else if (score <= -1) verdict = "skip";
  else verdict = "watch";

  return { verdict, score, reasons };
}
