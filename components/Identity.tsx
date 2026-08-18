import { EMAIL, IG_HANDLE, IG_URL, mailto } from "@/lib/site";

/**
 * Who is actually on the other end.
 *
 * Stanford's web-credibility work (Fogg et al., ~4,500 participants) puts
 * "show the real people behind the site" among the strongest levers available,
 * and this site had no face on it anywhere — for a solo operator asking a
 * stranger for $700, that is a large hole.
 *
 * The portrait is a background-image on purpose rather than an <img>: if
 * public/joseph.jpg is missing the browser simply paints the fallback beneath
 * it and the block still reads as designed, with no client-side error handling
 * and no broken-image icon. Drop the file in and it appears.
 */
export default function Identity() {
  return (
    <section data-nav-dark className="bg-void-2 px-6 py-16 md:px-10 md:py-24">
      <div className="grid gap-10 md:grid-cols-[minmax(0,20rem)_minmax(0,38rem)] md:gap-16">
        <div>
          {/*
            Two stacked layers, not one element with two backgrounds.

            This was a single div carrying the gradient as a Tailwind
            `bg-[linear-gradient(...)]` *and* the portrait as an inline
            `backgroundImage`. Both set the same CSS property, so the inline one
            silently replaced the gradient — and the monogram underneath was at
            -z-10, i.e. behind its own parent's background. With no
            public/joseph.jpg on disk the result was an empty bordered
            rectangle, which is worse than showing nothing at all: a broken
            looking element reads as a broken site, and roughly half of
            credibility judgements are made on visual design alone.

            Now the plate is a designed monogram and the photo is a layer on
            top of it. Drop joseph.jpg in and it covers the mark; leave it out
            and the mark is what you see. Still no JS, still no broken-image
            icon.
          */}
          <div className="relative aspect-[4/5] w-full max-w-[18rem] overflow-hidden border border-neon/30 bg-[linear-gradient(155deg,#e0972b_0%,#a4560f_48%,#3d1a02_100%)]">
            <span
              aria-hidden
              className="t-serif absolute inset-0 grid place-items-center text-[clamp(3.5rem,14vw,5.5rem)] leading-none text-ink/75"
            >
              JtG
            </span>
            {/* painted last, so a real portrait wins; absent, nothing paints */}
            <span
              aria-hidden
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/joseph.jpg')" }}
            />
          </div>
          <p className="t-mono mt-4 text-cream/70">Toronto, ON · works alone</p>
        </div>

        <div>
          <p className="t-mono eyebrow text-neon">Who you&apos;re talking to</p>
          <h2 className="t-grotesk mt-5 text-[clamp(1.9rem,7.4vw,3.2rem)] leading-[0.95] text-cream">
            Joseph.{" "}
            <span className="t-serif font-normal text-neon">That&apos;s who replies.</span>
          </h2>

          {/*
            The record — seven years, Canada at sixteen, "ask me to prove any
            line of it" — used to live here as well as in the jar sequence.
            With /hire gone this block only ever renders below that sequence,
            so saying it twice would cost the reader their patience for no
            gain. What is left is the part the sequence cannot carry: a face,
            and who is on the other end of the form.
          */}
          <div className="mt-7 max-w-[40rem] space-y-4">
            <p className="s-body text-cream/85">
              There is no team behind this page and no &ldquo;we&rdquo;. I write the
              concept, shoot or source the footage, cut it, write the hooks, set up
              the ad, build the site it points at, and read the numbers afterwards.
            </p>
            <p className="s-body text-cream/85">
              The form reaches me, not a shared inbox. That is why the reply is a
              real one, and why it takes a day rather than an hour.
            </p>
          </div>

          <div className="t-mono mt-9 flex flex-wrap gap-x-8 gap-y-3">
            <a className="underline-swipe text-cream/85" href={IG_URL}>
              {IG_HANDLE} ↗
            </a>
            <a className="underline-swipe text-cream/85" href={mailto("Project")}>
              {EMAIL} ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
