import { DashboardStats } from "./deriveStats";
import { ROI_FLIP_THRESHOLD } from "./roi";

export type UkVerdict = "sell" | "skip";

export interface UkVerdictResult {
  verdict: UkVerdict;
  reasons: string[];
}

const POPULAR_THRESHOLD = 25;
const DECLINING_THRESHOLD = -20;
const RISING_THRESHOLD = 15;

/**
 * Rules-based Sell/Skip read for a UK reseller. SELL requires the item to
 * clear every gate that's actually known — popular in the UK, not
 * meaningfully declining, and (if a cost/resale price were entered) at
 * least a 30% ROI — as gates, not an additive score, so no single strong
 * factor can outvote a genuine blocker (e.g. thin margin, or a sharp
 * decline). ROI is only ever a gate when the caller actually supplies it;
 * omitting it just means the read stays demand-only, as before.
 */
export function computeUkVerdict(
  ukInterest: number | null | undefined,
  stats: DashboardStats,
  roiPct?: number | null,
): UkVerdictResult {
  const reasons: string[] = [];

  // Treat anything that isn't a real, finite number as "no data" — the DB
  // value can arrive as null, undefined (column missing from a stale
  // response), or a non-numeric string depending on the client/schema
  // state, and none of those should ever reach Math.round() as NaN.
  const hasUkData = typeof ukInterest === "number" && Number.isFinite(ukInterest);
  const isPopular = hasUkData && ukInterest >= POPULAR_THRESHOLD;
  const isDeclining = stats.changePct !== null && stats.changePct <= DECLINING_THRESHOLD;
  const isRising = stats.changePct !== null && stats.changePct >= RISING_THRESHOLD;

  if (!hasUkData) {
    reasons.push(
      "No measurable UK search interest for this keyword — not enough demand data to justify selling here.",
    );
  } else {
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
  }

  const hasRoi = typeof roiPct === "number" && Number.isFinite(roiPct);
  const clearsRoi = !hasRoi || roiPct >= ROI_FLIP_THRESHOLD;
  if (hasRoi) {
    reasons.push(
      clearsRoi
        ? `${roiPct.toFixed(0)}% ROI clears the ${ROI_FLIP_THRESHOLD}% flip bar.`
        : `Only ${roiPct.toFixed(0)}% ROI — below the ${ROI_FLIP_THRESHOLD}% flip bar.`,
    );
  }

  const demandOk = hasUkData && isPopular && !isDeclining;
  return { verdict: demandOk && clearsRoi ? "sell" : "skip", reasons };
}
