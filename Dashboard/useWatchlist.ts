"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { WatchlistItem, WatchlistStatus } from "@/lib/types";

export function useWatchlist() {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("watchlist")
      .select("*")
      .order("created_at", { ascending: false });
    if (fetchError) {
      setError(fetchError.message);
    } else if (data) {
      setItems(data as WatchlistItem[]);
      setError(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    refresh();
  }, [refresh]);

  const addItem = useCallback(
    async (input: { keyword: string; verdict: string; verdictScore: number }) => {
      const { error: insertError } = await supabase.from("watchlist").insert({
        keyword: input.keyword,
        verdict: input.verdict,
        verdict_score: input.verdictScore,
      });
      if (insertError) {
        setError(insertError.message);
        return false;
      }
      await refresh();
      return true;
    },
    [refresh],
  );

  const updateStatus = useCallback(
    async (id: string, status: WatchlistStatus) => {
      const { error: updateError } = await supabase
        .from("watchlist")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (updateError) setError(updateError.message);
      await refresh();
    },
    [refresh],
  );

  const updateDetails = useCallback(
    async (id: string, cost: number | null, notes: string | null) => {
      const { error: updateError } = await supabase
        .from("watchlist")
        .update({ cost, notes, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (updateError) setError(updateError.message);
      await refresh();
    },
    [refresh],
  );

  const removeItem = useCallback(
    async (id: string) => {
      const { error: deleteError } = await supabase.from("watchlist").delete().eq("id", id);
      if (deleteError) setError(deleteError.message);
      await refresh();
    },
    [refresh],
  );

  return { items, loading, error, addItem, updateStatus, updateDetails, removeItem };
}
