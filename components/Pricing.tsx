"use client";

import { motion } from "motion/react";
import { EMAIL, IG_HANDLE, IG_URL, PRICE_CEILING, PRICE_FLOOR, mailto } from "@/lib/site";

/* the ceiling is drawn, not described: a hard bar nothing sits above */
export default function Pricing() {
  return (
    <section id="price" className="relative bg-[#e2a339] text-ink">
      <div className="h-[10px] w-full bg-ink" />
      <div className="flex flex-wrap justify-between gap-x-8 gap-y-1 px-6 py-3 md:px-10">
        <span className="t-mono">ceiling — ${PRICE_CEILING.toLocaleString()} cad</span>
        <span className="t-mono text-ink/55">nothing is priced above this line</span>
      </div>

      <div className="px-6 pb-24 pt-10 md:px-10 md:pb-36 md:pt-16">
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
              <span className="t-serif font-normal">${PRICE_CEILING.toLocaleString()} max.</span>
            </p>
            <p className="s-body mt-4 text-syrup-deep">
              Not a starting price. Not a tier you get upsold out of. The number
              doesn&apos;t move because the brief got harder.
            </p>
          </div>

          <ol className="space-y-0">
            {[
              "I'm 19. I'd rather you come back twice than pay agency rates once.",
              "No retainers, no packages, no discovery-call funnel.",
              "Scope gets agreed after we talk, and the price still can't pass $1,000.",
            ].map((line, i) => (
              <li
                key={i}
                className="flex gap-5 border-t border-ink/20 py-4 last:border-b"
              >
                <span className="t-mono shrink-0 pt-1.5 text-syrup-deep">
                  0{i + 1}
                </span>
                <span className="s-body">{line}</span>
              </li>
            ))}
          </ol>
        </div>

        <div id="contact" className="mt-20 scroll-mt-24 md:mt-32">
          <p className="t-mono mb-6 text-syrup-deep">two ways in — that&apos;s all there is</p>
          <div className="border-t border-ink">
            <a
              href={IG_URL}
              className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-ink/25 py-6"
            >
              <span className="s-loud t-grotesk transition-transform duration-500 group-hover:translate-x-3">
                DM us
              </span>
              <span className="t-mono text-syrup-deep">{IG_HANDLE} ↗</span>
            </a>
            <a
              href={mailto("Project")}
              className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-ink py-6"
            >
              <span className="s-loud t-grotesk transition-transform duration-500 group-hover:translate-x-3">
                Email us
              </span>
              <span className="t-mono text-syrup-deep">{EMAIL} ↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
