"use client";

import { useState } from "react";
import { WatchlistItem, WatchlistStatus } from "@/lib/types";
import { formatDateTime } from "@/lib/format";

const STATUS_OPTIONS: WatchlistStatus[] = ["watching", "bought", "passed"];

const VERDICT_COLOR: Record<string, string> = {
  buy: "var(--good)",
  watch: "var(--warning)",
  skip: "var(--critical)",
};

interface WatchlistPanelProps {
  items: WatchlistItem[];
  loading: boolean;
  onSelect: (keyword: string) => void;
  onUpdateStatus: (id: string, status: WatchlistStatus) => void;
  onUpdateDetails: (id: string, cost: number | null, notes: string | null) => void;
  onRemove: (id: string) => void;
}

export function WatchlistPanel({
  items,
  loading,
  onSelect,
  onUpdateStatus,
  onUpdateDetails,
  onRemove,
}: WatchlistPanelProps) {
  if (!loading && items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-hairline p-10 text-center text-sm text-ink-muted">
        Nothing saved yet. Search a keyword and add it to your watchlist to track it here.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <WatchlistRow
          key={item.id}
          item={item}
          onSelect={onSelect}
          onUpdateStatus={onUpdateStatus}
          onUpdateDetails={onUpdateDetails}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

function WatchlistRow({
  item,
  onSelect,
  onUpdateStatus,
  onUpdateDetails,
  onRemove,
}: {
  item: WatchlistItem;
  onSelect: (keyword: string) => void;
  onUpdateStatus: (id: string, status: WatchlistStatus) => void;
  onUpdateDetails: (id: string, cost: number | null, notes: string | null) => void;
  onRemove: (id: string) => void;
}) {
  const [cost, setCost] = useState(item.cost !== null ? String(item.cost) : "");
  const [notes, setNotes] = useState(item.notes ?? "");

  function saveDetails() {
    const trimmedCost = cost.trim();
    const parsedCost = trimmedCost === "" ? null : Number(trimmedCost);
    const trimmedNotes = notes.trim();
    onUpdateDetails(item.id, Number.isNaN(parsedCost) ? null : parsedCost, trimmedNotes === "" ? null : trimmedNotes);
  }

  return (
    <div className="rounded-lg border border-hairline bg-surface p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button onClick={() => onSelect(item.keyword)} className="flex items-center gap-2 text-left">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: VERDICT_COLOR[item.verdict] }}
          />
          <span className="font-semibold text-ink hover:underline">{item.keyword}</span>
          <span className="text-xs uppercase tracking-wide text-ink-muted">{item.verdict}</span>
        </button>
        <div className="flex items-center gap-2">
          <select
            value={item.status}
            onChange={(e) => onUpdateStatus(item.id, e.target.value as WatchlistStatus)}
            className="rounded-md border border-hairline bg-background px-2 py-1 text-xs text-ink"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button onClick={() => onRemove(item.id)} className="text-xs text-ink-muted hover:text-critical">
            Remove
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-[120px_1fr]">
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          onBlur={saveDetails}
          placeholder="Cost $"
          className="rounded-md border border-hairline bg-background px-2 py-1 text-sm text-ink placeholder:text-ink-muted"
        />
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={saveDetails}
          placeholder="Notes…"
          className="rounded-md border border-hairline bg-background px-2 py-1 text-sm text-ink placeholder:text-ink-muted"
        />
      </div>
      <p className="mt-2 text-xs text-ink-muted">Saved {formatDateTime(item.created_at)}</p>
    </div>
  );
}
