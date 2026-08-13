import type { Metadata } from "next";
import { Dashboard } from "@/Dashboard/Dashboard";

// Fully client-driven (data loads from Supabase after mount) — render per
// request instead of prerendering at build time, when env vars aren't set yet.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Product Trends Dashboard",
  description: "E-com product research powered by Google Trends via SerpApi.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <Dashboard />;
}
