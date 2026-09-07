"use client";

import { useEffect, useState } from "react";
import { OFFER } from "@/lib/site";
import SoundToggle from "./SoundToggle";

/**
 * Persistent navigation — glass, but legible first.
 *
 * The old dots menu hid four links behind a full-screen ink wipe, which is a
 * lovely piece of choreography and a bad way to let someone find the price. The
 * bar is always there now, the section names are visible words, and the CTA
 * lives in it — which also lets the floating hire button go, since a fixed
 * corner button plus a fixed bar is two pieces of chrome doing one job.
 *
 * It only frosts once the page has moved, so it does not sit as a grey slab
 * over the hero on load.
 */

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Offer", href: "#offer" },
  { label: "Joseph", href: "#joseph" },
  { label: "Contact", href: "#start" },
];

export default function Nav() {
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[9500] transition-colors duration-300 ${
        lifted
          ? "border-b border-neon/20 bg-void/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="flex items-center justify-between gap-2 px-4 py-3.5 md:px-10"
      >
        {/* Spelled out at every width. It was abbreviated to "JtG" below 640px,
            which is the width where the visitor is least able to work out whose
            site this is from anything else on screen. */}
        <a href="/#main" className="t-mono text-neon">
          <span className="nav-brand">Joseph The Great</span>
        </a>

        {/* desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                className="t-mono underline-swipe text-cream/85"
                href={`/${l.href}`}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/#start"
              className="t-mono flex min-h-[40px] items-center bg-neon px-4 text-void transition-colors duration-300 hover:bg-acid"
            >
              {OFFER.cta}
            </a>
          </li>
        </ul>

        <a
          href="/#start"
          className="t-mono ml-auto flex min-h-11 items-center bg-neon px-3 text-void md:hidden"
        >
          3 free ideas
        </a>
        {/* mobile menu */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="nav-menu"
          className="t-mono flex min-h-[40px] items-center gap-2 border border-neon/40 px-3 text-cream md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
        <SoundToggle />
      </nav>

      {open && (
        <ul
          id="nav-menu"
          className="border-t border-neon/20 bg-void/95 px-6 pb-5 pt-2 backdrop-blur-md md:hidden"
        >
          {LINKS.map((l) => (
            <li
              key={l.href}
              className="border-b border-neon/15 last:border-b-0"
            >
              <a
                className="s-mid t-grotesk block py-3.5 text-cream"
                href={`/${l.href}`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
