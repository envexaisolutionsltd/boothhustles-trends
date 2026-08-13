import type { Metadata } from "next";
import PageHero from "@/components/azotea/PageHero";
import Reveal from "@/components/azotea/Reveal";
import EnquiryForm from "@/components/azotea/EnquiryForm";
import { business } from "@/lib/azotea";

export const metadata: Metadata = {
  title: "Group Bookings & Venue Hire",
  description:
    "Group dining for eight or more and exclusive venue hire at AZOTEA, the rooftop restaurant and bar in Leeds. Birthdays, work parties and private events twelve floors above Sovereign Square.",
  alternates: { canonical: "/azotea/group-bookings" },
};

const occasions = [
  {
    title: "Birthdays & celebrations",
    body: "Sharing plates down the middle of the table, cocktails on the terrace and Latin beats to finish.",
  },
  {
    title: "Work parties & client dinners",
    body: "Three minutes from Leeds Railway Station, with a private feel twelve floors above the city.",
  },
  {
    title: "Exclusive venue hire",
    body: "The whole rooftop — restaurant, bar and both terraces — as your own private space.",
  },
];

export default function GroupBookingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Groups & events"
        title="Your event, held"
        italic="above the city"
        lead="With exclusive venue hire in Leeds, you'll have the ultimate private space to host your event, paired with the electrifying spirit of Latin America. Group events run for parties of eight or more."
      />

      <section className="az-section-tight">
        <div className="az-wrap az-wrap-wide grid gap-5 md:grid-cols-3">
          {occasions.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <article className="az-card az-card-lift h-full">
                <span className="az-numeral">0{i + 1}</span>
                <h2 className="az-display mt-5 text-2xl">{item.title}</h2>
                <p className="az-body mt-3 text-[0.95rem]">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="az-section-tight">
        <div className="az-wrap az-wrap-wide grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <h2 className="az-display az-h3">Send an enquiry</h2>
            <p className="az-body mt-3 mb-7 max-w-xl">
              Tell us a little about the occasion and our events team will come back to
              you with availability and options.
            </p>
            <EnquiryForm kind="group" submitLabel="Send group enquiry" />
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-5">
              <div className="az-card">
                <p className="az-eyebrow az-eyebrow-plain">Talk to the events team</p>
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={`mailto:${business.groupsEmail}`}
                    className="az-btn az-btn-block"
                  >
                    {business.groupsEmail}
                  </a>
                  <a href={business.phoneHref} className="az-btn az-btn-ghost az-btn-block">
                    Call {business.phone}
                  </a>
                </div>
              </div>

              <div className="az-card">
                <p className="az-eyebrow az-eyebrow-plain">How group bookings work</p>
                <ul className="az-body mt-5 grid gap-3.5 text-[0.95rem]">
                  <li>
                    <strong className="text-[var(--az-bone)]">Eight or more.</strong>{" "}
                    Group events are for parties of eight guests and upwards.
                  </li>
                  <li>
                    <strong className="text-[var(--az-bone)]">Deposit & minimum spend.</strong>{" "}
                    For groups over eight we request a deposit as well as a minimum
                    spend.
                  </li>
                  <li>
                    <strong className="text-[var(--az-bone)]">Exclusive hire.</strong>{" "}
                    Available for larger events — get in touch and we&apos;ll talk it
                    through.
                  </li>
                  <li>
                    <strong className="text-[var(--az-bone)]">Terraces.</strong> Outdoor
                    space is weather dependent, so we&apos;ll always plan a backup.
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
