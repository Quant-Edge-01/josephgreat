"use client";

import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { EMAIL, IG_HANDLE, IG_URL, PRICE_CEILING, PRICE_FLOOR, mailto } from "@/lib/site";

const Ctx = createContext<(subject?: string) => void>(() => {});
export const useContact = () => useContext(Ctx);

export default function ContactProvider({ children }: { children: React.ReactNode }) {
  const [subject, setSubject] = useState<string | null>(null);
  const open = useCallback((s = "Project") => setSubject(s), []);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setSubject(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <Ctx.Provider value={open}>
      {children}

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
              onClick={() => setSubject(null)}
              variants={{ hide: { opacity: 0 }, show: { opacity: 1 } }}
              className="absolute inset-0 bg-void/85"
            />

            <motion.div
              variants={{
                hide: { y: 40, opacity: 0, transition: { duration: 0.22 } },
                show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 26 } },
              }}
              role="dialog"
              aria-modal
              className="relative w-full max-w-[34rem] bg-void-2 p-7 pb-9 md:p-10"
              style={{ boxShadow: "0 0 0 1px #ffb43d55, 0 0 70px -10px #ffb43d40" }}
            >
              <div className="flex items-start justify-between">
                <p className="t-mono text-neon/70">re: {subject}</p>
                <button
                  onClick={() => setSubject(null)}
                  className="t-mono -mr-1 -mt-1 p-1 text-cream/45 hover:text-cream"
                >
                  close
                </button>
              </div>

              <p className="s-loud t-grotesk mt-7 text-cream">
                ${PRICE_FLOOR}
                <span className="text-neon/50"> — </span>
                <span className="neon-txt">${PRICE_CEILING.toLocaleString()}</span>
                <span className="t-mono ml-3 align-middle text-cream/40">CAD</span>
              </p>
              <p className="s-body mt-4 text-cream/65">
                That&apos;s the whole range. However complicated the brief gets,{" "}
                <span className="text-cream">${PRICE_CEILING.toLocaleString()} is the ceiling</span> —
                not a starting point.
              </p>

              <div className="rule-neon mt-8 pt-1">
                <a
                  href={IG_URL}
                  className="group flex items-baseline justify-between border-b border-neon/15 py-4"
                >
                  <span className="s-mid t-grotesk text-cream">DM us</span>
                  <span className="t-mono text-neon/70 transition-transform duration-400 group-hover:-translate-y-0.5">
                    {IG_HANDLE} ↗
                  </span>
                </a>
                <a
                  href={mailto(subject)}
                  className="group flex items-baseline justify-between py-4"
                >
                  <span className="s-mid t-grotesk text-cream">Email us</span>
                  <span className="t-mono text-neon/70 transition-transform duration-400 group-hover:-translate-y-0.5">
                    {EMAIL} ↗
                  </span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
