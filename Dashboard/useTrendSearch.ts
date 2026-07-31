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
        const { data, error: fnError } = await supabase.functions.invoke("fetch-trends", {
          body: { keyword },
        });
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
        .eq("keyword", keyword)
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
