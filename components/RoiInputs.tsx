import { ROI_FLIP_THRESHOLD } from "@/lib/roi";

interface RoiInputsProps {
  cost: string;
  resalePrice: string;
  roiPct: number | null;
  onCostChange: (value: string) => void;
  onResalePriceChange: (value: string) => void;
}

export function RoiInputs({ cost, resalePrice, roiPct, onCostChange, onResalePriceChange }: RoiInputsProps) {
  return (
    <div className="rounded-lg border border-hairline bg-surface p-4">
      <p className="mb-3 text-sm font-semibold text-ink">Flip margin</p>
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-ink-muted">Cost (£)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={cost}
            onChange={(e) => onCostChange(e.target.value)}
            placeholder="0.00"
            className="w-28 rounded-md border border-hairline bg-background px-2 py-1.5 text-sm text-ink placeholder:text-ink-muted"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-ink-muted">Expected resale price (£)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={resalePrice}
            onChange={(e) => onResalePriceChange(e.target.value)}
            placeholder="0.00"
            className="w-36 rounded-md border border-hairline bg-background px-2 py-1.5 text-sm text-ink placeholder:text-ink-muted"
          />
        </label>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-ink-muted">ROI</span>
          <span
            className={
              "text-sm font-semibold " +
              (roiPct === null
                ? "text-ink-muted"
                : roiPct >= ROI_FLIP_THRESHOLD
                  ? "text-good"
                  : "text-critical")
            }
          >
            {roiPct === null ? "—" : `${roiPct.toFixed(0)}%`}
          </span>
        </div>
      </div>
      <p className="mt-2 text-xs text-ink-muted">
        Estimated by you, not pulled from live marketplace prices. {ROI_FLIP_THRESHOLD}%+ is treated as a
        potential flip.
      </p>
    </div>
  );
}
