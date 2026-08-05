import { DashboardStats } from "./deriveStats";

export type UkVerdict = "sell" | "skip";

export interface UkVerdictResult {
  verdict: UkVerdict;
  reasons: string[];
}

const POPULAR_THRESHOLD = 25;
const DECLINING_THRESHOLD = -20;
const RISING_THRESHOLD = 15;

/**
 * Rules-based Sell/Skip read for a UK reseller: SELL requires the item to
 * be both popular in the UK and not meaningfully declining — "popular and
 * trending" as a gate, not an additive score, so a sharp decline can't be
 * offset by raw popularity into a false SELL. No price data involved.
 */
export function computeUkVerdict(ukInterest: number | null, stats: DashboardStats): UkVerdictResult {
  if (ukInterest === null) {
    return {
      verdict: "skip",
      reasons: [
        "No measurable UK search interest for this keyword — not enough demand data to justify selling here.",
      ],
    };
  }

  const reasons: string[] = [];
  const isPopular = ukInterest >= POPULAR_THRESHOLD;
  const isDeclining = stats.changePct !== null && stats.changePct <= DECLINING_THRESHOLD;
  const isRising = stats.changePct !== null && stats.changePct >= RISING_THRESHOLD;

  reasons.push(
    isPopular
      ? `Popular in the UK — interest score of ${Math.round(ukInterest)} out of 100.`
      : `Low UK interest — only ${Math.round(ukInterest)} out of 100.`,
  );

  if (isRising) {
    reasons.push(`Trending up — demand rose ${stats.changePct!.toFixed(0)}% recently.`);
  } else if (isDeclining) {
    reasons.push(`Trending down — demand fell ${Math.abs(stats.changePct!).toFixed(0)}% recently.`);
  } else {
    reasons.push("Demand is holding roughly steady.");
  }

  return { verdict: isPopular && !isDeclining ? "sell" : "skip", reasons };
}
