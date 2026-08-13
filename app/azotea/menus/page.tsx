import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/azotea/PageHero";
import Reveal from "@/components/azotea/Reveal";
import MenuExplorer from "@/components/azotea/MenuExplorer";
import { business, lunchOffer, menus } from "@/lib/azotea";

export const metadata: Metadata = {
  title: "Our Latin American Menus",
  description:
    "Small plates, sharing picanha, ceviche, brunch and an agave-led cocktail list at AZOTEA, the Latin American rooftop restaurant and bar in Leeds. Weekday lunch £25 per person.",
  alternates: { canonical: "/azotea/menus" },
};

export default function MenusPage() {
  return (
    <>
      <PageHero
        eyebrow="The kitchen & bar"
        title="A menu that spans"
        italic="a continent"
        lead="From the sun-soaked coasts of Brazil to the spice-laden markets of Mexico — authentic dishes, bold flavours and the traditional cooking styles that underpin the culture of the Latin American region."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/azotea/book-a-table" className="az-btn">
            Book a table
          </Link>
          <a href={business.phoneHref} className="az-btn az-btn-ghost">
            Call {business.phone}
          </a>
        </div>
      </PageHero>

      {/* Interactive menu explorer */}
      <section className="az-section">
        <div className="az-wrap az-wrap-wide">
          <MenuExplorer />
        </div>
      </section>

      {/* Lunch offer */}
      <section className="az-section-tight">
        <div className="az-wrap az-wrap-wide">
          <Reveal>
            <div className="az-card flex flex-col items-start justify-between gap-6 border-[rgba(233,180,87,0.4)] md:flex-row md:items-center">
              <div>
                <p className="az-chip">{lunchOffer.price} · Weekdays</p>
                <h2 className="az-display az-h3 mt-4">{lunchOffer.title}</h2>
                <p className="az-body mt-2 max-w-xl">{lunchOffer.body}</p>
              </div>
              <Link href="/azotea/book-a-table" className="az-btn az-btn-gold shrink-0">
                Book weekday lunch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Full printed-menu style listing — good for SEO and for reading top to bottom */}
      <section className="az-section bg-[var(--az-night-2)]">
        <div className="az-wrap az-wrap-wide">
          <Reveal>
            <p className="az-eyebrow">Everything, in order</p>
            <h2 className="az-display az-h2 mt-5">The full list</h2>
            <p className="az-body mt-4 max-w-2xl">
              A selection from our menus. Dishes change with the seasons and with what
              our suppliers have at their best, so the list in the restaurant is always
              the definitive one.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-x-16 gap-y-14 md:grid-cols-2">
            {menus.map((menu, i) => (
              <Reveal key={menu.id} delay={(i % 2) * 90}>
                <section id={menu.id} className="scroll-mt-28">
                  <h3 className="az-display az-h3">{menu.name}</h3>
                  <p className="az-body mt-3 text-[0.95rem]">{menu.blurb}</p>
                  <ul className="mt-6">
                    {menu.dishes.map((dish) => (
                      <li
                        key={dish.name}
                        className="border-b border-[rgba(242,230,214,0.12)] py-4 first:border-t"
                      >
                        <p className="az-display text-lg">{dish.name}</p>
                        <p className="az-body mt-1 text-sm">{dish.detail}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 flex flex-col gap-3 sm:flex-row">
              <Link href="/azotea/book-a-table" className="az-btn">
                Book a table
              </Link>
              <Link href="/azotea/group-bookings" className="az-btn az-btn-ghost">
                Dining for eight or more
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
