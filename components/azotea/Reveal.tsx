"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger, in milliseconds. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Fades content up as it scrolls into view.
 *
 * IntersectionObserver does the work, with a debounced scroll check as a
 * backstop: during a very fast scroll (or a jump to an anchor) an element can
 * pass through the viewport between two frames without the observer ever
 * reporting it, and content that never reveals would stay invisible. The CSS
 * honours prefers-reduced-motion, and content is shown outright where
 * IntersectionObserver isn't available.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    let timer = 0;

    const done = () => {
      setVisible(true);
      cleanup();
    };

    /** Reveal once the element has reached the viewport, or scrolled past it. */
    const check = () => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) done();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            done();
            return;
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(check, 120);
    };

    function cleanup() {
      observer.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    }

    observer.observe(node);
    window.addEventListener("scroll", onScroll, { passive: true });

    return cleanup;
  }, []);

  return (
    <Tag
      ref={ref}
      className={`az-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--az-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
