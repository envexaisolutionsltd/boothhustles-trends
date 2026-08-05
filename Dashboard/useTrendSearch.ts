"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { SearchHistoryItem, TrendRecord } from "@/lib/types";

export function useTrendSearch() {
  const [trend, setTrend] = useState<TrendRecord | null>(null);
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = useCallback(async () => {
    const { data } = await supabase
      .from("trends")
      .select("keyword, created_at")
      .order("created_at", { ascending: false })
      .limit(8);
    if (data) setHistory(data as SearchHistoryItem[]);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    loadHistory();
  }, [loadHistory]);

  const search = useCallback(
    async (keyword: string) => {
      setLoading(true);
      setError(null);
      try {
        // A stalled edge function invocation would otherwise leave the UI
        // stuck on "Searching…" forever — bound it client-side too.
        const timeout = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Search timed out after 30s. Please try again.")), 30_000),
        );
        const { data, error: fnError } = await Promise.race([
          supabase.functions.invoke("fetch-trends", { body: { keyword } }),
          timeout,
        ]);
        if (fnError) throw fnError;
        if (data?.error) throw new Error(data.error);
        setTrend(data as TrendRecord);
        loadHistory();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong fetching trends.");
      } finally {
        setLoading(false);
      }
    },
    [loadHistory],
  );

  const loadFromHistory = useCallback(async (keyword: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: dbError } = await supabase
        .from("trends")
        .select("*")
        .eq("keyword_slug", keyword.trim().toLowerCase())
        .single();
      if (dbError) throw dbError;
      setTrend(data as TrendRecord);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load that search.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { trend, history, loading, error, search, loadFromHistory };
}
