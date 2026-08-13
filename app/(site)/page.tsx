import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/lts/QuoteForm";
import { TrailerArt } from "@/components/lts/TrailerArt";
import {
  Button,
  Card,
  Container,
  Eyebrow,
  HazardRule,
  SectionHeading,
  TickList,
} from "@/components/lts/ui";
import {
  company,
  contact,
  credentials,
  fleet,
  locationPoints,
  moveProcess,
  services,
  stats,
  yearsTrading,
} from "@/lib/lts/content";

export const metadata: Metadata = {
  title: `${company.name} | Heavy Haulage & Abnormal Load Specialists`,
  description: `Heavy haulage and abnormal load movement across the UK and Europe since ${company.founded}. Modular combinations to 150,000kg+, route surveys, permits and project management from our Doveridge base.`,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden bg-graphite-950">
        <div aria-hidden className="lts-grid absolute inset-0" />
        <div
          aria-hidden
          className="absolute -right-24 top-0 h-full w-[46%] skew-x-[-12deg] bg-graphite-900"
        />
        <Container className="relative py-20 sm:py-28 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Eyebrow>Heavy haulage · Abnormal loads · UK &amp; Europe</Eyebrow>
              <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                If it is too heavy, too wide or too tall,{" "}
                <span className="text-hivis">it is our kind of load.</span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-steel-300">
                {company.name} has moved heavy and abnormal loads across the UK
                and Europe since {company.founded}. Modular combinations,
                surveyed routes and one point of contact from collection to
                final position.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="/quote">Request a quote</Button>
                <Button href="/fleet" variant="ghost">
                  See the fleet
                </Button>
              </div>

              <p className="mt-8 text-sm text-steel-500">
                Speak to the traffic office directly:{" "}
                <a
                  href={contact.phoneHref}
                  className="text-lg font-semibold text-white underline decoration-hivis decoration-2 underline-offset-4 hover:text-hivis"
                >
                  {contact.phone}
                </a>
              </p>
            </div>

            {/* Capability panel — the numbers that qualify an enquiry fast. */}
            <div className="relative border border-white/15 bg-graphite-900/80 p-8 backdrop-blur">
              <div aria-hidden className="lts-hazard absolute inset-x-0 top-0 h-1.5" />
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-hivis">
                Capability at a glance
              </h2>
              <dl className="mt-7 space-y-6">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="border-b border-white/10 pb-5 last:border-0 last:pb-0"
                  >
                    <dt className="text-3xl font-semibold tracking-tight text-white">
                      {stat.value}
                    </dt>
                    <dd className="mt-1 text-sm text-steel-300">{stat.label}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-7 text-graphite-600">
                <TrailerArt variant="modular" />
              </div>
            </div>
          </div>
        </Container>
        <HazardRule />
      </section>

      {/* ------------------------------------------------------------ Services */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Four services, one operation"
            lead={`Everything from a single machine on a low loader to a multi-country project move — planned, permitted and driven by the same team.`}
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {services.map((service, index) => (
              <Card key={service.slug}>
                <span
                  aria-hidden
                  className="font-mono text-xs font-semibold text-hivis-strong"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-graphite-900">
                  {service.title}
                </h3>
                <p className="mt-3 text-pretty leading-relaxed text-graphite-600">
                  {service.summary}
                </p>
                <div className="mt-6">
                  <TickList items={service.points} />
                </div>
                <Link
                  href={`/services#${service.slug}`}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-graphite-900 group-hover:text-hivis-strong"
                >
                  More on this service
                  <span aria-hidden>→</span>
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------------- Fleet */}
      <section className="bg-graphite-950 py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <SectionHeading
              tone="dark"
              eyebrow="The fleet"
              title="Equipment matched to the load, not the other way round"
              lead="A modern fleet of specialised heavy haulage vehicles, run with modular equipment that reconfigures around whatever needs to move."
            />
            <div className="lg:justify-self-end">
              <Button href="/fleet" variant="ghost">
                Full fleet detail
              </Button>
            </div>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {fleet.map((item) => (
              <article key={item.name} className="bg-graphite-950 p-8">
                <div className="text-steel-500">
                  <TrailerArt variant={item.art} />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">
                  {item.name}
                </h3>
                <p className="mt-2 font-mono text-xs uppercase tracking-wider text-hivis">
                  {item.spec}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-steel-300">
                  {item.detail}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------- Why choose */}
      <section className="bg-steel-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Safety &amp; assurance"
            title="Abnormal loads are won or lost in the planning"
            lead="Every movement is surveyed, notified and engineered before a wheel turns. That is what keeps a load on schedule and off the verge."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {credentials.map((item) => (
              <div
                key={item.title}
                className="border-l-2 border-hivis bg-white p-7"
              >
                <h3 className="text-base font-semibold text-graphite-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite-600">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-sm text-graphite-600">
            {yearsTrading} years of abnormal load movement, from a privately
            owned business that still answers its own phone.{" "}
            <Link
              href="/about"
              className="font-semibold text-graphite-900 underline decoration-hivis decoration-2 underline-offset-4"
            >
              More about {company.shortName}
            </Link>
          </p>
        </Container>
      </section>

      {/* ------------------------------------------------------------- Process */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="How a move runs"
            title="From enquiry to final position"
          />
          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {moveProcess.map((stage) => (
              <li key={stage.step} className="border-t-2 border-graphite-900 pt-6">
                <span className="font-mono text-sm font-semibold text-hivis-strong">
                  {stage.step}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-graphite-900">
                  {stage.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite-600">
                  {stage.detail}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ------------------------------------------------------------ Location */}
      <section className="bg-graphite-900 py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                tone="dark"
                eyebrow="Where we are based"
                title="On the National High Load route"
                lead="Our depot and offices sit where abnormal loads want to be: on the high load route, minutes from the A50 between the M6 and the M1."
              />
              <div className="mt-8">
                <TickList items={locationPoints} tone="dark" />
              </div>
              <div className="mt-9">
                <Button href="/contact" variant="ghost">
                  Contact &amp; directions
                </Button>
              </div>
            </div>

            {/* Schematic of the corridor — no third-party map, no tracking. */}
            <div className="border border-white/15 bg-graphite-950 p-8">
              <svg
                viewBox="0 0 400 260"
                className="h-auto w-full"
                role="img"
                aria-label="Schematic showing Doveridge on the A50 corridor between the M6 and the M1"
              >
                <defs>
                  <pattern
                    id="lts-map-grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M40 0H0v40"
                      fill="none"
                      stroke="rgba(255,255,255,0.06)"
                    />
                  </pattern>
                </defs>
                <rect width="400" height="260" fill="url(#lts-map-grid)" />

                <path
                  d="M40 210V60"
                  stroke="#45515f"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M360 210V60"
                  stroke="#45515f"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M40 135h320"
                  stroke="#ffb400"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                <circle cx="196" cy="135" r="11" fill="#ffb400" />
                <circle cx="196" cy="135" r="20" fill="none" stroke="#ffb400" strokeWidth="1.5" opacity="0.5" />

                <text x="40" y="46" fill="#aab5c2" fontSize="15" fontWeight="600" textAnchor="middle">M6</text>
                <text x="360" y="46" fill="#aab5c2" fontSize="15" fontWeight="600" textAnchor="middle">M1</text>
                <text x="196" y="110" fill="#ffffff" fontSize="15" fontWeight="600" textAnchor="middle">Doveridge</text>
                <text x="196" y="176" fill="#aab5c2" fontSize="13" textAnchor="middle">A50 link road</text>
                <text x="196" y="234" fill="#6d7a89" fontSize="11" textAnchor="middle">
                  Staffordshire / Derbyshire border
                </text>
              </svg>
            </div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------------- Quote */}
      <section id="quote" className="bg-steel-50 py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionHeading
                eyebrow="Request a quote"
                title="Tell us the load, we'll tell you how it moves"
                lead="Send the dimensions and the two postcodes. We come back with a route assessment, the equipment we'd use and a price that holds."
              />
              <dl className="mt-9 space-y-6 border-t border-steel-200 pt-8">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-graphite-600">
                    Prefer to talk it through?
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={contact.phoneHref}
                      className="text-2xl font-semibold text-graphite-900 underline decoration-hivis decoration-2 underline-offset-4"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-graphite-600">
                    Email
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${contact.primaryEmail}`}
                      className="font-medium text-graphite-900 hover:text-hivis-strong"
                    >
                      {contact.primaryEmail}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            <QuoteForm />
          </div>
        </Container>
      </section>
    </>
  );
}
