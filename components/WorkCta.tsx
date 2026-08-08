"use client";

import { useContact } from "./ContactProvider";
import { PRICE_CEILING } from "@/lib/site";

/** Same two doors as the pricing section, and the same ceiling behind them. */
export default function WorkCta({ subject }: { subject: string }) {
  const contact = useContact();

  return (
    <div className="rule-neon pt-1">
      <p className="t-mono mb-6 text-neon/60">
        want this for yours? — still ${PRICE_CEILING.toLocaleString()} max
      </p>
      <div className="flex flex-col border-t border-neon/25 sm:flex-row">
        <button
          onClick={() => contact(subject)}
          className="group flex flex-1 items-center justify-between border-b border-neon/25 py-6 pr-4 text-left transition-colors duration-300 hover:bg-neon hover:pl-4 hover:text-void sm:border-b-0 sm:border-r"
        >
          <span className="s-loud t-grotesk text-cream group-hover:text-void">DM us</span>
          <span aria-hidden className="t-mono text-neon group-hover:text-void">
            ↗
          </span>
        </button>
        <button
          onClick={() => contact(subject)}
          className="group flex flex-1 items-center justify-between border-b border-neon/25 py-6 pr-4 text-left transition-colors duration-300 hover:bg-acid hover:pl-4 hover:text-void sm:pl-6"
        >
          <span className="s-loud t-grotesk text-cream group-hover:text-void">Email us</span>
          <span aria-hidden className="t-mono text-acid group-hover:text-void">
            ↗
          </span>
        </button>
      </div>
    </div>
  );
}
