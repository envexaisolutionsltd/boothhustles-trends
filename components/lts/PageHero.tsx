import { Container, Eyebrow, HazardRule } from "@/components/lts/ui";

/** Compact dark hero used at the top of every page except the home page. */
export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-graphite-950">
      <div aria-hidden className="lts-grid absolute inset-0" />
      <div
        aria-hidden
        className="absolute -right-32 top-0 h-full w-1/3 skew-x-[-12deg] bg-graphite-900"
      />
      <Container className="relative py-16 sm:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-steel-300">
            {lead}
          </p>
        ) : null}
      </Container>
      <HazardRule />
    </section>
  );
}
