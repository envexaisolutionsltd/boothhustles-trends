import type { Metadata } from "next";
import { PageHero } from "@/components/lts/PageHero";
import { TrailerArt } from "@/components/lts/TrailerArt";
import { Button, Container, SectionHeading } from "@/components/lts/ui";
import { credentials, fleet, stats } from "@/lib/lts/content";

export const metadata: Metadata = {
  title: "Heavy Haulage Fleet & Modular Trailer Equipment",
  description:
    "Scheuerle Euro-Combi modular equipment, low loader beds, bolsters and spacer decks — over 90 combinations and capacity for loads in excess of 150,000kg.",
  alternates: { canonical: "/fleet" },
};

export default function FleetPage() {
  return (
    <>
      <PageHero
        eyebrow="Fleet"
        title="A modern fleet of specialised heavy haulage vehicles"
        lead="Modular axle lines, low loader beds, bolsters and spacer decks combine into more than ninety configurations — so the trailer is built around the load rather than the load being forced onto a trailer."
      />

      <section className="border-b border-steel-200 bg-white py-12">
        <Container>
          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="space-y-6">
            {fleet.map((item) => (
              <article
                key={item.name}
                className="grid items-center gap-8 border border-steel-200 p-8 transition-colors hover:border-hivis sm:p-10 lg:grid-cols-[1fr_1.1fr]"
              >
                <div className="order-2 lg:order-1">
                  <h2 className="text-2xl font-semibold tracking-tight text-graphite-900">
                    {item.name}
                  </h2>
                  <p className="mt-2 font-mono text-xs uppercase tracking-wider text-hivis-strong">
                    {item.spec}
                  </p>
                  <p className="mt-5 text-pretty leading-relaxed text-graphite-600">
                    {item.detail}
                  </p>
                </div>
                <div className="order-1 bg-steel-50 p-8 lg:order-2">
                  <div className="text-graphite-700">
                    <TrailerArt variant={item.art} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-graphite-600">
            Configurations are selected per movement. If your load falls outside
            what is listed here, ask anyway — combination planning is a service
            in its own right.
          </p>
        </Container>
      </section>

      <section className="bg-steel-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Operating standards"
            title="How the fleet is run"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {credentials.map((item) => (
              <div key={item.title} className="border-l-2 border-hivis bg-white p-7">
                <h3 className="text-base font-semibold text-graphite-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite-600">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Button href="/quote">Request a quote</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
