import { TrendRecord } from "@/lib/types";
import { formatCompact } from "@/lib/format";

interface EbayListingsCardProps {
  trend: TrendRecord;
}

export function EbayListingsCard({ trend }: EbayListingsCardProps) {
  const hasData = typeof trend.ebay_listing_count === "number" && Number.isFinite(trend.ebay_listing_count);

  if (!hasData) {
    return (
      <div className="rounded-lg border border-hairline bg-surface p-4">
        <p className="text-sm font-semibold text-ink">eBay UK listings</p>
        <p className="mt-2 text-sm text-ink-muted">
          No eBay data yet — the eBay API isn&apos;t connected for this search.
        </p>
      </div>
    );
  }

  const hasPrices = typeof trend.ebay_avg_price === "number" && Number.isFinite(trend.ebay_avg_price);

  return (
    <div className="rounded-lg border border-hairline bg-surface p-4">
      <p className="text-sm font-semibold text-ink">eBay UK listings</p>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <div>
          <span className="text-2xl font-semibold text-ink">
            {formatCompact(trend.ebay_listing_count as number)}
          </span>
          <span className="ml-1.5 text-xs text-ink-muted">active listings</span>
        </div>
        {hasPrices && (
          <div className="text-sm text-ink-secondary">
            Avg £{(trend.ebay_avg_price as number).toFixed(2)}
            {typeof trend.ebay_min_price === "number" && typeof trend.ebay_max_price === "number" && (
              <span className="text-ink-muted">
                {" "}
                (£{trend.ebay_min_price.toFixed(2)}–£{trend.ebay_max_price.toFixed(2)})
              </span>
            )}
          </div>
        )}
      </div>
      <p className="mt-2 text-xs text-ink-muted">
        Price range based on a sample of current listings, not full market data.
      </p>
    </div>
  );
}
