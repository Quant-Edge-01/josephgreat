"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { EMAIL, IG_HANDLE, IG_URL } from "@/lib/site";

const LINKS = [
  { n: "01", label: "Work", href: "#work" },
  { n: "02", label: "Price", href: "#price" },
  { n: "03", label: "Contact", href: "#contact" },
];

/* the three dots sit at -9 / 0 / +9 and fold into a cross on open */
const DOT = [
  { rest: { y: -9, rotate: 0, width: 8 }, open: { y: 0, rotate: 45, width: 26 } },
  { rest: { y: 0, width: 8, opacity: 1, scale: 1 }, open: { y: 0, width: 8, opacity: 0, scale: 0 } },
  { rest: { y: 9, rotate: 0, width: 8 }, open: { y: 0, rotate: -45, width: 26 } },
];

export default function DotsMenu() {
  const [open, setOpen] = useState(false);
  const [onDark, setOnDark] = useState(false);

  /**
   * The control is fixed over four different backdrops (white, amber, near-black).
   * One colour cannot survive all of them — gold on the amber pricing slab is
   * about 1.3:1. So watch which sections cross the top strip the dots sit in.
   */
  useEffect(() => {
    const targets = document.querySelectorAll("[data-nav-dark]");
    if (!targets.length) return;
    const lit = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) lit.add(e.target);
          else lit.delete(e.target);
        }
        setOnDark(lit.size > 0);
      },
      { rootMargin: "0px 0px -90% 0px", threshold: 0 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="fixed right-5 top-5 z-[9500] grid h-11 w-11 place-items-center md:right-8 md:top-8"
      >
        <span className="relative block h-[26px] w-[26px]">
          {DOT.map((d, i) => (
            <motion.span
              key={i}
              initial={false}
              animate={open ? d.open : d.rest}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              className="absolute left-1/2 top-1/2 block h-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: open || onDark ? "#f4efe3" : "#0d0c0b",
                borderRadius: open ? 2 : 999,
              }}
            />
          ))}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="sheet"
            className="fixed inset-0 z-[9400] overflow-hidden"
            initial="hide"
            animate="show"
            exit="hide"
          >
            {/* ink disc grows out of the dots — same visual grammar as the jar entry */}
            {/* zero-size anchor: a shrink-to-fit wrapper would inherit the
                disc's 300vmax width and drag the whole circle off-screen */}
            <div className="absolute right-[42px] top-[42px] h-0 w-0 md:right-[54px] md:top-[54px]">
              <motion.div
                variants={{
                  hide: { scale: 0, transition: { duration: 0.4, ease: [0.7, 0, 0.84, 0] } },
                  show: { scale: 1, transition: { duration: 0.66, ease: [0.16, 1, 0.3, 1] } },
                }}
                style={{ x: "-50%", y: "-50%" }}
                className="h-[300vmax] w-[300vmax] rounded-full bg-ink"
              />
            </div>

            <nav className="relative flex h-full flex-col justify-between px-6 pb-8 pt-24 md:px-14 md:pb-12">
              <ul>
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.n}
                    variants={{
                      hide: { y: 28, opacity: 0 },
                      show: {
                        y: 0,
                        opacity: 1,
                        transition: { delay: 0.16 + i * 0.06, type: "spring", stiffness: 240, damping: 24 },
                      },
                    }}
                    className="border-b border-cream/15 py-3 md:py-4"
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 text-cream"
                    >
                      <span className="t-mono text-gold">{l.n}</span>
                      <span className="s-loud t-grotesk transition-transform duration-500 group-hover:translate-x-2">
                        {l.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                variants={{
                  hide: { opacity: 0 },
                  show: { opacity: 1, transition: { delay: 0.36 } },
                }}
                className="t-mono flex flex-wrap items-end justify-between gap-x-8 gap-y-3 text-cream/45"
              >
                <span>Toronto, ON · 19 y/o · solo</span>
                <span className="flex gap-5">
                  <a className="underline-swipe text-cream/80" href={IG_URL}>
                    {IG_HANDLE}
                  </a>
                  <a className="underline-swipe text-cream/80" href={`mailto:${EMAIL}`}>
                    {EMAIL}
                  </a>
                </span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
