import { OFFER, PRICE_CEILING, PRICE_FLOOR } from "@/lib/site";

/**
 * What happens after you hit send.
 *
 * The barrier for a cold visitor is not persuasion, it is the fear of entering
 * a sales process they can't get out of. So every step names the thing people
 * are actually worried about — who reads it, how long, whether there's a call,
 * and what happens if they say no — and step 04 caps the obligation out loud.
 */

const STEPS = [
  {
    n: "01",
    title: "You send your Instagram",
    body: "Two fields: the handle or the website, and an email or number to reply to. Instagram blocks messages from people you don't follow, so a handle alone leaves me no way to answer. No budget dropdown, no company size.",
  },
  {
    n: "02",
    title: "I actually open it",
    body: `Me, not an assistant and not a template. I watch what you've got and write back with the first three things I'd change. ${OFFER.reply}`,
  },
  {
    n: "03",
    title: "If you want them made, I quote you",
    body: `Between $${PRICE_FLOOR} and $${PRICE_CEILING.toLocaleString()}. A harder brief does not move it — $${PRICE_CEILING.toLocaleString()} is the ceiling, not the starting point. Nothing to sign to get a number.`,
  },
  {
    n: "04",
    title: "If you don't, you keep the three things",
    body: "Go do them yourself, or hand them to whoever makes your content now. That's the whole deal. No calendar link, no chasing — I'm one person, not a pipeline.",
  },
];

export default function Process() {
  return (
    <section className="bg-paper px-6 py-16 md:px-10 md:py-24">
      <p className="t-mono eyebrow text-syrup">What happens after you hit send</p>
      <h2 className="t-grotesk mt-5 max-w-[18ch] text-[clamp(1.9rem,7.4vw,3.2rem)] leading-[0.95]">
        Four steps, and you can{" "}
        <span className="t-serif font-normal text-syrup">get off at any of them.</span>
      </h2>

      <ol className="mt-11 max-w-[44rem]">
        {STEPS.map((s) => (
          <li key={s.n} className="flex gap-5 border-t border-ink/25 py-6 last:border-b md:gap-8">
            <span className="t-mono shrink-0 pt-1 text-syrup">{s.n}</span>
            <div>
              <p className="s-mid t-grotesk">{s.title}</p>
              <p className="s-body mt-2 text-ash">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
