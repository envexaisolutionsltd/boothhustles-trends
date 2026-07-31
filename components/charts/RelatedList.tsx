interface RelatedItem {
  label: string;
  formattedValue: string;
  link?: string;
}

interface RelatedListProps {
  top: RelatedItem[];
  rising: RelatedItem[];
}

export function RelatedList({ top, rising }: RelatedListProps) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <ItemColumn heading="Top" items={top} />
        <ItemColumn heading="Rising" items={rising} />
      </div>
    </div>
  );
}

function ItemColumn({ heading, items }: { heading: string; items: RelatedItem[] }) {
  if (items.length === 0) {
    return (
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-muted">{heading}</p>
        <p className="text-sm text-ink-muted">No data</p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-muted">{heading}</p>
      <ul className="flex flex-col gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center justify-between gap-3 text-sm">
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-ink hover:underline"
              >
                {item.label}
              </a>
            ) : (
              <span className="truncate text-ink">{item.label}</span>
            )}
            <Badge value={item.formattedValue} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Badge({ value }: { value: string }) {
  const isBreakout = value.toLowerCase() === "breakout";
  return (
    <span
      className={
        "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums " +
        (isBreakout
          ? "bg-series-2/15 text-series-2"
          : "bg-ink-muted/10 text-ink-secondary")
      }
    >
      {isBreakout ? "Breakout" : value}
    </span>
  );
}
