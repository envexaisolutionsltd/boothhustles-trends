import type { Metadata } from "next";
import PageHero from "@/components/azotea/PageHero";
import Reveal from "@/components/azotea/Reveal";
import EnquiryForm from "@/components/azotea/EnquiryForm";
import { business, careerBenefits } from "@/lib/azotea";

export const metadata: Metadata = {
  title: "Restaurant & Bar Jobs in Leeds",
  description:
    "Work at AZOTEA, the Latin American rooftop restaurant and bar in Leeds. We're not currently recruiting, but send your CV and we'll be in touch when a suitable role opens.",
  alternates: { canonical: "/azotea/careers" },
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Join us on"
        italic="the rooftop"
        lead="AZOTEA celebrates Latin American cuisine and culture every service — our chefs and mixologists bring traditional ingredients and bold flavours to life, and the venue transforms through the day with music, dance and cultural performances."
      />

      <section className="az-section-tight">
        <div className="az-wrap az-wrap-wide grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <div className="az-card">
              <p className="az-chip">Current vacancies</p>
              <h2 className="az-display az-h3 mt-5">
                We&apos;re not recruiting right now
              </h2>
              <p className="az-body mt-4">
                Check back for future vacancies, or send us your CV and we&apos;ll get in
                touch when a suitable role becomes available.
              </p>
            </div>

            <div className="az-card mt-5">
              <p className="az-eyebrow az-eyebrow-plain">What we offer</p>
              <ul className="az-body mt-5 grid gap-3.5 text-[0.95rem]">
                {careerBenefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3">
                    <span className="text-[var(--az-gold)]" aria-hidden="true">
                      ✦
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <p className="az-body mt-6 text-sm">
                AZOTEA sits within {business.hotel}, operated by {business.operator}.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="az-display az-h3">Register your interest</h2>
            <p className="az-body mt-3 mb-7 max-w-xl">
              Tell us what you do and when you&apos;re available, and include a link to
              your CV.
            </p>
            <EnquiryForm kind="careers" submitLabel="Send to the team" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
