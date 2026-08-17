import { PRICE_CEILING, PRICE_FLOOR } from "@/lib/site";

/**
 * The questions a sceptical owner is already asking, answered in the words they
 * would use rather than the words a brochure would.
 *
 * Two rules held here. Every answer concedes something true before it argues —
 * an answer that costs the writer nothing reads as marketing and gets
 * discounted. And the last one gives permission to leave, because the
 * alternative is pretending there is no version of this where the visitor is
 * right to close the tab, which every reader can see through.
 */

const QA = [
  {
    q: "You're nineteen.",
    a: `I am, and that is exactly why this costs $${PRICE_FLOOR} instead of $3,000. I've been making content since I was eleven and it's been the only thing I do for three years. Every number on this site is a screenshot — ask me to open any of them live and I will.`,
  },
  {
    q: "I hired someone for this before. It didn't work.",
    a: "Most of what I've seen sold around here is a retainer attached to a template. There's no retainer here and no package: one job, one price, and you can stop after it. If the three things I send back are obvious and useless, you'll know within a day and it will have cost you nothing.",
  },
  {
    q: "Will this actually work for my business?",
    a: "It works when the customer is local and the decision is fast — gyms, clinics, salons, restaurants, trades, studios, alterations. It works badly when someone has to buy something complicated or expensive off the back of one video. If yours is the second kind, I'll say so in the reply instead of taking the job.",
  },
  {
    q: `Why only $${PRICE_FLOOR}–$${PRICE_CEILING.toLocaleString()}? What's the catch?`,
    a: "No office, no account manager, no sales team, no software licences. I work alone out of Toronto and I'd rather you come back a second time than pay agency rates once. That's the entire catch.",
  },
  {
    q: "Someone already makes my content.",
    a: "Then take the three things and hand them to that person. I mean it — it costs me twenty minutes and it costs you nothing, and I'd rather be the person whose notes were useful than the person who wouldn't share them.",
  },
  {
    q: "Why shouldn't I just close this page?",
    a: "If you aren't spending anything on ads and you're happy with the customers walking in, close it. I'm not going to invent a reason for you. If you are spending — the free version of this is two fields and about fifteen seconds, and the worst case is you get three notes you disagree with.",
  },
];

export default function Objections() {
  return (
    <section className="bg-cream px-6 py-16 md:px-10 md:py-24">
      <p className="t-mono eyebrow text-syrup">Before you ask</p>
      <h2 className="t-grotesk mt-5 max-w-[16ch] text-[clamp(1.9rem,7.4vw,3.2rem)] leading-[0.95]">
        The awkward questions,{" "}
        <span className="t-serif font-normal text-syrup">answered first.</span>
      </h2>

      <dl className="mt-11 grid gap-x-14 md:grid-cols-2">
        {QA.map((item) => (
          <div key={item.q} className="border-t border-ink/25 py-7">
            <dt className="s-mid t-grotesk max-w-[24ch]">{item.q}</dt>
            <dd className="s-body mt-3 max-w-[42ch] text-ash">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
