export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(Math.round(value));
}

export function formatCompact(value: number): string {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(
    value,
  );
}

export function formatPct(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
