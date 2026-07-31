"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { RegionPoint } from "@/lib/types";
import { formatNumber } from "@/lib/format";
import { ChartTooltip } from "./ChartTooltip";

export function InterestByRegionChart({ data }: { data: RegionPoint[] }) {
  if (data.length === 0) {
    return (
      <div className="flex h-[280px] items-center justify-center text-sm text-ink-muted">
        No regional data available for this keyword.
      </div>
    );
  }

  const height = Math.max(200, data.length * 32);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 4, right: 24, left: 0, bottom: 0 }}
        barSize={18}
      >
        <CartesianGrid stroke="var(--gridline)" horizontal={false} />
        <XAxis
          type="number"
          tickFormatter={formatNumber}
          tick={{ fill: "var(--text-muted)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="location"
          tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={110}
        />
        <Tooltip
          content={<ChartTooltip />}
          cursor={{ fill: "var(--gridline)", opacity: 0.4 }}
        />
        <Bar dataKey="value" name="Interest" fill="var(--series-1)" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
