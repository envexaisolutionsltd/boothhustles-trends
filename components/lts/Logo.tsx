import { company } from "@/lib/lts/content";

/**
 * Wordmark: an "LTS" monogram plate with hi-vis banding, sized by font-size
 * so it scales cleanly in the header and the footer without an image request.
 */
export function Logo({ tone = "dark" }: { tone?: "light" | "dark" }) {
  const onDark = tone === "dark";
  return (
    <span className="flex items-center gap-3">
      <span
        aria-hidden
        className="relative flex h-11 w-11 shrink-0 items-center justify-center bg-hivis text-graphite-950"
      >
        <span className="text-[15px] font-bold leading-none tracking-tight">
          LTS
        </span>
        <span className="lts-hazard-fine absolute inset-x-0 bottom-0 h-1.5" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`text-[15px] font-semibold uppercase tracking-[0.14em] ${
            onDark ? "text-white" : "text-graphite-900"
          }`}
        >
          Lewis Transport
        </span>
        <span
          className={`mt-1.5 text-[10px] font-medium uppercase tracking-[0.24em] ${
            onDark ? "text-steel-500" : "text-graphite-600"
          }`}
        >
          Services · Est. {company.founded}
        </span>
      </span>
    </span>
  );
}
