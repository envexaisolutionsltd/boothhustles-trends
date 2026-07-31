import { Dashboard } from "@/Dashboard/Dashboard";

// Fully client-driven (data loads from Supabase after mount) — render per
// request instead of prerendering at build time, when env vars aren't set yet.
export const dynamic = "force-dynamic";

export default function Home() {
  return <Dashboard />;
}
