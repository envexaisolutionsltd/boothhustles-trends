import type { Metadata } from "next";
import { PageHero } from "@/components/lts/PageHero";
import { QuoteForm } from "@/components/lts/QuoteForm";
import { Container, TickList } from "@/components/lts/ui";
import { contact, moveProcess, stats } from "@/lib/lts/content";

export const metadata: Metadata = {
  title: "Request a Heavy Haulage Quote",
  description:
    "Send your load dimensions, weight and collection and delivery points for a route assessment and price from Lewis Transport Services.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request a quote"
        title="Tell us the load, we'll tell you how it moves"
        lead="Every quote starts with a route assessment, not a rate card. Send what you know and we will work out the rest."
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <QuoteForm />

            <aside className="space-y-10">
              <div className="border border-steel-200 bg-steel-50 p-7">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-hivis-strong">
                  Need an answer today?
                </h2>
                <a
                  href={contact.phoneHref}
                  className="mt-3 block text-3xl font-semibold tracking-tight text-graphite-900 underline decoration-hivis decoration-2 underline-offset-8"
                >
                  {contact.phone}
                </a>
                <p className="mt-4 text-sm leading-relaxed text-graphite-600">
                  For urgent movements, a two minute call usually beats a form.
                </p>
              </div>

              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-hivis-strong">
                  What helps us quote accurately
                </h2>
                <div className="mt-5">
                  <TickList
                    items={[
                      "Travelling dimensions — length, width and height",
                      "Gross weight, and whether it can be split",
                      "Collection and delivery postcodes",
                      "Loading and unloading arrangements on both sites",
                      "Any fixed date the movement has to hit",
                      "Photographs or a general arrangement drawing",
                    ]}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-hivis-strong">
                  What happens next
                </h2>
                <ol className="mt-5 space-y-5">
                  {moveProcess.map((stage) => (
                    <li key={stage.step} className="flex gap-4">
                      <span className="font-mono text-xs font-semibold text-hivis-strong">
                        {stage.step}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-graphite-900">
                          {stage.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-graphite-600">
                          {stage.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <dl className="grid grid-cols-2 gap-6 border-t border-steel-200 pt-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-2xl font-semibold tracking-tight text-graphite-900">
                      {stat.value}
                    </dt>
                    <dd className="mt-1 text-xs text-graphite-600">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
