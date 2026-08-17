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
          <div
            className="relative aspect-[4/5] w-full max-w-[18rem] overflow-hidden border border-neon/30 bg-[linear-gradient(155deg,#e0972b_0%,#a4560f_48%,#3d1a02_100%)] bg-cover bg-center"
            style={{ backgroundImage: "url('/joseph.jpg')" }}
          >
            {/* Sits behind the photo when there is one, and is the whole picture
                when there isn't. */}
            <span
              aria-hidden
              className="t-serif absolute inset-0 -z-10 grid place-items-center text-[clamp(3rem,12vw,5rem)] leading-none text-ink/70"
            >
              JtG
            </span>
          </div>
          <p className="t-mono mt-4 text-cream/70">Toronto, ON · works alone</p>
        </div>

        <div>
          <p className="t-mono eyebrow text-neon">Who you&apos;re talking to</p>
          <h2 className="t-grotesk mt-5 text-[clamp(1.9rem,7.4vw,3.2rem)] leading-[0.95] text-cream">
            Joseph.{" "}
            <span className="t-serif font-normal text-neon">That&apos;s who replies.</span>
          </h2>

          <div className="mt-7 max-w-[40rem] space-y-4">
            <p className="s-body text-cream/85">
              There is no team behind this page and no &ldquo;we&rdquo;. I write the
              concept, shoot or source the footage, cut it, write the hooks, set up the
              ad and read the numbers afterwards. When you send the form, the person who
              opens your account is the same person who would make the video.
            </p>
            <p className="s-body text-cream/85">
              I&apos;m nineteen, I&apos;ve been making content since I was eleven, and
              I&apos;ve been in Canada on my own since sixteen. For the last three years
              this is the only thing I&apos;ve done.
            </p>
            <p className="s-body t-serif text-neon">
              Not a pitch — a record. Ask me to prove any line of it.
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
