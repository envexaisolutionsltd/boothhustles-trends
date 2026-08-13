import Link from "next/link";
import { business } from "@/lib/azotea";

/**
 * Small-screen action bar, shown under 640px by `.az-mobile-cta` in azotea.css.
 * The header drops its booking button at that width to keep the bar clean, so
 * the primary calls to action live here instead — always within thumb reach.
 */
export default function MobileCtaBar() {
  return (
    <div className="az-mobile-cta">
      <Link href="/azotea/book-a-table" className="az-btn flex-1">
        Book a table
      </Link>
      <a
        href={business.phoneHref}
        className="az-btn az-btn-ghost flex-1"
        aria-label={`Call AZOTEA on ${business.phone}`}
      >
        Call us
      </a>
    </div>
  );
}
