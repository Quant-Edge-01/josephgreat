import type { CSSProperties } from "react";
import { FLAGSHIP_SLUG, OFFER, RETAINER, retainedOrdinal } from "@/lib/site";
import { workBySlug } from "@/lib/works";

/**
 * The fold.
 *
 * It used to be the lockup and nothing else — one hundred vertical percent of
 * "Be unique." with a $3.64 proof line under it at about 1.6:1 against white.
 * A cold visitor off a Reel got two words: no service, no audience, no result
 * and no action, inside the ten seconds that decide whether the page survives
 * at all (NN/g, *How Long Do Users Stay on Web Pages?*).
 *
 * The poster is still the loudest thing here. It just isn't the only thing:
 * this screen now names who it's for, what gets made, what it's supposed to
 * produce, one number proving it happened, and one button.
 *
 * Note the absence of "use client" and of Framer Motion. This was a client
 * component; Motion serialises `initial` into the SSR markup as inline styles,
 * so every word above the fold was `opacity: 0` until React hydrated. The
 * entrance is now three CSS classes, which means the offer is painted with the
 * first frame of HTML and survives a failed or slow JS load entirely.
 */

const delay = (s: number) => ({ "--delay": `${s}s` }) as CSSProperties;

export default function Hero() {
  const dream = workBySlug(FLAGSHIP_SLUG)!;
  const [spend, convos, perConvo, leads] = dream.stats.map((s) => s.value);

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-between overflow-hidden bg-paper px-6 pb-6 pt-16 md:px-14 md:pb-8 md:pt-20">
      <p className="t-mono anim-up eyebrow text-syrup" style={delay(0.05)}>
        Joseph The Great — Toronto &amp; the GTA
      </p>

      <div className="flex flex-col items-center">
        {/*
          One lockup, two typefaces: the seam between them is the whole idea.

          It is a <p>, not the <h1>. Heading level is a semantic claim about
          what the page is about, and "Be unique." answers that for nobody —
          not a search result, not a screen-reader user landing cold. The h1 is
          the proposition below; this stays the loudest thing on the screen
          because size and heading level are different tools.
        */}
        <p className="s-hero mx-auto w-fit text-center leading-[0.76]">
          <span className="block overflow-hidden">
            <span
              className="t-grotesk anim-rise inline-block font-[800] tracking-[-0.06em]"
              style={delay(0.06)}
            >
              Be
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.1em]">
            <span
              className="t-serif anim-rise -ml-[0.03em] inline-block text-[1.14em]"
              style={delay(0.14)}
            >
              unique
              <span className="text-gold">.</span>
            </span>
          </span>
        </p>

        {/*
          The commercial half. Hung under the lockup on a hairline so it reads
          as the label on the jar rather than a marketing block bolted onto an
          art piece.
        */}
        <div className="anim-up mt-8 w-full max-w-[46rem] md:mt-9" style={delay(0.24)}>
          <div className="rule pt-6 text-center">
            {/*
              The scope, framed as one job rather than a list of them.

              It used to read "Surreal short-form video", which under-sold the
              thing by about everything: the same money also covers the ads and
              the site. But naming them as three services is the wrong fix —
              people comparing an all-in-one against specialists discount the
              all-in-one on each specialist's home turf (the compensatory
              inference in the jack-of-all-trades work). Presented as a single
              domain — what a customer sees before they walk in — breadth reads
              as one specialism instead of four hobbies.
            */}
            <h1 className="s-mid t-grotesk mx-auto max-w-[30ch] text-balance">
              Everything a customer sees before they walk in — built to start{" "}
              <span className="t-serif font-normal text-syrup">conversations</span>, not
              collect views.
            </h1>
            <p className="t-mono mt-4 text-syrup">
              reels · the ads behind them · the website they land on
            </p>

            <div className="mt-8 flex flex-col items-center gap-4">
              <a
                href="#start"
                className="t-grotesk flex min-h-[60px] w-full items-center justify-center gap-3 bg-ink px-8 text-[1.15rem] text-cream transition-colors duration-300 hover:bg-syrup sm:w-auto sm:min-w-[24rem]"
              >
                {OFFER.cta}
                <span aria-hidden>↓</span>
              </a>
              {/* sans, not the mono note face: three lines of letterspaced
                  uppercase-adjacent mono is a chore to read, and this sentence
                  is the offer */}
              <p className="mx-auto max-w-[32rem] text-[1rem] leading-relaxed text-ash">
                I&apos;ll tell you the first three things I&apos;d change — free, and
                you&apos;re welcome to go do them yourself.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/*
        The proof, at a contrast it can actually be believed at. This line was
        previously 10px mono at 40% opacity — around 1.6:1, which is the exact
        condition under which a true statement gets judged true at chance
        (Reber & Schwarz, 1999). It is the only hard evidence above the fold.
      */}
      <div className="anim-up mx-auto w-full max-w-[46rem] pt-5" style={delay(0.32)}>
        <p className="s-proof t-grotesk text-center text-ink">
          <span className="text-syrup">{spend}</span> of ads →{" "}
          <span className="text-syrup">{convos}</span> conversations at{" "}
          <span className="text-syrup">{perConvo}</span> each →{" "}
          <span className="text-syrup">{leads}</span> leads.
        </p>
        {/*
          The retention fact, not a decorative caption. Anyone can screenshot
          one good campaign; a client who keeps paying every month is the part
          that cannot be staged. Kept to a single mono line at the same weight
          so the fold's height does not change — it is already within ~10px of
          the bottom on a 13" laptop.
        */}
        <p className="t-mono mt-2.5 text-center text-ash">
          <span className="text-syrup">{retainedOrdinal()} month</span> running a GTA
          bridal shop · ${RETAINER.monthly}/mo
        </p>
      </div>
    </section>
  );
}
