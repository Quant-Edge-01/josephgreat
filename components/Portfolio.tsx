"use client";

import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { useContact } from "./ContactProvider";

/**
 * Five folders pulled out of a drawer — not a card grid.
 * Sizes, tab positions and vertical offsets are all different on purpose:
 * an even 3-column row of identical tiles is the single loudest tell that
 * nobody art-directed the page.
 */
const FILES = [
  {
    n: "01",
    kind: "short-form / retail",
    tab: "38%",
    preview: "h-56 md:h-72",
    col: "md:col-start-1 md:col-span-5",
    off: "md:mt-0",
    lean: "-0.7deg",
    mob: "mr-auto w-[94%]",
  },
  {
    n: "02",
    kind: "brand film",
    tab: "60%",
    preview: "h-44 md:h-56",
    col: "md:col-start-8 md:col-span-5",
    off: "md:mt-32",
    lean: "0.6deg",
    mob: "ml-auto w-[88%]",
  },
  {
    n: "03",
    kind: "surreal spot",
    tab: "28%",
    preview: "h-64 md:h-[22rem]",
    col: "md:col-start-2 md:col-span-6",
    off: "md:mt-4",
    lean: "0.9deg",
    mob: "mr-auto w-full",
  },
  {
    n: "04",
    kind: "ig launch",
    tab: "68%",
    preview: "h-48 md:h-60",
    col: "md:col-start-9 md:col-span-4",
    off: "md:mt-36",
    lean: "-1deg",
    mob: "ml-auto w-[86%]",
  },
  {
    n: "05",
    kind: "product",
    tab: "46%",
    preview: "h-52 md:h-64",
    col: "md:col-start-3 md:col-span-7",
    off: "md:mt-12",
    lean: "0.4deg",
    mob: "mr-auto w-[92%]",
  },
];

const STRIP = [
  "be unique",
  "surreal sells",
  "toronto, on",
  "$1,000 ceiling",
  "no retainers",
  "no book-a-call",
];

export default function Portfolio() {
  const contact = useContact();

  return (
    <section id="work" data-nav-dark className="relative bg-void pb-28 pt-20 md:pb-40 md:pt-28">
      {/* strip */}
      <div className="rule-neon overflow-hidden border-b border-neon/20 py-3">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0">
              {STRIP.map((s) => (
                <span key={s} className="t-mono flex items-center px-7 text-neon/70">
                  <span className="tick" />
                  {s}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <header className="flex flex-wrap items-end justify-between gap-6 px-6 pb-14 pt-16 md:px-10 md:pb-24 md:pt-24">
        <div>
          <p className="t-mono mb-4 text-neon/60">you are inside the jar</p>
          <h2 className="s-mega t-grotesk leading-[0.8] text-cream">
            Wor<span className="neon-txt">k</span>
          </h2>
        </div>
        <p className="t-mono max-w-[19rem] leading-relaxed text-cream/40">
          five folders. placeholders until the real cuts drop in — the frames,
          the type and the wiring are final.
        </p>
      </header>

      <div className="grid gap-y-8 px-6 md:grid-cols-12 md:items-start md:gap-x-5 md:gap-y-12 md:px-10">
        {FILES.map((f, i) => (
          <motion.article
            key={f.n}
            initial={{ opacity: 0, y: 42 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ type: "spring", stiffness: 150, damping: 22, delay: (i % 3) * 0.06 }}
            className={`folder ${f.col} ${f.off} ${f.mob}`}
            style={{ "--tab": f.tab, rotate: f.lean } as CSSProperties}
          >
            <div className="folder-halo" />
            <div className="folder-glow" />
            <div className="folder-rim folder-shape" />

            <div className="folder-fill folder-shape relative px-5 pb-5 pt-8 md:px-6 md:pb-6 md:pt-10">
              <div className="flex items-baseline justify-between gap-3">
                <span className="t-mono whitespace-nowrap text-neon">file {f.n}</span>
                <span className="t-mono text-right text-cream/35">{f.kind}</span>
              </div>

              <div
                className={`hatch mt-5 grid place-items-center border border-neon/20 ${f.preview}`}
              >
                <span className="t-mono whitespace-nowrap text-neon/45">[ asset pending ]</span>
              </div>

              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="s-mid t-grotesk text-cream/85">Project_{f.n}</p>
                  <p className="t-mono mt-1.5 text-cream/30">client — · year —</p>
                </div>
                <span className="t-mono shrink-0 text-acid/70">slot open</span>
              </div>

              <div className="mt-6 flex border-t border-neon/20 text-center">
                <button
                  onClick={() => contact(`Project_${f.n}`)}
                  className="t-mono flex-1 border-r border-neon/20 py-4 text-cream/70 transition-colors duration-300 hover:bg-neon hover:text-void"
                >
                  DM us
                </button>
                <button
                  onClick={() => contact(`Project_${f.n}`)}
                  className="t-mono flex-1 py-4 text-cream/70 transition-colors duration-300 hover:bg-acid hover:text-void"
                >
                  Email us
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
