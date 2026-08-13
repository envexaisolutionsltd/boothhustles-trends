import type { Metadata } from "next";
import { PageHero } from "@/components/lts/PageHero";
import { TrailerArt } from "@/components/lts/TrailerArt";
import { Button, Container, TickList } from "@/components/lts/ui";
import { company, moveProcess, services } from "@/lib/lts/content";

export const metadata: Metadata = {
  title: "Heavy Haulage & Specialist Transport Services",
  description:
    "Heavy haulage, international heavy haulage consultancy, international project management and warehousing from Lewis Transport Services, Doveridge.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Specialist transport, planned end to end"
        lead={`${company.name} was established in ${company.founded} to provide clients with a top quality and professional heavy haulage and consultancy service. That is still the whole business.`}
      />

      <section className="bg-white">
        {services.map((service, index) => (
          <article
            key={service.slug}
            id={service.slug}
            className="scroll-mt-28 border-b border-steel-200 py-16 last:border-0 sm:py-20"
          >
            <Container>
              <div
                className={`grid gap-12 lg:grid-cols-2 lg:items-center ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-hivis-strong">
                    Service {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-graphite-900 sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-5 text-pretty text-lg leading-relaxed text-graphite-600">
                    {service.summary}
                  </p>
                  <div className="mt-8">
                    <TickList items={service.points} />
                  </div>
                </div>

                <div className="border border-steel-200 bg-steel-50 p-10">
                  <div className="text-graphite-700">
                    <TrailerArt
                      variant={
                        (["modular", "lowloader", "tractor", "stepframe"] as const)[
                          index % 4
                        ]
                      }
                    />
                  </div>
                  <p className="mt-8 border-l-2 border-hivis pl-5 text-sm leading-relaxed text-graphite-600">
                    Not sure which of these you need? Describe the load and we
                    will tell you what it takes to move it — including when the
                    answer is that it should travel in sections.
                  </p>
                  <div className="mt-7">
                    <Button href="/quote" variant="outline">
                      Request a quote
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          </article>
        ))}
      </section>

      <section className="bg-graphite-950 py-20 sm:py-24">
        <Container>
          <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            However complex the move, the sequence is the same
          </h2>
          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {moveProcess.map((stage) => (
              <li key={stage.step} className="border-t-2 border-hivis pt-6">
                <span className="font-mono text-sm font-semibold text-hivis">
                  {stage.step}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {stage.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-300">
                  {stage.detail}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
