import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/azotea/PageHero";
import Reveal from "@/components/azotea/Reveal";
import EnquiryForm from "@/components/azotea/EnquiryForm";
import { addressOneLine, business } from "@/lib/azotea";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with AZOTEA rooftop restaurant and bar, Sovereign Square, Leeds LS1 4DA. Call 0113 529 7800, email hola@azotea.co.uk, or send an enquiry.",
  alternates: { canonical: "/azotea/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Say"
        italic="hola"
        lead="Questions about a booking, an event, a dietary requirement or access? A member of our team will be happy to help."
      />

      <section className="az-section-tight">
        <div className="az-wrap az-wrap-wide grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <h2 className="az-display az-h3">Send us a message</h2>
            <p className="az-body mt-3 mb-7 max-w-xl">
              For table reservations use the{" "}
              <Link href="/azotea/book-a-table" className="az-link">
                booking form
              </Link>
              , and for parties of eight or more head to{" "}
              <Link href="/azotea/group-bookings" className="az-link">
                group bookings
              </Link>
              .
            </p>
            <EnquiryForm kind="general" submitLabel="Send message" />
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-5">
              <div className="az-card">
                <p className="az-eyebrow az-eyebrow-plain">Direct</p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <a href={business.phoneHref} className="az-link">
                    {business.phone}
                  </a>
                  <a href={`mailto:${business.email}`} className="az-link">
                    {business.email}
                  </a>
                  <a href={`mailto:${business.groupsEmail}`} className="az-link">
                    {business.groupsEmail} — groups & events
                  </a>
                </div>
              </div>

              <div className="az-card">
                <p className="az-eyebrow az-eyebrow-plain">Visit</p>
                <address className="az-body mt-5 not-italic leading-relaxed">
                  {addressOneLine}
                </address>
                <p className="az-body mt-4">{business.hoursSummary}</p>
                <Link href="/azotea/find" className="az-link mt-5 inline-block text-sm">
                  Directions & access →
                </Link>
              </div>

              <div className="az-card">
                <p className="az-eyebrow az-eyebrow-plain">Work with us</p>
                <p className="az-body mt-4">
                  We&apos;re always glad to hear from people who want to join the team on
                  the rooftop.
                </p>
                <Link href="/azotea/careers" className="az-btn az-btn-ghost mt-6 az-btn-block">
                  Careers at AZOTEA
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
