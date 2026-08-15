import type { Metadata } from "next";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
import { EMAIL, IG_HANDLE, IG_URL, PRICE_CEILING, PRICE_FLOOR, mailto } from "@/lib/site";
import { WORKS, workBySlug } from "@/lib/works";

/**
 * The page paid traffic lands on. Everything here is server-rendered and
 * static — no scroll-linked sequence, no jar. Cold visitors from a Reel get
 * offer, price, proof and a form; the artistic homepage stays for people who
 * already know who he is.
 */

const PRICE = `$${PRICE_FLOOR}–$${PRICE_CEILING.toLocaleString()} CAD`;

export const metadata: Metadata = {
  title: `Short-form video for Toronto businesses — ${PRICE} | Joseph The Great`,
  description: `Short-form marketing video for Toronto and GTA local businesses. ${PRICE}, and $${PRICE_CEILING.toLocaleString()} is a hard ceiling. Last local campaign: $3.64 per conversation started.`,
  openGraph: {
    title: `Short-form video for Toronto businesses — ${PRICE}`,
    description:
      "$214.86 of ad spend, 59 conversations started, $3.64 each. Tell me what you're promoting.",
    url: "/hire",
    siteName: "Joseph The Great",
    locale: "en_CA",
    type: "website",
  },
};

export default function HirePage() {
  const dream = workBySlug("dream-alteration")!;
  const spend = dream.stats[0].value;
  const convos = dream.stats[1].value;
  const perConvo = dream.stats[2].value;
  const leads = dream.stats[3].value;

  return (
    <main>
      {/* ---------- fold: offer, price, proof, one button ---------- */}
      <section className="bg-paper px-6 pb-14 pt-16 md:px-10 md:pb-20 md:pt-24">
        <p className="t-mono text-syrup">Toronto &amp; the GTA</p>

        <h1 className="t-grotesk mt-5 max-w-[16ch] text-[clamp(2.05rem,8.6vw,4.4rem)] leading-[0.94]">
          Short-form video for local businesses that need customers, not
          <span className="t-serif font-normal"> impressions.</span>
        </h1>

        <p className="s-mid t-grotesk mt-7">
          {PRICE}
          <span className="t-serif font-normal text-syrup-deep">
            {" "}
            — and ${PRICE_CEILING.toLocaleString()} is the ceiling, not the starting point.
          </span>
        </p>

        <p className="s-body mt-5 max-w-[36rem] text-syrup-deep">
          Last local job — a bridal alterations shop in the GTA: {spend} of ad spend,{" "}
          {convos} messaging conversations started at {perConvo} each, {leads} of them
          became leads.
        </p>

        <a
          href="#enquiry"
          // w-fit, not w-auto: a block-level flex box still fills its line
          className="t-grotesk mt-9 flex min-h-[56px] w-full items-center justify-center bg-ink px-8 text-[1.15rem] text-cream transition-colors duration-300 hover:bg-syrup sm:w-fit sm:min-w-[22rem]"
        >
          Tell me what you&apos;re promoting
        </a>

        <p className="t-mono mt-4 text-ash">
          three fields · no call · no phone number
        </p>
      </section>

      {/* ---------- proof strip ---------- */}
      <section data-nav-dark className="bg-void px-6 py-16 md:px-10 md:py-24">
        <h2 className="t-mono text-neon/70">Four jobs, every number screenshotted</h2>

        <ul className="mt-8 border-t border-neon/20">
          {WORKS.map((w) => (
            <li key={w.slug}>
              <Link
                href={`/works/${w.slug}`}
                className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-neon/20 py-6"
              >
                <span className="min-w-0">
                  <span className="s-mid t-grotesk block text-cream transition-transform duration-500 group-hover:translate-x-2">
                    {w.title}
                  </span>
                  <span className="t-mono mt-1.5 block text-cream/35">{w.client}</span>
                </span>
                {/* one line rather than two stacked columns — the labels are
                    longer than the values and cramp badly under 400px */}
                <span className="t-mono text-cream/35 md:text-right">
                  <span className="text-acid">{w.stats[0].value}</span> {w.stats[0].label}
                  <span className="px-2 text-cream/20">·</span>
                  <span className="text-acid">{w.stats[1].value}</span> {w.stats[1].label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- featured case: the one a local owner recognises ---------- */}
      <section className="bg-[#e2a339] px-6 py-16 text-ink md:px-10 md:py-24">
        <p className="t-mono text-syrup-deep">The closest thing to your business</p>
        <h2 className="t-grotesk mt-5 text-[clamp(1.9rem,7.4vw,3.4rem)] leading-[0.95]">
          {dream.title}
        </h2>
        <p className="t-mono mt-3 text-syrup-deep">{dream.client}</p>

        <dl className="mt-10 grid grid-cols-2 border-t border-ink/25 md:grid-cols-4">
          {dream.stats.map((s) => (
            <div key={s.label} className="border-b border-r border-ink/25 py-6 pr-4 last:border-r-0">
              <dt className="t-grotesk text-[clamp(1.4rem,5vw,2.3rem)] leading-none">
                {s.value}
              </dt>
              <dd className="t-mono mt-2.5 text-syrup-deep">{s.label}</dd>
            </div>
          ))}
        </dl>

        <p className="s-body mt-8 max-w-[38rem]">
          Appointments-only shop, so an enquiry has to be a real one — there is no
          walk-in traffic to hide a weak campaign behind. On the best day of the run
          a conversation cost $1.46.
        </p>

        <Link
          href={`/works/${dream.slug}`}
          className="t-mono mt-8 inline-flex items-center gap-3 border border-ink px-5 py-4 transition-colors duration-300 hover:bg-ink hover:text-cream"
        >
          see the screenshots
          <span aria-hidden>↗</span>
        </Link>
      </section>

      {/* ---------- how it works ---------- */}
      <section className="bg-paper px-6 py-16 md:px-10 md:py-24">
        <h2 className="t-mono text-syrup">How it works</h2>
        <ol className="mt-8 max-w-[40rem]">
          {[
            "You tell me what you're promoting. One sentence is enough to start.",
            "I come back with what I'd make and what it costs. Nothing to sign to get that.",
            "The price lands between $700 and $1,000 — a harder brief does not move it.",
            "No retainers, no packages, no discovery call you have to sit through.",
          ].map((line, i) => (
            <li key={i} className="flex gap-5 border-t border-ink/20 py-5 last:border-b">
              <span className="t-mono shrink-0 pt-1.5 text-syrup">0{i + 1}</span>
              <span className="s-body">{line}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- the form ---------- */}
      <section
        id="enquiry"
        data-nav-dark
        className="scroll-mt-4 bg-void px-6 py-16 md:px-10 md:py-24"
      >
        <h2 className="t-grotesk text-[clamp(1.9rem,7.4vw,3.4rem)] leading-[0.95] text-cream">
          What are we promoting<span className="text-neon">?</span>
        </h2>
        <p className="s-body mt-5 max-w-[34rem] text-cream/60">
          Three fields. I reply myself, usually within a day.
        </p>

        <div className="mt-10">
          <EnquiryForm />
        </div>

        {/* secondary, for people who would rather not use a form at all */}
        <div className="mt-14 max-w-[34rem] border-t border-neon/20 pt-6">
          <p className="t-mono text-cream/40">or, if you&apos;d rather not fill anything in</p>
          <div className="t-mono mt-4 flex flex-wrap gap-x-8 gap-y-3">
            <a className="underline-swipe text-cream/70" href={IG_URL}>
              {IG_HANDLE} ↗
            </a>
            <a className="underline-swipe text-cream/70" href={mailto("Project")}>
              {EMAIL} ↗
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
