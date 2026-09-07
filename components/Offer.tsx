import { OFFER, PRICE_RANGE } from "@/lib/site";
export default function Offer() {
  return (
    <section id="offer" className="bg-cream px-6 py-14 md:px-10 md:py-20">
      <div className="grid gap-8 md:grid-cols-2 md:gap-16">
        <div>
          <p className="t-mono text-syrup">Working together</p>
          <h2 className="t-grotesk mt-4 text-[clamp(2rem,7vw,4rem)] leading-none">
            Good ideas.
            <br />
            <span className="t-serif text-syrup">Then the actual work.</span>
          </h2>
        </div>
        <div>
          <p className="s-body max-w-[34ch]">
            Reels, ads and websites. I make the creative and connect it to a way
            for customers to reach you.
          </p>
          <p className="t-grotesk mt-6 text-[clamp(1.8rem,6vw,3rem)]">
            {PRICE_RANGE}
            <span className="text-lg font-normal"> CAD / month</span>
          </p>
          <p className="t-note mt-2 text-ash">
            Depending on scope. Ad spend is separate.
          </p>
          <details className="short-detail mt-5">
            <summary>What’s included?</summary>
            <p className="s-body mt-3">
              We agree on the content, ad setup and website work before
              starting. One month at a time. No promise of a magic number of
              customers.
            </p>
          </details>
          <a
            className="t-grotesk mt-7 inline-flex min-h-[52px] items-center gap-6 bg-ink px-6 text-cream"
            href="#start"
          >
            {OFFER.cta} <span aria-hidden>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
