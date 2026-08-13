import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/azotea/PageHero";
import Reveal from "@/components/azotea/Reveal";
import EnquiryForm from "@/components/azotea/EnquiryForm";
import { business, lunchOffer } from "@/lib/azotea";

export const metadata: Metadata = {
  title: "Book a Table",
  description:
    "Reserve a table at AZOTEA, the Latin American rooftop restaurant and bar on the 12th floor of Sovereign Square, Leeds. Restaurant, bar and terrace tables — open daily from 12pm.",
  alternates: { canonical: "/azotea/book-a-table" },
};

export default function BookATablePage() {
  return (
    <>
      <PageHero
        eyebrow="Reservations"
        title="Book a table"
        italic="in the sky"
        lead="Book the restaurant for the full menu with table service, or the bar for cocktails and small plates. Terrace tables are available too — weather permitting."
      />

      <section className="az-section-tight">
        <div className="az-wrap az-wrap-wide grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <h2 className="az-display az-h3">Request your table</h2>
            <p className="az-body mt-3 mb-7 max-w-xl">
              Tell us when you&apos;d like to come and the team will confirm by email.
              For parties of eight or more, use our{" "}
              <Link href="/azotea/group-bookings" className="az-link">
                group booking enquiry
              </Link>{" "}
              instead.
            </p>
            <EnquiryForm kind="table" submitLabel="Request a table" />
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-5">
              <div className="az-card">
                <p className="az-eyebrow az-eyebrow-plain">Prefer to talk?</p>
                <p className="az-body mt-4">
                  The team is on the phone through service — call us and we&apos;ll find
                  you a table.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <a href={business.phoneHref} className="az-btn az-btn-block">
                    Call {business.phone}
                  </a>
                  <a
                    href={`mailto:${business.email}`}
                    className="az-btn az-btn-ghost az-btn-block"
                  >
                    Email {business.email}
                  </a>
                </div>
              </div>

              <div className="az-card">
                <p className="az-chip">{lunchOffer.price}</p>
                <h3 className="az-display az-h3 mt-4">{lunchOffer.title}</h3>
                <p className="az-body mt-3">{lunchOffer.body}</p>
              </div>

              <div className="az-card">
                <p className="az-eyebrow az-eyebrow-plain">Before you book</p>
                <ul className="az-body mt-5 grid gap-3.5 text-[0.95rem]">
                  <li>
                    <strong className="text-[var(--az-bone)]">Terrace tables</strong> are
                    subject to weather. In poor weather we can&apos;t guarantee an
                    alternative table indoors.
                  </li>
                  <li>
                    <strong className="text-[var(--az-bone)]">Changes</strong> to the date,
                    time or number of guests can be made through your booking
                    confirmation email.
                  </li>
                  <li>
                    <strong className="text-[var(--az-bone)]">Dress code</strong> is
                    smart-casual. Smart trainers are fine; tracksuits, football shirts,
                    baseball caps and flip flops aren&apos;t.
                  </li>
                  <li>
                    <strong className="text-[var(--az-bone)]">Getting in:</strong> AZOTEA
                    has its own entrance with a lift direct to the 12th floor.
                  </li>
                </ul>
                <Link href="/azotea/faqs" className="az-link mt-6 inline-block text-sm">
                  Read all FAQs →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
