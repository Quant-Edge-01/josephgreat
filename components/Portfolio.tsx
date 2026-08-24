"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { WORKS } from "@/lib/works";

/**
 * Four folders pulled out of a drawer — not a card grid.
 * Spans, tab positions, heights and lean angles all differ on purpose: with
 * four items the lazy answer is a 4-up row of identical tiles, which is the
 * loudest possible tell that nobody art-directed the page. Columns are picked
 * so no two cards share a band inside the same grid row.
 */

const STRIP = [
  "be unique",
  "surreal sells",
  "toronto & the gta",
  "$1,000 ceiling",
  "no long-term contracts",
  "no book-a-call",
  "$3.64 per conversation",
];

export default function Portfolio() {
  return (
    <section id="work" data-nav-dark className="relative bg-void pb-28 pt-20 md:pb-40 md:pt-28">
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
          <p className="t-mono mb-4 text-neon">you are inside the jar</p>
          <h2 className="s-mega t-grotesk leading-[0.8] text-cream">
            Wor<span className="neon-txt">k</span>
          </h2>
        </div>
        <p className="t-note max-w-[21rem] text-cream/70">
          Four jobs. Every number on them is a screenshot away — open one. The first two
          are local businesses; the last two are proof I can make things people watch.
        </p>
      </header>

      <div className="grid gap-y-8 px-6 md:grid-cols-12 md:items-start md:gap-x-5 md:gap-y-14 md:px-10">
        {WORKS.map((w, i) => (
          <motion.article
            key={w.slug}
            initial={{ opacity: 0, y: 42 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ type: "spring", stiffness: 150, damping: 22, delay: (i % 2) * 0.07 }}
            className={`folder ${w.card.col} ${w.card.off} ${w.card.mob}`}
            style={{ "--tab": w.card.tab, rotate: w.card.lean } as CSSProperties}
          >
            <div className="folder-halo" />
            <div className="folder-glow" />
            <div className="folder-rim folder-shape" />

            <Link
              href={`/works/${w.slug}`}
              className="folder-fill folder-shape relative block px-5 pb-5 pt-8 md:px-6 md:pb-6 md:pt-10"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="t-mono whitespace-nowrap text-neon">file {w.n}</span>
                {/* what the job is evidence *of*, so a local owner isn't left to
                    infer that 33.1M views means 33.1M customers */}
                <span
                  className={`t-mono whitespace-nowrap ${
                    w.proves === "enquiries" ? "text-acid" : "text-cream/60"
                  }`}
                >
                  {w.proves === "enquiries" ? "enquiries" : "reach"}
                </span>
              </div>

              <div
                className={`hatch relative mt-5 overflow-hidden border border-neon/20 ${w.card.preview}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={w.cover}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="cover-img h-full w-full object-cover object-top"
                />
              </div>

              <div className="mt-5">
                <p className="s-mid t-grotesk text-cream">{w.title}</p>
                <p className="t-mono mt-1.5 text-cream/60">{w.client}</p>
                {/* One card in four is a client who is still paying. Say so. */}
                {w.current && (
                  <p className="t-mono mt-2 text-acid">
                    <span
                      aria-hidden
                      className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-acid align-middle"
                    />
                    still running · since {w.since}
                  </p>
                )}
              </div>

              {/* the headline number, given room to be read rather than tucked
                  into a corner at 70% opacity */}
              <p className="mt-4 flex flex-wrap items-baseline gap-x-2.5">
                <span className="t-grotesk text-[clamp(1.35rem,4.6vw,1.9rem)] leading-none text-acid">
                  {w.headline.value}
                </span>
                <span className="t-mono text-cream/70">{w.headline.label}</span>
              </p>

              <div className="t-mono mt-6 flex items-center justify-between border-t border-neon/25 pt-4 text-cream/85">
                <span>open file</span>
                <span aria-hidden className="text-neon">
                  ↗
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
