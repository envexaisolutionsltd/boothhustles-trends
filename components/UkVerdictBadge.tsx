import { UkVerdictResult } from "@/lib/ukVerdict";

const COPY: Record<UkVerdictResult["verdict"], { label: string; color: string }> = {
  sell: { label: "SELL — worth listing in the UK", color: "var(--good)" },
  skip: { label: "SKIP — pass on this one", color: "var(--critical)" },
};

export function UkVerdictBadge({
  result,
  ukInterest,
}: {
  result: UkVerdictResult;
  ukInterest: number | null | undefined;
}) {
  const copy = COPY[result.verdict];
  const hasUkData = typeof ukInterest === "number" && Number.isFinite(ukInterest);

  return (
    <div
      className="rounded-lg border border-hairline bg-surface p-4"
      style={{ borderLeft: `4px solid ${copy.color}` }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: copy.color }} />
          <span className="text-sm font-semibold text-ink">{copy.label}</span>
        </div>
        <span className="text-xs text-ink-muted">
          UK interest: {hasUkData ? `${Math.round(ukInterest)}/100` : "no data"}
        </span>
      </div>
      <ul className="mt-3 space-y-1 text-sm text-ink-secondary">
        {result.reasons.map((reason, i) => (
          <li key={i}>• {reason}</li>
        ))}
      </ul>
    </div>
  );
}
