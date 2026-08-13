import Reveal from "@/components/azotea/Reveal";

export default function PageHero({
  eyebrow,
  title,
  italic,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Trailing words rendered in the display italic. */
  italic?: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden az-grain">
      <div className="az-sky absolute inset-0" aria-hidden="true">
        <div className="az-skyline az-skyline-low opacity-55" />
        <div className="az-fade-bottom" />
      </div>
      <div className="az-wrap az-wrap-wide relative pb-16 pt-28 md:pb-24 md:pt-36">
        <Reveal>
          <p className="az-eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal delay={90}>
          <h1 className="az-display az-h2 mt-6 max-w-[18ch] text-[clamp(2.6rem,6.5vw,5rem)]">
            {title} {italic ? <span className="az-ital">{italic}</span> : null}
          </h1>
        </Reveal>
        {lead ? (
          <Reveal delay={170}>
            <p className="az-lead mt-7">{lead}</p>
          </Reveal>
        ) : null}
        {children ? (
          <Reveal delay={240}>
            <div className="mt-9">{children}</div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
