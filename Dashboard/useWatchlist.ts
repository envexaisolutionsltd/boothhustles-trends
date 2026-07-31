"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { WatchlistItem, WatchlistStatus } from "@/lib/types";

export function useWatchlist() {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("watchlist")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setItems(data as WatchlistItem[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    refresh();
  }, [refresh]);

  const addItem = useCallback(
    async (input: { keyword: string; verdict: string; verdictScore: number }) => {
      await supabase.from("watchlist").insert({
        keyword: input.keyword,
        verdict: input.verdict,
        verdict_score: input.verdictScore,
      });
      refresh();
    },
    [refresh],
  );

  const updateStatus = useCallback(
    async (id: string, status: WatchlistStatus) => {
      await supabase.from("watchlist").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
      refresh();
    },
    [refresh],
  );

  const updateDetails = useCallback(
    async (id: string, cost: number | null, notes: string | null) => {
      await supabase
        .from("watchlist")
        .update({ cost, notes, updated_at: new Date().toISOString() })
        .eq("id", id);
      refresh();
    },
    [refresh],
  );

  const removeItem = useCallback(
    async (id: string) => {
      await supabase.from("watchlist").delete().eq("id", id);
      refresh();
    },
    [refresh],
  );

  return { items, loading, addItem, updateStatus, updateDetails, removeItem };
}
