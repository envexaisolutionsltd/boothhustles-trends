"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { business, nav } from "@/lib/azotea";

export default function SiteHeader() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const closeDrawer = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    // Deferred so the initial read doesn't set state during the effect body.
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // The drawer is closed from the links themselves (see closeDrawer below) so
  // that navigation never has to round-trip through an effect.

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`az-header ${stuck ? "is-stuck" : ""}`}>
        <div className="az-wrap az-wrap-wide flex items-center justify-between gap-6 py-4 md:py-5">
          <Link href="/azotea" aria-label="AZOTEA home" className="az-wordmark">
            AZOTEA
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-7">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="az-navlink"
                data-active={pathname === item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={business.phoneHref}
              className="az-navlink hidden md:inline-block"
            >
              {business.phone}
            </a>
            <div className="hidden sm:block">
              <Link href="/azotea/book-a-table" className="az-btn">
                Book a table
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="lg:hidden grid place-items-center h-11 w-11 rounded-full border border-[rgba(242,230,214,0.24)]"
            >
              <span className="sr-only">Open menu</span>
              <svg width="20" height="12" viewBox="0 0 20 12" aria-hidden="true">
                <path d="M0 1h20M0 6h20M0 11h14" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`az-drawer lg:hidden ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="az-wrap flex items-center justify-between py-4">
          <span className="az-wordmark">AZOTEA</span>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close menu"
            className="grid place-items-center h-11 w-11 rounded-full border border-[rgba(242,230,214,0.24)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <nav
          aria-label="Mobile"
          className="az-wrap flex-1 flex flex-col justify-center gap-1"
        >
          <Link href="/azotea" className="az-drawer-link" onClick={closeDrawer}>
            Home
          </Link>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="az-drawer-link" onClick={closeDrawer}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="az-wrap pb-10 space-y-3">
          <Link
            href="/azotea/book-a-table"
            className="az-btn az-btn-block"
            onClick={closeDrawer}
          >
            Book a table
          </Link>
          <a href={business.phoneHref} className="az-btn az-btn-ghost az-btn-block">
            Call {business.phone}
          </a>
        </div>
      </div>
    </>
  );
}
