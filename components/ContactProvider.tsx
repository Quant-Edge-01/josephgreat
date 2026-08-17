"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { EMAIL, IG_HANDLE, IG_URL, OFFER, PRICE_CEILING, PRICE_FLOOR, mailto } from "@/lib/site";

const Ctx = createContext<(subject?: string) => void>(() => {});
export const useContact = () => useContext(Ctx);

/** Whether the panel is currently up — fixed page chrome hides behind it. */
const OpenCtx = createContext(false);
export const useContactOpen = () => useContext(OpenCtx);

/**
 * The panel behind the project-page CTAs.
 *
 * It used to be a price card with two mailto links under it, which is a dead
 * end: a mailto opens an empty draft that the visitor has to compose, on a
 * phone, having just read a case study. It now leads with the free offer and
 * sends people to the form, with the handle and address left as a fallback for
 * anyone who would rather not use one.
 *
 * Focus is trapped while it is open and returned to whatever opened it — a
 * dialog that drops focus back to the top of the document makes a keyboard user
 * re-traverse the whole page.
 */
export default function ContactProvider({ children }: { children: React.ReactNode }) {
  const [subject, setSubject] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((s = "Project") => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setSubject(s);
  }, []);

  const close = useCallback(() => {
    setSubject(null);
    openerRef.current?.focus?.();
  }, []);

  useEffect(() => {
    if (subject === null) return;

    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    // Move focus into the panel so the next Tab lands inside it.
    const raf = requestAnimationFrame(() =>
      panelRef.current?.querySelector<HTMLElement>("a[href], button")?.focus(),
    );

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
    };
  }, [subject, close]);

  return (
    <Ctx.Provider value={open}>
      <OpenCtx.Provider value={subject !== null}>{children}</OpenCtx.Provider>

      <AnimatePresence>
        {subject && (
          <motion.div
            className="fixed inset-0 z-[9600] flex items-end justify-center md:items-center"
            initial="hide"
            animate="show"
            exit="hide"
          >
            <motion.button
              aria-label="Close"
              tabIndex={-1}
              onClick={close}
              variants={{ hide: { opacity: 0 }, show: { opacity: 1 } }}
              className="absolute inset-0 bg-void/85"
            />

            <motion.div
              ref={panelRef}
              variants={{
                hide: { y: 40, opacity: 0, transition: { duration: 0.22 } },
                show: {
                  y: 0,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 260, damping: 26 },
                },
              }}
              role="dialog"
              aria-modal
              aria-label={`Start a project — ${subject}`}
              className="relative max-h-[92dvh] w-full max-w-[34rem] overflow-y-auto bg-void-2 p-7 pb-9 md:p-10"
              style={{ boxShadow: "0 0 0 1px #ffb43d55, 0 0 70px -10px #ffb43d40" }}
            >
              <div className="flex items-start justify-between gap-4">
                <p className="t-mono text-neon">re: {subject}</p>
                <button
                  onClick={close}
                  className="t-mono -mr-1 -mt-1 p-1 text-cream/70 hover:text-cream"
                >
                  close
                </button>
              </div>

              <p className="s-mid t-grotesk mt-7 text-cream">
                Send me your Instagram.{" "}
                <span className="t-serif font-normal text-neon">
                  I&apos;ll tell you the first three things I&apos;d change.
                </span>
              </p>
              <p className="s-body mt-4 text-cream/75">
                Free, and you&apos;re welcome to go do them yourself. {OFFER.reply}{" "}
                {OFFER.noCall}
              </p>

              <Link
                href="/#start"
                onClick={close}
                className="t-grotesk mt-7 flex min-h-[56px] w-full items-center justify-center gap-3 bg-neon px-6 text-[1.1rem] text-void transition-colors duration-300 hover:bg-acid"
              >
                {OFFER.cta}
                <span aria-hidden>→</span>
              </Link>

              <p className="t-note mt-5 text-cream/70">
                And if you want something made after that, it&apos;s ${PRICE_FLOOR}–$
                {PRICE_CEILING.toLocaleString()} CAD —{" "}
                <span className="text-cream">
                  ${PRICE_CEILING.toLocaleString()} is the ceiling
                </span>
                , not a starting point.
              </p>

              <div className="rule-neon mt-7 pt-5">
                <p className="t-mono text-cream/70">or reach me directly</p>
                <div className="t-mono mt-3 flex flex-wrap gap-x-7 gap-y-2">
                  <a className="underline-swipe text-cream" href={IG_URL}>
                    {IG_HANDLE} ↗
                  </a>
                  <a className="underline-swipe text-cream" href={mailto(subject)}>
                    {EMAIL} ↗
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
