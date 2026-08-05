import { TrendRecord } from "@/lib/types";
import { formatCompact } from "@/lib/format";

interface MarketplaceIndexCardProps {
  trend: TrendRecord;
}

function isCount(value: number | null): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export function MarketplaceIndexCard({ trend }: MarketplaceIndexCardProps) {
  const rows: { label: string; count: number | null }[] = [
    { label: "Vinted", count: trend.vinted_index_count },
    { label: "Gumtree", count: trend.gumtree_index_count },
  ];

  return (
    <div className="rounded-lg border border-hairline bg-surface p-4">
      <p className="text-sm font-semibold text-ink">Other marketplaces (Google index estimate)</p>
      <div className="mt-2 flex flex-wrap gap-6">
        {rows.map((row) => (
          <div key={row.label}>
            <span className="text-2xl font-semibold text-ink">
              {isCount(row.count) ? formatCompact(row.count) : "—"}
            </span>
            <span className="ml-1.5 text-xs text-ink-muted">{row.label} pages indexed</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-ink-muted">
        Neither platform has a public API, so this is an approximate count of Google-indexed pages
        matching your search — not live listing counts or prices, and not a signal for Facebook
        Marketplace (Meta blocks it from Google&apos;s index entirely).
      </p>
    </div>
  );
}
