import { formatCompact, formatPct } from "@/lib/format";

interface StatCardProps {
  label: string;
  value: string | number | null;
  deltaPct?: number | null;
  hint?: string;
}

export function StatCard({ label, value, deltaPct, hint }: StatCardProps) {
  const displayValue =
    value === null ? "—" : typeof value === "number" ? formatCompact(value) : value;

  return (
    <div className="rounded-lg border border-hairline bg-surface p-4">
      <p className="text-xs font-medium text-ink-secondary">{label}</p>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="truncate text-2xl font-semibold text-ink">{displayValue}</span>
        {deltaPct !== null && deltaPct !== undefined && !Number.isNaN(deltaPct) && (
          <span className={`text-xs font-medium ${deltaPct >= 0 ? "text-good" : "text-critical"}`}>
            {formatPct(deltaPct)}
          </span>
        )}
      </div>
      {hint && <p className="mt-1 truncate text-xs text-ink-muted">{hint}</p>}
    </div>
  );
}
