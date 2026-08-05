import { DashboardStats } from "./deriveStats";

export type UkVerdict = "sell" | "skip";

export interface UkVerdictResult {
  verdict: UkVerdict;
  reasons: string[];
}

/**
 * Rules-based Sell/Skip read for a UK reseller, from UK-specific search
 * interest plus overall demand momentum — no price data involved.
 */
export function computeUkVerdict(ukInterest: number | null, stats: DashboardStats): UkVerdictResult {
  const reasons: string[] = [];
  let score = 0;

  if (ukInterest === null) {
    score -= 2;
    reasons.push("No measurable UK search interest for this keyword.");
  } else if (ukInterest >= 50) {
    score += 2;
    reasons.push(`Strong UK demand — interest score of ${Math.round(ukInterest)} out of 100.`);
  } else if (ukInterest >= 20) {
    score += 1;
    reasons.push(`Moderate UK demand — interest score of ${Math.round(ukInterest)}.`);
  } else {
    score -= 1;
    reasons.push(`Weak UK demand — interest score of only ${Math.round(ukInterest)}.`);
  }

  if (stats.changePct !== null) {
    if (stats.changePct >= 15) {
      score += 1;
      reasons.push(`Demand is trending up overall — up ${stats.changePct.toFixed(0)}% recently.`);
    } else if (stats.changePct <= -15) {
      score -= 1;
      reasons.push(`Demand is trending down overall — down ${Math.abs(stats.changePct).toFixed(0)}% recently.`);
    } else {
      reasons.push("Overall demand is holding roughly steady.");
    }
  }

  return { verdict: score >= 1 ? "sell" : "skip", reasons };
}
