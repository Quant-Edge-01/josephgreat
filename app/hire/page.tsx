import type { Metadata } from "next";
import Link from "next/link";
import Flagship from "@/components/Flagship";
import Identity from "@/components/Identity";
import Ledger from "@/components/Ledger";
import Objections from "@/components/Objections";
import Process from "@/components/Process";
import Scope from "@/components/Scope";
import StartHere from "@/components/StartHere";
import {
  FLAGSHIP_SLUG,
  IG_HANDLE,
  IG_URL,
  OFFER,
  PRICE_CEILING,
  PRICE_FLOOR,
} from "@/lib/site";
import { WORKS, workBySlug } from "@/lib/works";

/**
 * The page paid traffic lands on.
 *
 * It survives as a separate route for one reason: message match. The ad's
 * promise has to be repeated in the same words at the top of the page the click
 * lands on, and it cannot be if the visitor first has to get through a
 * full-screen poster and a scroll sequence. Ad-to-page congruence is the
 * largest single lever available on paid traffic, so the landing page keeps its
 * own fold.
 *
 * It is also deliberately leakier-proof than the home page: the dots menu and
 * the site footer are suppressed here (see SiteChrome), leaving one road. Cold
 * traffic with no formed preference is exactly the profile where extra choices
 * measurably hurt, even though choice overload is not a universal law.
 *
 * Everything is server-rendered and static — no scroll-linked sequence, no jar.
 */

const PRICE = `$${PRICE_FLOOR}–$${PRICE_CEILING.toLocaleString()} CAD`;

export const metadata: Metadata = {
  title: `Free: the 3 things I'd fix on your Instagram — Joseph The Great, Toronto`,
  description:
    "Reels, the ads behind them and the website they land on, for Toronto and GTA local businesses — built to start conversations rather than collect views. Send your Instagram and I'll tell you the first three things I'd change, free. Last local job: $214.86 of ads, 59 conversations at $3.64 each, 9 leads.",
  alternates: { canonical: "/hire" },
  openGraph: {
    title: "Send me your Instagram. I'll tell you the 3 things I'd fix.",
    description: `Reels, ads and the website, for Toronto local businesses. ${PRICE}, and $${PRICE_CEILING.toLocaleString()} is a hard ceiling. Last local job: 59 conversations at $3.64 each.`,
    url: "/hire",
    siteName: "Joseph The Great",
    locale: "en_CA",
    type: "website",
  },
};

export default function HirePage() {
  const dream = workBySlug(FLAGSHIP_SLUG)!;
  const spend = dream.stats[0].value;
  const convos = dream.stats[1].value;
  const perConvo = dream.stats[2].value;
  const leads = dream.stats[3].value;

  return (
    <main id="main">
      {/* ---------- fold: who it's for, what it makes, what it's for, proof, one button ---------- */}
      <section className="bg-paper px-6 pb-14 pt-16 md:px-10 md:pb-20 md:pt-24">
        <p className="t-mono text-syrup">Toronto &amp; the GTA · one person, not an agency</p>

        <h1 className="t-grotesk mt-5 max-w-[17ch] text-[clamp(2.05rem,8.4vw,4.2rem)] leading-[0.94]">
          Everything a customer sees before they walk in, built to start{" "}
          <span className="t-serif font-normal">conversations</span> — not collect views.
        </h1>
        <p className="t-mono mt-5 text-syrup">
          reels · the ads behind them · the website they land on
        </p>

        {/*
          The proof, immediately under the claim and at full contrast. A claim
          set at low contrast is judged true at roughly chance (Reber & Schwarz
          1999), and this is the only hard evidence above the fold.
        */}
        <p className="s-proof t-grotesk mt-7 max-w-[38rem]">
          <span className="text-syrup">{spend}</span> of ads →{" "}
          <span className="text-syrup">{convos}</span> messaging conversations at{" "}
          <span className="text-syrup">{perConvo}</span> each →{" "}
          <span className="text-syrup">{leads}</span> leads.
        </p>
        <p className="t-mono mt-2.5 text-ash">
          a bridal alterations shop in the GTA · screenshots below
        </p>

        {/* ---------- the offer ---------- */}
        <div className="mt-11 border-t border-ink pt-8">
          <p className="t-mono text-syrup">Start with the free version</p>
          <p className="s-mid t-grotesk mt-4 max-w-[28ch]">
            I&apos;ll tell you the{" "}
            <span className="t-serif font-normal text-syrup">
              first three things I&apos;d change
            </span>{" "}
            about your account.
          </p>
          <p className="s-body mt-3 max-w-[38rem] text-ash">
            Free, and you&apos;re welcome to go do them yourself. {OFFER.reply}
          </p>

          <a
            href="#start"
            // w-fit, not w-auto: a block-level flex box still fills its line
            className="t-grotesk mt-8 flex min-h-[60px] w-full items-center justify-center gap-3 bg-ink px-8 text-[1.15rem] text-cream transition-colors duration-300 hover:bg-syrup sm:w-fit sm:min-w-[22rem]"
          >
            {OFFER.cta}
            <span aria-hidden>↓</span>
          </a>

          <p className="t-mono mt-4 text-ash">
            two fields · no call required · no phone number
          </p>
        </div>

        {/* price, deliberately subordinate: it is an advantage here, not the headline */}
        <p className="mt-9 max-w-[38rem] text-[1rem] leading-relaxed text-ash">
          If you do want something made afterwards, it&apos;s{" "}
          <span className="text-ink">{PRICE}</span> — and $
          {PRICE_CEILING.toLocaleString()} is the ceiling, not the starting point.
        </p>
      </section>

      <Flagship />
      <Ledger />
      <Scope />
      <Process />
      <Objections />
      <Identity />

      {/* ---------- the rest of the shelf ---------- */}
      <section data-nav-dark className="bg-void px-6 py-16 md:px-10 md:py-24">
        <h2 className="t-mono text-neon">Four jobs, every number screenshotted</h2>
        <p className="t-note mt-3 max-w-[40rem] text-cream/70">
          Marked for what each one actually proves, because a view and a customer are
          not the same thing.
        </p>

        <ul className="mt-9 border-t border-neon/25">
          {WORKS.map((w) => (
            <li key={w.slug}>
              <Link
                href={`/works/${w.slug}`}
                className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-neon/25 py-6"
              >
                <span className="min-w-0">
                  <span className="s-mid t-grotesk block text-cream transition-transform duration-500 group-hover:translate-x-2">
                    {w.title}
                  </span>
                  <span className="t-mono mt-1.5 block text-cream/60">{w.client}</span>
                </span>
                <span className="t-mono md:text-right">
                  <span
                    className={w.proves === "enquiries" ? "text-acid" : "text-cream/70"}
                  >
                    {w.headline.value}
                  </span>{" "}
                  <span className="text-cream/70">{w.headline.label}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <StartHere context="hire" />

      {/*
        A landing page footer, not the site one: no navigation back into the
        gallery, because the only thing this page is for is the form above it.
      */}
      <footer data-nav-dark className="bg-void px-6 pb-14 md:px-10">
        <div className="t-mono flex flex-wrap items-center justify-between gap-x-10 gap-y-3 border-t border-neon/20 pt-8 text-cream/60">
          <span>Joseph The Great · Toronto, ON · © {new Date().getFullYear()}</span>
          <a className="underline-swipe text-cream/85" href={IG_URL}>
            {IG_HANDLE} ↗
          </a>
        </div>
      </footer>
    </main>
  );
}
