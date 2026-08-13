import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/azotea/PageHero";
import Reveal from "@/components/azotea/Reveal";
import FaqList from "@/components/azotea/FaqList";
import { business } from "@/lib/azotea";

export const metadata: Metadata = {
  title: "Food & Drink FAQs",
  description:
    "Dress code, terrace bookings, group sizes, parking and accessibility — everything worth knowing before you visit AZOTEA rooftop restaurant and bar in Leeds.",
  alternates: { canonical: "/azotea/faqs" },
};

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="Good to know"
        title="Frequently asked"
        italic="questions"
        lead="The things guests ask us most. If your question isn't here, the team is on the end of the phone."
      />

      <section className="az-section-tight">
        <div className="az-wrap az-wrap-wide grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          <Reveal>
            <FaqList />
          </Reveal>

          <Reveal delay={120}>
            <div className="az-card">
              <p className="az-eyebrow az-eyebrow-plain">Still need us?</p>
              <p className="az-body mt-4">
                Call or email and a member of the team will be happy to help.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a href={business.phoneHref} className="az-btn az-btn-block">
                  Call {business.phone}
                </a>
                <a
                  href={`mailto:${business.email}`}
                  className="az-btn az-btn-ghost az-btn-block"
                >
                  {business.email}
                </a>
                <Link href="/azotea/contact" className="az-btn az-btn-ghost az-btn-block">
                  Send a message
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
