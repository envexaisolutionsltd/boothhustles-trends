"use client";

import { useMemo, useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { RecentSearches } from "@/components/RecentSearches";
import { StatCard } from "@/components/StatCard";
import { ChartCard } from "@/components/ChartCard";
import { VerdictBadge } from "@/components/VerdictBadge";
import { WatchlistPanel } from "@/components/WatchlistPanel";
import { InterestOverTimeChart } from "@/components/charts/InterestOverTimeChart";
import { InterestByRegionChart } from "@/components/charts/InterestByRegionChart";
import { RelatedList } from "@/components/charts/RelatedList";
import { AgentSidebar } from "@/components/AgentSidebar";
import { useTrendSearch } from "./useTrendSearch";
import { useWatchlist } from "./useWatchlist";
import { deriveStats } from "@/lib/deriveStats";
import { computeVerdict } from "@/lib/verdict";
import { formatDateTime } from "@/lib/format";

type View = "research" | "watchlist";

export function Dashboard() {
  const { trend, history, loading, error, search, loadFromHistory } = useTrendSearch();
  const watchlist = useWatchlist();
  const [agentOpen, setAgentOpen] = useState(false);
  const [view, setView] = useState<View>("research");

  const stats = trend ? deriveStats(trend) : null;
  const verdictResult = trend && stats ? computeVerdict(trend, stats) : null;

  const currentWatchlistItem = useMemo(
    () =>
      trend
        ? watchlist.items.find((i) => i.keyword.toLowerCase() === trend.keyword.toLowerCase()) ?? null
        : null,
    [trend, watchlist.items],
  );

  function goToResearch(keyword: string) {
    setView("research");
    loadFromHistory(keyword);
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 px-4 py-8 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <header className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-ink">Resell Radar</h1>
              <p className="mt-1 text-sm text-ink-secondary">
                Search an item to see if demand makes it worth buying to flip.
              </p>
            </div>
            <nav className="flex gap-1 rounded-lg border border-hairline bg-surface p-1">
              <TabButton active={view === "research"} onClick={() => setView("research")}>
                Research
              </TabButton>
              <TabButton active={view === "watchlist"} onClick={() => setView("watchlist")}>
                Watchlist{watchlist.items.length > 0 ? ` (${watchlist.items.length})` : ""}
              </TabButton>
            </nav>
          </header>

          {view === "research" && (
            <>
              <SearchBar onSearch={search} loading={loading} />
              <RecentSearches items={history} activeKeyword={trend?.keyword} onSelect={loadFromHistory} />

              {error && (
                <div className="rounded-lg border border-critical/30 bg-critical/10 px-4 py-3 text-sm text-critical">
                  {error}
                </div>
              )}

              {!trend && !loading && !error && (
                <div className="rounded-lg border border-dashed border-hairline p-10 text-center text-sm text-ink-muted">
                  Search a product, niche, or keyword to get a buy/watch/skip read on current demand.
                </div>
              )}

              {trend && stats && verdictResult && (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-ink">{trend.keyword}</h2>
                    <span className="text-xs text-ink-muted">
                      Updated {formatDateTime(trend.created_at)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                    <div className="sm:flex-1">
                      <VerdictBadge result={verdictResult} />
                    </div>
                    <button
                      onClick={() =>
                        watchlist.addItem({
                          keyword: trend.keyword,
                          verdict: verdictResult.verdict,
                          verdictScore: verdictResult.score,
                        })
                      }
                      disabled={!!currentWatchlistItem}
                      className="shrink-0 rounded-lg border border-hairline bg-surface px-4 py-2 text-sm font-semibold text-ink disabled:opacity-50 sm:self-start"
                    >
                      {currentWatchlistItem ? "In watchlist" : "+ Add to watchlist"}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <StatCard label="Current interest" value={stats.current} />
                    <StatCard
                      label="Peak interest"
                      value={stats.peak?.value ?? null}
                      hint={stats.peak?.date}
                    />
                    <StatCard label="Momentum" value={stats.average} deltaPct={stats.changePct} />
                    <StatCard
                      label="Top region"
                      value={stats.topRegion?.location ?? "—"}
                      hint={stats.topRegion ? `Score ${Math.round(stats.topRegion.value)}` : undefined}
                    />
                  </div>

                  <ChartCard title="Interest over time">
                    <InterestOverTimeChart data={trend.interest_over_time} />
                  </ChartCard>

                  <ChartCard title="Interest by region">
                    <InterestByRegionChart data={trend.interest_by_region} />
                  </ChartCard>

                  <ChartCard title="Related queries">
                    <RelatedList
                      top={trend.related_queries.top.map((q) => ({
                        label: q.query,
                        formattedValue: q.formattedValue,
                        link: q.link,
                      }))}
                      rising={trend.related_queries.rising.map((q) => ({
                        label: q.query,
                        formattedValue: q.formattedValue,
                        link: q.link,
                      }))}
                    />
                  </ChartCard>

                  <ChartCard title="Related topics">
                    <RelatedList
                      top={trend.related_topics.top.map((t) => ({
                        label: t.title,
                        formattedValue: t.formattedValue,
                        link: t.link,
                      }))}
                      rising={trend.related_topics.rising.map((t) => ({
                        label: t.title,
                        formattedValue: t.formattedValue,
                        link: t.link,
                      }))}
                    />
                  </ChartCard>
                </>
              )}
            </>
          )}

          {view === "watchlist" && (
            <WatchlistPanel
              items={watchlist.items}
              loading={watchlist.loading}
              onSelect={goToResearch}
              onUpdateStatus={watchlist.updateStatus}
              onUpdateDetails={watchlist.updateDetails}
              onRemove={watchlist.removeItem}
            />
          )}
        </div>
      </div>

      <AgentSidebar
        isOpen={agentOpen}
        onToggle={() => setAgentOpen((v) => !v)}
        trend={trend}
        history={history}
        verdict={verdictResult}
        watchlistItem={currentWatchlistItem}
      />
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-md px-3 py-1.5 text-sm font-medium transition-colors " +
        (active ? "bg-series-1 text-white" : "text-ink-secondary hover:bg-ink-muted/10")
      }
    >
      {children}
    </button>
  );
}
