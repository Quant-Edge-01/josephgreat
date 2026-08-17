import TrackReach from "./TrackReach";

/**
 * The honesty block, and probably the most persuasive thing on the site.
 *
 * Small-business hesitancy is a calibrated response to a real history of
 * vendors over-promising, not irrationality (Forrester; Inciarte, SSRN). You do
 * not argue someone out of that with more superlatives — you show them you know
 * which of your own numbers is the weak one. Volunteering the unflattering
 * reading of your own evidence costs nothing, is verifiable, and is something
 * almost nobody competing for this budget will do.
 *
 * It also does the job the brief asked for directly: views, conversations and
 * leads are three different things and the page has to say so out loud.
 */

const ROWS = [
  {
    n: "01",
    term: "Views",
    gloss: "Somebody watched.",
    body: "The cheapest of the three and the easiest to make large. I have a channel with 33.1 million of them. It is a real number and it proves I can make something people watch — it does not prove anybody walked into a shop.",
    weight: "cheap",
  },
  {
    n: "02",
    term: "Conversations",
    gloss: "Somebody opened a message thread with the business.",
    body: "This one costs money and it is the number I would judge me on. On the bridal job: $214.86 of ad spend, 59 of them, $3.64 each. Best day of the run, $1.46.",
    weight: "the one that counts",
  },
  {
    n: "03",
    term: "Leads",
    gloss: "Somebody actually wanted the thing.",
    body: "Nine, out of those 59. I am not going to dress that up — roughly one in six conversations was a real customer, and the other five were people asking questions. That ratio is the honest version.",
    weight: "the real one",
  },
];

export default function Ledger() {
  return (
    <section data-nav-dark className="bg-void px-6 py-16 md:px-10 md:py-24">
      <TrackReach id="proof" />

      <p className="t-mono eyebrow text-neon">Read the numbers properly</p>
      <h2 className="t-grotesk mt-5 max-w-[20ch] text-[clamp(1.9rem,7.4vw,3.4rem)] leading-[0.95] text-cream">
        Three different numbers.{" "}
        <span className="t-serif font-normal text-neon">Only one of them costs money.</span>
      </h2>

      <dl className="mt-12 border-t border-neon/25">
        {ROWS.map((r) => (
          <div
            key={r.n}
            className="grid gap-x-8 gap-y-3 border-b border-neon/25 py-7 md:grid-cols-[4rem_minmax(0,18rem)_minmax(0,34rem)]"
          >
            <span className="t-mono text-neon">{r.n}</span>
            <dt>
              <span className="s-mid t-grotesk block text-cream">{r.term}</span>
              <span className="t-mono mt-2 block text-neon/80">{r.weight}</span>
            </dt>
            <dd>
              <p className="s-body text-cream">{r.gloss}</p>
              <p className="s-body mt-2 text-cream/70">{r.body}</p>
            </dd>
          </div>
        ))}
      </dl>

      <p className="s-mid t-grotesk mt-12 max-w-[38rem] text-cream">
        Anyone selling you &ldquo;views&rdquo;{" "}
        <span className="t-serif font-normal text-neon">
          is selling you the cheapest of the three.
        </span>
      </p>
    </section>
  );
}
