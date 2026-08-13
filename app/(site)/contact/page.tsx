import type { Metadata } from "next";
import { PageHero } from "@/components/lts/PageHero";
import { QuoteForm } from "@/components/lts/QuoteForm";
import { Container, SectionHeading, TickList } from "@/components/lts/ui";
import { company, contact, locationPoints } from "@/lib/lts/content";

export const metadata: Metadata = {
  title: "Contact Lewis Transport Services",
  description: `Call ${contact.phone} or send an enquiry. Heavy haulage depot and offices in Doveridge, Derbyshire, on the National High Load route close to the A50.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the traffic office"
        lead="Tell us the dimensions, the weight and the two ends of the journey. We will tell you how it moves — or whether it should move differently."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-hivis-strong">
                Telephone
              </h2>
              <a
                href={contact.phoneHref}
                className="mt-3 block text-4xl font-semibold tracking-tight text-graphite-900 underline decoration-hivis decoration-2 underline-offset-8"
              >
                {contact.phone}
              </a>

              <h2 className="mt-12 text-xs font-semibold uppercase tracking-[0.18em] text-hivis-strong">
                Email
              </h2>
              <ul className="mt-4 space-y-4">
                {contact.emails.map((person) => (
                  <li key={person.email} className="border-t border-steel-200 pt-4">
                    <a
                      href={`mailto:${person.email}`}
                      className="font-medium text-graphite-900 hover:text-hivis-strong"
                    >
                      {person.email}
                    </a>
                    <p className="mt-1 text-sm text-graphite-600">
                      {person.name} · {person.role}
                    </p>
                  </li>
                ))}
              </ul>

              <h2 className="mt-12 text-xs font-semibold uppercase tracking-[0.18em] text-hivis-strong">
                Depot &amp; offices
              </h2>
              <address className="mt-4 not-italic leading-relaxed text-graphite-600">
                {company.legalName}
                <br />
                {contact.address.street ? (
                  <>
                    {contact.address.street}
                    <br />
                  </>
                ) : null}
                {contact.address.locality}
                <br />
                {contact.address.region}
                {contact.address.postcode ? (
                  <>
                    <br />
                    {contact.address.postcode}
                  </>
                ) : null}
                <br />
                {contact.address.country}
              </address>

              <h2 className="mt-12 text-xs font-semibold uppercase tracking-[0.18em] text-hivis-strong">
                Hours
              </h2>
              <dl className="mt-4 space-y-2 text-sm">
                {contact.hours.map((slot) => (
                  <div
                    key={slot.days}
                    className="flex justify-between gap-6 border-b border-steel-200 pb-2"
                  >
                    <dt className="font-medium text-graphite-900">
                      {slot.days}
                    </dt>
                    <dd className="text-right text-graphite-600">{slot.time}</dd>
                  </div>
                ))}
              </dl>

              <h2 className="mt-12 text-xs font-semibold uppercase tracking-[0.18em] text-hivis-strong">
                Finding us
              </h2>
              <div className="mt-4">
                <TickList items={locationPoints} />
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Send an enquiry"
                title="Request a quote"
                lead="The more detail you can give, the closer the first number will be."
              />
              <div className="mt-8">
                <QuoteForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
