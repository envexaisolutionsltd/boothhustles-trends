import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/** Page-width container. One value, used everywhere. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** Small uppercase label that sits above a section heading. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-hivis-strong">
      <span aria-hidden className="h-px w-8 bg-hivis" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
}) {
  const dark = tone === "dark";
  return (
    <header
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow ? (
        <div className={align === "center" ? "flex justify-center" : ""}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h2
        className={`mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-graphite-900"
        }`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-4 text-pretty text-base leading-relaxed sm:text-lg ${
            dark ? "text-steel-300" : "text-graphite-600"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </header>
  );
}

type ButtonProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "ghost" | "outline";
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-sm font-semibold uppercase tracking-wider transition-colors";
  const variants = {
    primary: "bg-hivis text-graphite-950 hover:bg-hivis-strong",
    ghost:
      "bg-white/10 text-white ring-1 ring-inset ring-white/25 hover:bg-white/20",
    outline:
      "text-graphite-900 ring-1 ring-inset ring-graphite-700/25 hover:bg-steel-50",
  } as const;

  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

/** Bordered content card with a hi-vis rule on hover. */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative flex h-full flex-col border border-steel-200 bg-white p-7 transition-colors hover:border-hivis ${className}`}
    >
      {children}
    </div>
  );
}

/** Hi-vis tick used in every capability list. */
export function Tick() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="mt-1 h-4 w-4 shrink-0 text-hivis-strong"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
    >
      <path d="M3 8.5 6.5 12 13 4.5" />
    </svg>
  );
}

export function TickList({
  items,
  tone = "light",
}: {
  items: readonly string[];
  tone?: "light" | "dark";
}) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed">
          <Tick />
          <span className={tone === "dark" ? "text-steel-300" : "text-graphite-600"}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** 4px hi-vis hazard band used to separate major sections. */
export function HazardRule() {
  return <div aria-hidden className="lts-hazard h-1.5 w-full" />;
}
