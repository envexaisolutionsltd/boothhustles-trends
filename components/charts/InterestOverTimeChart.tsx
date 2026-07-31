"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TimelinePoint } from "@/lib/types";
import { formatDate, formatNumber } from "@/lib/format";
import { ChartTooltip } from "./ChartTooltip";

export function InterestOverTimeChart({ data }: { data: TimelinePoint[] }) {
  if (data.length === 0) {
    return <EmptyState />;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="var(--gridline)" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={formatDate}
          tick={{ fill: "var(--text-muted)", fontSize: 12 }}
          axisLine={{ stroke: "var(--baseline)" }}
          tickLine={false}
          minTickGap={32}
        />
        <YAxis
          tickFormatter={formatNumber}
          tick={{ fill: "var(--text-muted)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={36}
        />
        <Tooltip
          content={<ChartTooltip labelFormatter={formatDate} />}
          cursor={{ stroke: "var(--baseline)", strokeWidth: 1 }}
        />
        <Line
          type="monotone"
          dataKey="value"
          name="Interest"
          stroke="var(--series-1)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "var(--series-1)", stroke: "var(--surface-1)", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function EmptyState() {
  return (
    <div className="flex h-[280px] items-center justify-center text-sm text-ink-muted">
      No timeline data available for this keyword.
    </div>
  );
}
