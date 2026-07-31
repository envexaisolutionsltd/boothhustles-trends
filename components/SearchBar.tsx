"use client";

import { FormEvent, useState } from "react";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  loading: boolean;
}

export function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || loading) return;
    onSearch(trimmed);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search a product, niche, or keyword…"
        className="w-full rounded-lg border border-hairline bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-series-1"
      />
      <button
        type="submit"
        disabled={loading || !value.trim()}
        className="shrink-0 rounded-lg bg-series-1 px-5 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
      >
        {loading ? "Searching…" : "Search"}
      </button>
    </form>
  );
}
