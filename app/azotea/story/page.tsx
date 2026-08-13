import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/azotea/PageHero";
import Reveal from "@/components/azotea/Reveal";
import { chef, press } from "@/lib/azotea";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "AZOTEA is a rooftop hacienda in Leeds, bringing together authentic Latin flavours, music and dance twelve floors above Sovereign Square. Meet head chef Jared Webb.",
  alternates: { canonical: "/azotea/story" },
};

const chapters = [
  {
    label: "The idea",
    title: "A hacienda, lifted twelve floors",
    body:
      "Inspired by traditional haciendas, AZOTEA was built to bring together authentic Latin flavours, music and dance — an unforgettable experience above Sovereign Square rather than another room on the street.",
  },
  {
    label: "The kitchen",
    title: "Bold flavours, traditional methods",
    body:
      "Our chefs and mixologists bring generations of tradition to life with ingredients and bold flavours that honour Latin America's culinary heritage — from the sun-soaked coasts of Brazil to the spice-laden markets of Mexico.",
  },
  {
    label: "The bar",
    title: "Every drink from somewhere",
    body:
      "The cocktail list leans on tequila, mezcal and rums from across the Caribbean, and each drink takes its cue from a country — its landscapes, its cultural stories or its native ingredients.",
  },
  {
    label: "The room",
    title: "Music, dance and performance",
    body:
      "AZOTEA changes through the day. Lunch on the terrace gives way to Latin rhythms as the sun drops, with live music, dance and cultural performances carrying the room into the night.",
  },
];

export default function StoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="Rooftop hacienda,"
        italic="Leeds"
        lead="AZOTEA — the Spanish word for a flat rooftop terrace — sits on the 12th floor of Sovereign Square, bringing the flavours, music and warmth of Latin America to the Leeds skyline."
      />

      <section className="az-section-tight">
        <div className="az-wrap az-wrap-wide grid gap-x-16 gap-y-12 md:grid-cols-2">
          {chapters.map((chapter, i) => (
            <Reveal key={chapter.title} delay={(i % 2) * 90}>
              <article>
                <p className="az-eyebrow">{chapter.label}</p>
                <h2 className="az-display az-h3 mt-5">{chapter.title}</h2>
                <p className="az-body mt-4">{chapter.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Chef */}
      <section className="az-section bg-[var(--az-night-2)]">
        <div className="az-wrap az-wrap-wide grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="az-eyebrow">{chef.role}</p>
            <h2 className="az-display az-h2 mt-5">{chef.name}</h2>
            <div
              className="az-arch az-grain mt-8 hidden h-64 border border-[rgba(242,230,214,0.14)] lg:block"
              style={{ background: "linear-gradient(165deg, #3a1c14, #1a0f0d 70%)" }}
              aria-hidden="true"
            >
              <div className="az-tiles h-full w-full opacity-25" />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-5">
              {chef.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="az-lead">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Press */}
      <section className="az-section-tight">
        <div className="az-wrap az-wrap-wide">
          <Reveal>
            <p className="az-eyebrow">What people are saying</p>
          </Reveal>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {press.map((item, i) => (
              <Reveal key={item.source} delay={i * 100}>
                <figure className="az-card h-full">
                  <blockquote className="az-display text-xl leading-snug md:text-2xl">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="az-label mt-6">{item.source}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <Link href="/azotea/book-a-table" className="az-btn">
                Book a table
              </Link>
              <Link href="/azotea/menus" className="az-btn az-btn-ghost">
                See the menus
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
