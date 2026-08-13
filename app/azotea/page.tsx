import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/azotea/Reveal";
import FaqList from "@/components/azotea/FaqList";
import {
  business,
  chef,
  lunchOffer,
  menus,
  pillars,
  press,
} from "@/lib/azotea";

export const metadata: Metadata = {
  title: `${business.name} | Rooftop Restaurant & Bar in ${business.city}`,
  description:
    `Latin American rooftop restaurant and cocktail bar on the 12th floor of Sovereign Square, Leeds. ` +
    `Two terraces, skyline views, agave-led cocktails and open-fire cooking. Book a table.`,
  alternates: { canonical: "/azotea" },
};

const spaces = [
  {
    name: "The Restaurant",
    body:
      "A long dining room for the full menu with table service — ceviche, empanadas and picanha carved for the table.",
  },
  {
    name: "The Bar",
    body:
      "Built for cocktails and wine, with small plates alongside. Tequila, mezcal and rum at the centre of it.",
  },
  {
    name: "Two Terraces",
    body:
      "Open-air seating over Sovereign Square and the Leeds skyline. Terrace tables are subject to weather.",
  },
];

const marqueeWords = [
  "Ceviche",
  "Mezcal",
  "Picanha",
  "Salsa",
  "Churros",
  "Reggaetón",
  "Chimichurri",
  "Terrace",
  "Tequila",
];

export default function AzoteaHomePage() {
  return (
    <>
      {/* ------------------------------------------------------------------ Hero */}
      <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden az-grain">
        <div className="az-sky" aria-hidden="true">
          <div className="az-sun" />
          <div className="az-skyline" />
          <div className="az-fade-bottom h-1/4" />
        </div>

        <div className="az-wrap az-wrap-wide relative z-10 pb-16 pt-32 md:pb-24 md:pt-40">
          <Reveal>
            <p className="az-eyebrow">
              {business.city} · {business.floor} · Sovereign Square
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="az-display az-h1 mt-6 max-w-[16ch]">
              A rooftop <span className="az-ital">hacienda</span> above Leeds
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="az-lead mt-7">
              AZOTEA brings the flavours, music and warmth of Latin America twelve
              floors above Sovereign Square — authentic plates, an agave-led bar and
              two terraces looking out over the city skyline.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/azotea/book-a-table" className="az-btn">
                Book a table
              </Link>
              <Link href="/azotea/menus" className="az-btn az-btn-ghost">
                Explore the menus
              </Link>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-6 border-t border-[rgba(242,230,214,0.16)] pt-8 md:grid-cols-4">
              {[
                ["Floor", "12th"],
                ["Terraces", "Two"],
                ["Kitchen", "Latin American"],
                ["Open", "Daily from 12pm"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="az-label">{label}</dt>
                  <dd className="az-display mt-1.5 text-xl md:text-2xl">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------------- Marquee */}
      <div className="az-noise-band py-3.5">
        <div className="az-marquee">
          {[0, 1].map((copy) => (
            <div className="az-marquee-track" key={copy} aria-hidden={copy === 1}>
              {marqueeWords.map((word) => (
                <span
                  key={word}
                  className="az-display text-lg tracking-wide whitespace-nowrap md:text-xl"
                >
                  {word}
                  <span className="mx-6 opacity-50">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- Pillars */}
      <section className="az-section">
        <div className="az-wrap az-wrap-wide">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal>
              <p className="az-eyebrow">The rooftop</p>
              <h2 className="az-display az-h2 mt-5">
                Latin America, <span className="az-ital">twelve floors up</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="az-lead">
                Inspired by traditional haciendas, AZOTEA brings together authentic
                Latin flavours, music and dance. Our chefs and mixologists bring
                generations of tradition to life with ingredients and bold flavours
                that honour Latin America&apos;s culinary heritage.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 90}>
                <article className="az-card az-card-lift h-full">
                  <span className="az-numeral">0{i + 1}</span>
                  <h3 className="az-display mt-5 text-2xl">{pillar.title}</h3>
                  <p className="az-body mt-3 text-[0.95rem]">{pillar.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Menu */}
      <section className="az-section relative overflow-hidden bg-[var(--az-night-2)]">
        <div
          className="az-tiles pointer-events-none absolute -right-10 top-0 h-64 w-64 opacity-30"
          aria-hidden="true"
        />
        <div className="az-wrap az-wrap-wide relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="az-eyebrow">The kitchen</p>
              <h2 className="az-display az-h2 mt-5 max-w-[14ch]">
                Bold flavours, built to share
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <Link href="/azotea/menus" className="az-btn az-btn-ghost">
                See the full menus
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {menus.slice(0, 6).map((menu, i) => (
              <Reveal key={menu.id} delay={i * 70}>
                <Link
                  href={`/azotea/menus#${menu.id}`}
                  className="az-card az-card-lift block h-full"
                >
                  <h3 className="az-display text-2xl">{menu.name}</h3>
                  <p className="az-body mt-3 text-[0.95rem] line-clamp-4">{menu.blurb}</p>
                  <p className="az-link mt-6 inline-block text-sm">
                    View dishes →
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Lunch offer */}
          <Reveal delay={120}>
            <div className="az-card mt-6 flex flex-col items-start justify-between gap-6 border-[rgba(233,180,87,0.4)] md:flex-row md:items-center">
              <div>
                <p className="az-chip">Weekday lunch</p>
                <h3 className="az-display az-h3 mt-4">{lunchOffer.title}</h3>
                <p className="az-body mt-2 max-w-xl">{lunchOffer.body}</p>
              </div>
              <Link href="/azotea/book-a-table" className="az-btn az-btn-gold shrink-0">
                Book lunch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------------- Spaces */}
      <section className="az-section">
        <div className="az-wrap az-wrap-wide">
          <Reveal>
            <p className="az-eyebrow">The spaces</p>
            <h2 className="az-display az-h2 mt-5 max-w-[18ch]">
              A dining room, a bar and <span className="az-ital">two terraces</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {spaces.map((space, i) => (
              <Reveal key={space.name} delay={i * 110}>
                <article className="group relative">
                  <div
                    className="az-arch az-grain relative h-56 border border-[rgba(242,230,214,0.14)] sm:h-72"
                    style={{
                      background:
                        i === 0
                          ? "linear-gradient(165deg, #3a1c14, #1a0f0d 70%)"
                          : i === 1
                            ? "linear-gradient(165deg, #2b1a2a, #140d12 70%)"
                            : "linear-gradient(165deg, #1c3a30, #0d1613 70%)",
                    }}
                  >
                    <div className="az-tiles absolute inset-0 opacity-25" aria-hidden="true" />
                    <span className="az-numeral absolute bottom-4 right-5 opacity-70">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="az-display mt-6 text-2xl">{space.name}</h3>
                  <p className="az-body mt-2.5 text-[0.95rem]">{space.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- Groups */}
      <section className="az-section-tight">
        <div className="az-wrap az-wrap-wide">
          <Reveal>
            <div className="az-card az-light az-grain relative overflow-hidden p-0">
              <div className="relative grid gap-8 p-8 md:grid-cols-2 md:items-center md:p-14">
                <div>
                  <p className="az-eyebrow">Groups & events</p>
                  <h2 className="az-display az-h2 mt-5">
                    Take the rooftop <span className="az-ital">for the night</span>
                  </h2>
                  <p className="az-lead mt-5">
                    Group events run for parties of eight or more, and exclusive venue
                    hire gives you the whole space — the ultimate private room in Leeds,
                    paired with the electrifying spirit of Latin America.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link href="/azotea/group-bookings" className="az-btn">
                      Enquire about groups
                    </Link>
                    <a
                      href={`mailto:${business.groupsEmail}`}
                      className="az-btn az-btn-ghost"
                    >
                      {business.groupsEmail}
                    </a>
                  </div>
                </div>
                <ul className="grid gap-4 sm:grid-cols-2 md:gap-5">
                  {[
                    ["8+", "Group dining from eight guests"],
                    ["100%", "Exclusive hire of the rooftop"],
                    ["2", "Terraces for summer parties"],
                    ["12", "Floors above the city"],
                  ].map(([stat, label]) => (
                    <li
                      key={label}
                      className="rounded-xl border border-[rgba(33,20,15,0.14)] bg-[rgba(255,255,255,0.45)] p-5"
                    >
                      <p className="az-numeral">{stat}</p>
                      <p className="az-body mt-2 text-sm">{label}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------------- Story */}
      <section className="az-section bg-[var(--az-night-2)]">
        <div className="az-wrap az-wrap-wide grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="az-eyebrow">Our story</p>
            <h2 className="az-display az-h2 mt-5">
              Generations of tradition, <span className="az-ital">served nightly</span>
            </h2>
            <p className="az-lead mt-6">
              The menu is a tapestry of flavours and traditions — from the sun-soaked
              coasts of Brazil to the spice-laden markets of Mexico. The room shifts
              through the day with music, dance and cultural performances.
            </p>
            <Link href="/azotea/story" className="az-btn az-btn-ghost mt-8">
              Read our story
            </Link>
          </Reveal>

          <Reveal delay={140}>
            <article className="az-card h-full">
              <p className="az-chip">{chef.role}</p>
              <h3 className="az-display az-h3 mt-5">{chef.name}</h3>
              <p className="az-body mt-4">{chef.bio[0]}</p>
              <p className="az-body mt-3">{chef.bio[2]}</p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------------- Press */}
      <section className="az-section-tight">
        <div className="az-wrap az-wrap-wide">
          <Reveal>
            <p className="az-eyebrow">In the press</p>
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
        </div>
      </section>

      {/* ---------------------------------------------------------------- Find */}
      <section className="az-section">
        <div className="az-wrap az-wrap-wide grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <p className="az-eyebrow">Find us</p>
            <h2 className="az-display az-h2 mt-5">
              Three minutes from <span className="az-ital">Leeds station</span>
            </h2>
            <address className="az-lead mt-6 not-italic">
              {business.address.line1}
              <br />
              {business.address.line2}
              <br />
              {business.address.city} {business.address.postcode}
            </address>
            <p className="az-body mt-5">
              AZOTEA has its own entrance with a lift straight to the 12th floor — no
              need to go through the hotel. Parking at Q-Park Sovereign Square, right
              behind us.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/azotea/find" className="az-btn az-btn-ghost">
                Directions & access
              </Link>
              <a href={business.phoneHref} className="az-btn az-btn-ghost">
                {business.phone}
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="az-card h-full">
              <p className="az-eyebrow az-eyebrow-plain">Opening hours</p>
              <ul className="mt-6">
                {business.hoursDetail.map((row) => (
                  <li
                    key={row.days}
                    className="flex items-baseline justify-between gap-6 border-b border-[rgba(242,230,214,0.12)] py-4 last:border-0"
                  >
                    <span className="az-display text-lg">{row.days}</span>
                    <span className="az-body text-sm">{row.time}</span>
                  </li>
                ))}
              </ul>
              <hr className="az-rule my-6" />
              <div className="flex flex-col gap-2">
                <a href={business.phoneHref} className="az-link">
                  {business.phone}
                </a>
                <a href={`mailto:${business.email}`} className="az-link">
                  {business.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------------- FAQ */}
      <section className="az-section-tight bg-[var(--az-night-2)]">
        <div className="az-wrap az-wrap-wide grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Reveal>
            <p className="az-eyebrow">Good to know</p>
            <h2 className="az-display az-h2 mt-5">Before you visit</h2>
            <Link href="/azotea/faqs" className="az-link mt-6 inline-block">
              All frequently asked questions →
            </Link>
          </Reveal>
          <Reveal delay={100}>
            <FaqList limit={4} />
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------- Final CTA */}
      <section className="relative overflow-hidden az-grain">
        <div className="az-sky absolute inset-0" aria-hidden="true">
          <div className="az-sun" />
        </div>
        <div className="az-wrap az-wrap-wide relative py-20 text-center md:py-28">
          <Reveal>
            <h2 className="az-display az-h2 mx-auto max-w-[16ch]">
              Come up for <span className="az-ital">sunset</span>
            </h2>
            <p className="az-lead mx-auto mt-6">
              Tables, terraces and the bar — {business.hoursSummary.toLowerCase()}.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/azotea/book-a-table" className="az-btn">
                Book a table
              </Link>
              <Link href="/azotea/group-bookings" className="az-btn az-btn-ghost">
                Plan an event
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
