import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Don't let a missing env var crash the whole app at import time — log a
  // clear, actionable message and fall back to placeholder values so the
  // page still renders. Actual Supabase calls will then fail with a normal,
  // catchable error that the data hooks already surface in the UI.
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
      "Check your .env file, then fully stop and restart the dev server — " +
      "Next.js only reads env files once at startup, not on file save.",
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
);
