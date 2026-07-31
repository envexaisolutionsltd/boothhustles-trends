import { SearchHistoryItem } from "@/lib/types";

interface RecentSearchesProps {
  items: SearchHistoryItem[];
  activeKeyword?: string;
  onSelect: (keyword: string) => void;
}

export function RecentSearches({ items, activeKeyword, onSelect }: RecentSearchesProps) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-ink-muted">Recent:</span>
      {items.map((item) => (
        <button
          key={item.keyword}
          onClick={() => onSelect(item.keyword)}
          className={
            "rounded-full border px-3 py-1 text-xs font-medium transition-colors " +
            (item.keyword === activeKeyword
              ? "border-series-1 bg-series-1/10 text-series-1"
              : "border-hairline text-ink-secondary hover:bg-ink-muted/10")
          }
        >
          {item.keyword}
        </button>
      ))}
    </div>
  );
}
