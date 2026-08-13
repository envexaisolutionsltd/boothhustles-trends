import Link from "next/link";
import { Logo } from "@/components/lts/Logo";
import { Container, HazardRule } from "@/components/lts/ui";
import { company, contact, nav, services } from "@/lib/lts/content";

export function SiteFooter() {
  return (
    <footer className="bg-graphite-950 text-steel-300">
      <HazardRule />
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-steel-500">
              {company.strapline}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="hover:text-hivis"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav
                .filter((item) => item.href !== "/")
                .map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-hivis">
                      {item.label}
                    </Link>
                  </li>
                ))}
              <li>
                <Link href="/quote" className="hover:text-hivis">
                  Request a quote
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Contact
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={contact.phoneHref}
                  className="text-lg font-semibold text-white hover:text-hivis"
                >
                  {contact.phone}
                </a>
              </li>
              {contact.emails.map((person) => (
                <li key={person.email}>
                  <a href={`mailto:${person.email}`} className="hover:text-hivis">
                    {person.email}
                  </a>
                  <span className="block text-xs text-steel-500">
                    {person.name} · {person.role}
                  </span>
                </li>
              ))}
              <li className="pt-1 text-steel-500">
                {contact.address.locality}, {contact.address.region}
                <br />
                {contact.address.country}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-steel-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}. All rights
            reserved.
          </p>
          <p>
            {company.ownership} · Established {company.founded} · Doveridge,
            Derbyshire
          </p>
        </div>
      </Container>
    </footer>
  );
}
