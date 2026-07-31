import { VerdictResult } from "@/lib/verdict";

const COPY: Record<VerdictResult["verdict"], { label: string; color: string }> = {
  buy: { label: "BUY — worth grabbing", color: "var(--good)" },
  watch: { label: "WATCH — mixed signals", color: "var(--warning)" },
  skip: { label: "SKIP — probably pass", color: "var(--critical)" },
};

export function VerdictBadge({ result }: { result: VerdictResult }) {
  const copy = COPY[result.verdict];

  return (
    <div
      className="rounded-lg border border-hairline bg-surface p-4"
      style={{ borderLeft: `4px solid ${copy.color}` }}
    >
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: copy.color }} />
        <span className="text-sm font-semibold text-ink">{copy.label}</span>
      </div>
      <ul className="mt-3 space-y-1 text-sm text-ink-secondary">
        {result.reasons.map((reason, i) => (
          <li key={i}>• {reason}</li>
        ))}
      </ul>
    </div>
  );
}
