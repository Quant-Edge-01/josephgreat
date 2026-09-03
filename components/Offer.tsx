import SyrupEdge from "./SyrupEdge";
import { OFFER, PRICE_CEILING, PRICE_FLOOR, RETAINER } from "@/lib/site";

/**
 * One named offer, with edges.
 *
 * This replaces three sections that were each describing the same purchase in
 * different words — Scope ("how far it goes"), Process (four steps) and Pricing
 * (the drawn ceiling). Repeating a promise three ways does not make it more
 * believable, it makes the page longer and the reader more suspicious.
 *
 * The scope is deliberately bounded now. "Whatever is keeping the business
 * invisible" read as unlimited, and an unlimited promise at $700 invites the
 * reader to discount it rather than believe it. Five named deliverables and a
 * stated exclusion are more credible than an open offer at the same price.
 */

const INCLUDED = [
  "Three campaign concepts, built for your business rather than adapted from someone else's",
  "Vertical creative, shot or sourced and cut",
  "Meta campaign set up — or the one you have, fixed",
  "The landing page and the call to action it points at",
  "Measurement of conversations and qualified leads, not just views",
];

export default function Offer() {
  return (
    <section
      id="offer"
      className="relative z-10 scroll-mt-16 bg-[#e2a339] px-6 py-16 text-ink md:px-10 md:py-24"
    >
      <SyrupEdge />

      <p className="t-mono eyebrow text-syrup-deep">The way in</p>
      <h2 className="t-grotesk mt-5 max-w-[15ch] text-[clamp(2.1rem,8vw,4rem)] leading-[0.92]">
        30-day customer
        <span className="t-serif font-normal"> acquisition test.</span>
      </h2>

      <div className="mt-11 grid gap-x-16 gap-y-10 md:grid-cols-[minmax(0,30rem)_minmax(0,26rem)]">
        <ol className="reveal border-t border-ink/30">
          {INCLUDED.map((line, i) => (
            <li key={i} className="flex gap-5 border-b border-ink/30 py-4">
              <span className="t-mono shrink-0 pt-1 text-syrup-deep">0{i + 1}</span>
              <span className="s-body">{line}</span>
            </li>
          ))}
        </ol>

        <div>
          <p className="t-grotesk text-[clamp(2.6rem,11vw,4.6rem)] leading-[0.9]">
            ${PRICE_FLOOR}
            <span className="t-serif px-[0.12em] text-[0.42em] font-normal text-syrup-deep">
              to
            </span>
            ${PRICE_CEILING.toLocaleString()}
          </p>
          <p className="t-mono mt-3 text-syrup-deep">CAD · ad spend is separate</p>

          <p className="s-body mt-6">
            ${PRICE_CEILING.toLocaleString()} is a ceiling, not a starting point — a
            harder brief does not move it. What it does not cover: your ad budget,
            anything print, and rebuilding a business that needs more than how it looks
            online.
          </p>
          <p className="s-body mt-4 text-syrup-deep">
            If it works and you want it to keep going, monthly continuation runs about $
            {RETAINER.monthly} — month to month, nothing to sign.
          </p>

          <a
            href="#start"
            className="t-grotesk mt-9 flex min-h-[58px] w-full items-center justify-center gap-3 bg-ink px-6 text-[1.1rem] text-cream transition-colors duration-300 hover:bg-syrup-deep"
          >
            {OFFER.cta}
            <span aria-hidden>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
