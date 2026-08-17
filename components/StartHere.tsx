import EnquiryForm from "./EnquiryForm";
import { EMAIL, IG_HANDLE, IG_URL, OFFER, mailto } from "@/lib/site";

/**
 * The one place on the site where something can actually be sent.
 *
 * The offer is restated here word-for-word rather than paraphrased: a visitor
 * who was promised three fixes at the top and then meets a generic "get in
 * touch" box has been handed to a different business halfway down the page.
 *
 * Instagram and email stay as a visible fallback underneath. They convert worse
 * — a mailto opens an empty draft the visitor has to compose themselves — but
 * some people will not fill in a form for anybody, and the click is tracked
 * separately so the two can be compared instead of guessed at.
 */
export default function StartHere({ context = "home" }: { context?: string }) {
  return (
    <section
      id="start"
      data-nav-dark
      className="scroll-mt-2 bg-void px-6 py-16 md:px-10 md:py-24"
    >
      <p className="t-mono eyebrow text-neon">The free version</p>

      <h2 className="t-grotesk mt-5 max-w-[17ch] text-[clamp(2rem,7.8vw,3.6rem)] leading-[0.95] text-cream">
        Send me your Instagram
        <span className="text-neon">.</span>{" "}
        <span className="t-serif font-normal">
          I&apos;ll tell you the first three things I&apos;d change.
        </span>
      </h2>

      <p className="s-body mt-6 max-w-[38rem] text-cream/80">
        Free, and you&apos;re welcome to go do them yourself. {OFFER.reply} {OFFER.noCall}
      </p>

      <div className="mt-11">
        <EnquiryForm context={context} />
      </div>

      <div className="mt-14 max-w-[34rem] border-t border-neon/25 pt-6">
        <p className="t-mono text-cream/70">
          or, if you&apos;d rather not fill anything in
        </p>
        <div className="t-mono mt-4 flex flex-wrap gap-x-8 gap-y-3">
          <a className="underline-swipe text-cream/85" href={IG_URL}>
            {IG_HANDLE} ↗
          </a>
          <a className="underline-swipe text-cream/85" href={mailto(OFFER.cta)}>
            {EMAIL} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
