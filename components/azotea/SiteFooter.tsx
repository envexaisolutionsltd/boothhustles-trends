import Link from "next/link";
import { business, nav } from "@/lib/azotea";

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-[rgba(242,230,214,0.12)] bg-[var(--az-night-2)]">
      <div className="az-wrap az-wrap-wide py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10">
          <div>
            <p className="az-wordmark text-2xl">AZOTEA</p>
            <p className="az-body mt-5 max-w-sm">
              {business.cuisine} rooftop restaurant and bar on the {business.floor}{" "}
              of Sovereign Square, {business.city}. Two terraces, a long dining
              room and a bar built on agave.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/azotea/book-a-table" className="az-btn">
                Book a table
              </Link>
              <Link href="/azotea/group-bookings" className="az-btn az-btn-ghost">
                Group enquiry
              </Link>
            </div>
          </div>

          <div>
            <h2 className="az-eyebrow az-eyebrow-plain">Visit</h2>
            <address className="az-body mt-5 not-italic leading-relaxed">
              {business.address.line1}
              <br />
              {business.address.line2}
              <br />
              {business.address.city} {business.address.postcode}
            </address>
            <p className="az-body mt-4">{business.hoursSummary}</p>
            <div className="mt-4 flex flex-col gap-2">
              <a href={business.phoneHref} className="az-link">
                {business.phone}
              </a>
              <a href={`mailto:${business.email}`} className="az-link">
                {business.email}
              </a>
            </div>
          </div>

          <div>
            <h2 className="az-eyebrow az-eyebrow-plain">Explore</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="az-navlink">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/azotea/careers" className="az-navlink">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="az-rule my-10" />

        <div className="flex flex-col gap-3 text-xs text-[var(--az-mute)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} AZOTEA, {business.city}. Inside{" "}
            {business.hotel}.
          </p>
          <p>Smart-casual dress. Terrace tables subject to weather.</p>
        </div>
      </div>
    </footer>
  );
}
