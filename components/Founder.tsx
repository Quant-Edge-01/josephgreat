import { EMAIL, IG_HANDLE, IG_URL, mailto } from "@/lib/site";

/**
 * Joseph, in his own words, once.
 *
 * This absorbs both the old Identity block and the three copy panels from the
 * 300vh scroll sequence, which between them said "one person, seven years,
 * Canada at sixteen, ask me to prove it" about four times across three screens.
 *
 * The tone brief mattered here. The old page argued with its own age — "I'm 19,
 * that's why it's cheap" — which invites the reader to price the work like a
 * teenager's. Age is stated once, as tenure, and then dropped. Nothing here is
 * self-destructive or shock-value: eccentric and self-aware reads as a creative
 * director, reckless reads as a risk a business owner declines to take.
 */
export default function Founder() {
  return (
    <section
      id="joseph"
      data-nav-dark
      className="scroll-mt-16 bg-void px-6 py-16 md:px-10 md:py-24"
    >
      <div className="grid gap-10 md:grid-cols-[minmax(0,19rem)_minmax(0,40rem)] md:gap-16">
        <div>
          <div className="relative aspect-[4/5] w-full max-w-[17rem] overflow-hidden border border-neon/30 bg-[linear-gradient(155deg,#e0972b_0%,#a4560f_48%,#3d1a02_100%)]">
            <span
              aria-hidden
              className="t-serif absolute inset-0 grid place-items-center text-[clamp(3.5rem,14vw,5rem)] leading-none text-ink/75"
            >
              JtG
            </span>
            {/* painted over the monogram when the file exists */}
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
          <h2 className="t-grotesk mt-5 text-[clamp(2rem,7.4vw,3.4rem)] leading-[0.94] text-cream">
            I&apos;m Joseph.{" "}
            <span className="t-serif font-normal text-neon">I&apos;m nineteen.</span>
          </h2>

          <div className="mt-7 max-w-[42rem] space-y-4">
            <p className="s-body text-cream/85">
              I started making children&apos;s content at eleven. Thirty-three million
              views later, I build campaigns for businesses. I moved to Canada on my own
              at sixteen and I have been doing this, and only this, since.
            </p>
            <p className="s-body text-cream/85">
              I lean absurdist. I don&apos;t believe a business has to look or behave
              like everybody around it, and I have no patience for agency theatre —
              fake sophistication, or a presentation built to explain another
              presentation.
            </p>
            <p className="s-body t-serif text-neon">
              I care about the idea, the image, and what happened after somebody saw it.
            </p>
            <p className="s-body text-cream/85">
              There is no team behind this page and no &ldquo;we&rdquo;. I write the
              concept, cut the video, set up the ad, build the site it points at, and
              read the numbers afterwards. Every figure here is a screenshot — ask me to
              open any of them live and I will.
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
