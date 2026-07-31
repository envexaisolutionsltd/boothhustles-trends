import { formatNumber } from "@/lib/format";

interface ChartTooltipProps {
  active?: boolean;
  label?: string;
  payload?: { value: number; name?: string; color?: string }[];
  labelFormatter?: (label: string) => string;
}

export function ChartTooltip({ active, label, payload, labelFormatter }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-md border border-hairline bg-surface px-3 py-2 shadow-sm">
      {label !== undefined && (
        <p className="mb-1 text-xs font-medium text-ink-secondary">
          {labelFormatter ? labelFormatter(label) : label}
        </p>
      )}
      {payload.map((item, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="font-semibold text-ink">{formatNumber(item.value)}</span>
          {item.name && <span className="text-ink-muted">{item.name}</span>}
        </div>
      ))}
    </div>
  );
}
