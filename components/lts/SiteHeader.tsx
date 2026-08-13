"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/lts/Logo";
import { contact, nav } from "@/lib/lts/content";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-graphite-950/95 backdrop-blur supports-[backdrop-filter]:bg-graphite-950/80">
      {/* Contact strip — the phone number is never more than a glance away. */}
      <div className="hidden border-b border-white/10 lg:block">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-8 py-2 text-xs">
          <p className="text-steel-500">
            Heavy haulage &amp; abnormal loads · UK &amp; Europe · Doveridge,
            Derbyshire
          </p>
          <p className="flex items-center gap-6">
            <a
              href={contact.phoneHref}
              className="font-semibold text-white hover:text-hivis"
            >
              {contact.phone}
            </a>
            <a
              href={`mailto:${contact.primaryEmail}`}
              className="text-steel-300 hover:text-hivis"
            >
              {contact.primaryEmail}
            </a>
          </p>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" aria-label="Lewis Transport Services — home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 text-sm font-medium transition-colors ${
                  active ? "text-hivis" : "text-steel-300 hover:text-white"
                }`}
              >
                {item.label}
                {active ? (
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-hivis"
                  />
                ) : null}
              </Link>
            );
          })}
          <Link
            href="/quote"
            className="rounded-sm bg-hivis px-5 py-3 text-sm font-semibold uppercase tracking-wider text-graphite-950 transition-colors hover:bg-hivis-strong"
          >
            Request a quote
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={contact.phoneHref}
            className="rounded-sm bg-hivis px-4 py-2.5 text-sm font-semibold text-graphite-950"
          >
            Call
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="lts-mobile-nav"
            className="flex h-11 w-11 items-center justify-center rounded-sm text-white ring-1 ring-inset ring-white/25"
          >
            <span className="sr-only">
              {open ? "Close menu" : "Open menu"}
            </span>
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="lts-mobile-nav"
          aria-label="Main"
          className="border-t border-white/10 bg-graphite-900 lg:hidden"
        >
          <ul className="mx-auto w-full max-w-6xl px-5 py-2 sm:px-8">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-white/10 last:border-0">
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="block py-4 text-base font-medium text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <Link
                href="/quote"
                onClick={closeMenu}
                className="block rounded-sm bg-hivis px-5 py-3.5 text-center text-sm font-semibold uppercase tracking-wider text-graphite-950"
              >
                Request a quote
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
