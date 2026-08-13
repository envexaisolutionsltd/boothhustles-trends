import type { Metadata } from "next";
import { PageHero } from "@/components/lts/PageHero";
import {
  Button,
  Container,
  SectionHeading,
  TickList,
} from "@/components/lts/ui";
import {
  company,
  contact,
  credentials,
  locationPoints,
  stats,
  yearsTrading,
} from "@/lib/lts/content";

export const metadata: Metadata = {
  title: "About Lewis Transport Services",
  description: `Established in ${company.founded}, Lewis Transport Services is a privately owned heavy haulage company based in Doveridge, Derbyshire, on the National High Load route.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={`Moving abnormal loads since ${company.founded}`}
        lead={`${company.name} (${company.shortName}) was established in ${company.founded} to provide clients with a top quality and professional heavy haulage and consultancy service.`}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="The company"
                title="Privately owned, and it shows in the answer you get"
              />
              <div className="mt-7 space-y-5 text-pretty leading-relaxed text-graphite-600">
                <p>
                  {yearsTrading} years on, {company.shortName} remains a{" "}
                  {company.ownership.toLowerCase()} business. The people who
                  price your movement are the people who plan it, and the people
                  who plan it work alongside the crews who drive it.
                </p>
                <p>
                  That matters most on the awkward jobs. A load that does not
                  fit a standard trailer usually does not fit a standard process
                  either — it needs someone to walk the route, work the
                  combination, and say honestly whether it can be done in one
                  piece or should travel in sections.
                </p>
                <p>
                  Alongside the heavy haulage fleet, we offer international
                  heavy haulage consultancy, international project management,
                  and warehousing and storage — so a project can be handled
                  under one roof rather than stitched together across three
                  suppliers.
                </p>
              </div>

              <dl className="mt-12 grid gap-8 border-t border-steel-200 pt-10 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-3xl font-semibold tracking-tight text-graphite-900">
                      {stat.value}
                    </dt>
                    <dd className="mt-1.5 text-sm text-graphite-600">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <aside className="h-fit border border-steel-200 bg-steel-50 p-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-hivis-strong">
                Our base
              </h2>
              <p className="mt-4 text-lg font-semibold text-graphite-900">
                {contact.address.locality}, {contact.address.region}
              </p>
              <div className="mt-6">
                <TickList items={locationPoints} />
              </div>

              <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-hivis-strong">
                Who you&rsquo;ll speak to
              </h2>
              <ul className="mt-4 space-y-4">
                {contact.emails.map((person) => (
                  <li key={person.email} className="border-t border-steel-200 pt-4">
                    <p className="font-semibold text-graphite-900">
                      {person.name}
                    </p>
                    <p className="text-sm text-graphite-600">{person.role}</p>
                    <a
                      href={`mailto:${person.email}`}
                      className="mt-1 inline-block text-sm text-graphite-900 underline decoration-hivis decoration-2 underline-offset-4"
                    >
                      {person.email}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>

      <section className="bg-graphite-950 py-20 sm:py-24">
        <Container>
          <SectionHeading
            tone="dark"
            eyebrow="Why clients stay"
            title="Experience is the safety system"
            lead="Abnormal load work has no margin for improvisation. These are the habits that keep movements uneventful."
          />
          <div className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {credentials.map((item) => (
              <div key={item.title} className="bg-graphite-950 p-8">
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-300">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Button href="/quote">Request a quote</Button>
            <Button href="/contact" variant="ghost">
              Contact us
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
