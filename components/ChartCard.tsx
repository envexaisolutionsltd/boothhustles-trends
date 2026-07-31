import { ReactNode } from "react";

export function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-hairline bg-surface p-4">
      <h2 className="mb-3 text-sm font-semibold text-ink">{title}</h2>
      {children}
    </div>
  );
}
