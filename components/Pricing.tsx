"use client";

import { motion } from "motion/react";
import SyrupEdge from "./SyrupEdge";
import { OFFER, PRICE_CEILING, PRICE_FLOOR } from "@/lib/site";

/**
 * The ceiling is drawn, not described: a hard bar nothing sits above.
 *
 * Price stays on the page and stays early. Around 71% of B2B decision-makers
 * now call price transparency important in supplier selection, and transparent
 * pricing converts fewer visitors but qualifies the ones it converts. The
 * specific reason it belongs here rather than behind a form: $700–$1,000 is
 * well under the $3,000+ this is competing with, so the number is an argument.
 * Hiding an advantage to "build value first" would forfeit it.
 *
 * The two mailto slabs that used to close this section are gone. They said
 * "DM us" and "Email us" for a business that is one person, and a mailto is a
 * poor primary action on a phone — it opens an empty draft the visitor has to
 * write themselves. Both now point at the form.
 */
export default function Pricing() {
  return (
    <section id="price" className="relative z-10 bg-[#e2a339] text-ink">
      <SyrupEdge />
      <div className="h-[10px] w-full bg-ink" />
      <div className="flex flex-wrap justify-between gap-x-8 gap-y-1 px-6 py-3 md:px-10">
        <span className="t-mono">ceiling — ${PRICE_CEILING.toLocaleString()} cad</span>
        <span className="t-mono text-syrup-deep">nothing is priced above this line</span>
      </div>

      <div className="px-6 pb-20 pt-10 md:px-10 md:pb-28 md:pt-16">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ type: "spring", stiffness: 140, damping: 20 }}
          className="s-mega t-grotesk leading-[0.88]"
        >
          {/* two lines, not one: "$700 to $1,000" at 19vw runs off a phone */}
          <span className="block">${PRICE_FLOOR}</span>
          <span className="block">
            <span className="t-serif pr-[0.12em] text-[0.44em] font-normal text-syrup-deep">
              to
            </span>
            ${PRICE_CEILING.toLocaleString()}
          </span>
        </motion.p>

        <div className="mt-10 grid gap-x-16 gap-y-10 md:mt-16 md:grid-cols-[minmax(0,26rem)_minmax(0,30rem)]">
          <div>
            <p className="s-mid t-grotesk">
              Even if your project is complicated —{" "}
              <span className="t-serif font-normal">
                ${PRICE_CEILING.toLocaleString()} max.
              </span>
            </p>
            <p className="s-body mt-4 text-syrup-deep">
              Not a starting price. Not a tier you get upsold out of. The number
              doesn&apos;t move because the brief got harder.
            </p>
          </div>

          <ol className="space-y-0">
            {[
              "One person, no office, no account manager — nothing to pay for but my own time.",
              "No long-term contracts, no packages, no discovery-call funnel.",
              `Scope gets agreed in writing before anything starts, and the price still can't pass $${PRICE_CEILING.toLocaleString()}.`,
            ].map((line, i) => (
              <li key={i} className="flex gap-5 border-t border-ink/25 py-4 last:border-b">
                <span className="t-mono shrink-0 pt-1 text-syrup-deep">0{i + 1}</span>
                <span className="s-body">{line}</span>
              </li>
            ))}
          </ol>
        </div>

        <div id="contact" className="mt-16 scroll-mt-24 md:mt-24">
          <p className="t-mono mb-5 text-syrup-deep">
            you don&apos;t have to decide any of this yet
          </p>
          <a
            href="#start"
            className="group flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-y border-ink py-7 transition-colors duration-300 hover:bg-ink hover:px-5 hover:text-cream"
          >
            <span className="s-loud t-grotesk">{OFFER.cta}</span>
            <span className="t-mono text-syrup-deep transition-transform duration-500 group-hover:translate-x-2 group-hover:text-cream">
              three things back, free ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
