import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/azotea/PageHero";
import Reveal from "@/components/azotea/Reveal";
import { addressOneLine, business, findSteps } from "@/lib/azotea";

export const metadata: Metadata = {
  title: "Find Us in Leeds",
  description:
    "AZOTEA is on the 12th floor of Hyatt Place, Sovereign Square, Leeds LS1 4DA — three minutes from Leeds Railway Station, with parking at Q-Park Sovereign Square and step-free access.",
  alternates: { canonical: "/azotea/find" },
};

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `AZOTEA ${addressOneLine}`,
)}`;

export default function FindPage() {
  return (
    <>
      <PageHero
        eyebrow="Find us"
        title="Sovereign Square,"
        italic="twelfth floor"
        lead="AZOTEA sits on top of Hyatt Place and Hyatt House Leeds, a three-minute walk from Leeds Railway Station."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="az-btn">
            Open in Google Maps
          </a>
          <a href={business.phoneHref} className="az-btn az-btn-ghost">
            Call {business.phone}
          </a>
        </div>
      </PageHero>

      <section className="az-section-tight">
        <div className="az-wrap az-wrap-wide grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <h2 className="az-display az-h3">Getting here</h2>
            <ol className="mt-8 grid gap-0">
              {findSteps.map((step, i) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[3rem_1fr] gap-4 border-b border-[rgba(242,230,214,0.12)] py-6 first:border-t"
                >
                  <span className="az-numeral text-2xl md:text-3xl">0{i + 1}</span>
                  <div>
                    <h3 className="az-display text-xl">{step.title}</h3>
                    <p className="az-body mt-2 text-[0.95rem]">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-5">
              <div className="az-card">
                <p className="az-eyebrow az-eyebrow-plain">Address</p>
                <address className="az-lead mt-5 not-italic">
                  {business.address.line1}
                  <br />
                  {business.address.line2}
                  <br />
                  {business.address.city} {business.address.postcode}
                </address>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="az-link mt-5 inline-block text-sm"
                >
                  Get directions →
                </a>
              </div>

              <div className="az-card">
                <p className="az-eyebrow az-eyebrow-plain">Opening hours</p>
                <ul className="mt-5">
                  {business.hoursDetail.map((row) => (
                    <li
                      key={row.days}
                      className="flex items-baseline justify-between gap-6 border-b border-[rgba(242,230,214,0.12)] py-3.5 last:border-0"
                    >
                      <span className="az-display text-lg">{row.days}</span>
                      <span className="az-body text-sm">{row.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="az-card">
                <p className="az-eyebrow az-eyebrow-plain">Contact</p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <a href={business.phoneHref} className="az-link">
                    {business.phone}
                  </a>
                  <a href={`mailto:${business.email}`} className="az-link">
                    {business.email}
                  </a>
                  <a href={`mailto:${business.groupsEmail}`} className="az-link">
                    {business.groupsEmail} — groups of 8+
                  </a>
                </div>
                <Link href="/azotea/book-a-table" className="az-btn mt-7 az-btn-block">
                  Book a table
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
