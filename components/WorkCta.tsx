"use client";

import { OFFER } from "@/lib/site";
import { useContact } from "./ContactProvider";

/**
 * The close on a project page.
 *
 * Two slabs reading "DM us" and "Email us" became one, because they were not
 * two choices — they were the same decision behind two doors, for a business
 * that is one person, described as "us". This offers the free thing instead,
 * which is the only ask a stranger who has just finished reading a case study
 * is likely to say yes to.
 */
export default function WorkCta({ subject }: { subject: string }) {
  const contact = useContact();

  return (
    <div className="rule-neon pt-1">
      <p className="t-mono mb-6 text-neon">want this for yours?</p>
      <button
        onClick={() => contact(subject)}
        className="group flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-3 border-y border-neon/30 py-7 text-left transition-colors duration-300 hover:bg-neon hover:px-5 hover:text-void"
      >
        <span className="s-loud t-grotesk text-cream group-hover:text-void">
          {OFFER.cta}
        </span>
        <span className="t-mono text-neon transition-transform duration-500 group-hover:translate-x-2 group-hover:text-void">
          three things back, free ↗
        </span>
      </button>
    </div>
  );
}
