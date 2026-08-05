"use client";

import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { RecentSearches } from "@/components/RecentSearches";
import { StatCard } from "@/components/StatCard";
import { ChartCard } from "@/components/ChartCard";
import { UkVerdictBadge } from "@/components/UkVerdictBadge";
import { RoiInputs } from "@/components/RoiInputs";
import { InterestOverTimeChart } from "@/components/charts/InterestOverTimeChart";
import { InterestByRegionChart } from "@/components/charts/InterestByRegionChart";
import { RelatedList } from "@/components/charts/RelatedList";
import { AgentSidebar } from "@/components/AgentSidebar";
import { useTrendSearch } from "./useTrendSearch";
import { deriveStats } from "@/lib/deriveStats";
import { computeUkVerdict } from "@/lib/ukVerdict";
import { computeRoi } from "@/lib/roi";
import { formatDateTime } from "@/lib/format";

export function Dashboard() {
  const { trend, history, loading, error, search, loadFromHistory } = useTrendSearch();
  const [agentOpen, setAgentOpen] = useState(false);
  const [cost, setCost] = useState("");
  const [resalePrice, setResalePrice] = useState("");
  const [pricedTrendId, setPricedTrendId] = useState<string | undefined>(undefined);

  // Reset the ROI inputs when the search changes, without an extra
  // render+effect round trip (React's recommended pattern for "adjust
  // state when a prop changes").
  if (trend?.id !== pricedTrendId) {
    setPricedTrendId(trend?.id);
    if (cost !== "") setCost("");
    if (resalePrice !== "") setResalePrice("");
  }

  const stats = trend ? deriveStats(trend) : null;
  const roiPct = computeRoi(parseFloat(cost), parseFloat(resalePrice));
  const ukVerdict = trend && stats ? computeUkVerdict(trend.uk_interest, stats, roiPct) : null;

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 px-4 py-8 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <header>
            <h1 className="text-2xl font-semibold text-ink">Product Trends</h1>
            <p className="mt-1 text-sm text-ink-secondary">
              Search a keyword to pull live Google Trends data for your e-com research.
            </p>
          </header>

          <SearchBar onSearch={search} loading={loading} />
          <RecentSearches items={history} activeKeyword={trend?.keyword} onSelect={loadFromHistory} />

          {error && (
            <div className="rounded-lg border border-critical/30 bg-critical/10 px-4 py-3 text-sm text-critical">
              {error}
            </div>
          )}

          {!trend && !loading && !error && (
            <div className="rounded-lg border border-dashed border-hairline p-10 text-center text-sm text-ink-muted">
              Search for a keyword above to see interest over time, regional demand, and related
              queries.
            </div>
          )}

          {trend && stats && ukVerdict && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-ink">{trend.keyword}</h2>
                <span className="text-xs text-ink-muted">
                  Updated {formatDateTime(trend.created_at)}
                </span>
              </div>

              <RoiInputs
                cost={cost}
                resalePrice={resalePrice}
                roiPct={roiPct}
                onCostChange={setCost}
                onResalePriceChange={setResalePrice}
              />

              <UkVerdictBadge result={ukVerdict} ukInterest={trend.uk_interest} />

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                <StatCard label="Peak interest" value={stats.peak?.value ?? null} hint="out of 100" />
                <StatCard label="Average interest" value={stats.average} deltaPct={stats.changePct} />
                <StatCard label="Current level" value={stats.current} hint="most recent data point" />
                <StatCard
                  label="Top region"
                  value={stats.topRegion?.location ?? "—"}
                  hint={stats.topRegion ? `Score ${Math.round(stats.topRegion.value)}` : "highest interest"}
                />
                <StatCard
                  label="Rising query"
                  value={stats.topRisingQuery?.query ?? "—"}
                  hint={stats.topRisingQuery ? stats.topRisingQuery.formattedValue : "no breakout searches"}
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
        </div>
      </div>

      <AgentSidebar
        isOpen={agentOpen}
        onToggle={() => setAgentOpen((v) => !v)}
        trend={trend}
        history={history}
        roiPct={roiPct}
      />
    </div>
  );
}
