import SyrupEdge from "./SyrupEdge";
import { PRICE_CEILING } from "@/lib/site";

/**
 * How far the job goes — and deliberately not a list of services.
 *
 * The money covers the reels, the ads behind them, the site they land on, and
 * the thinking underneath. Writing that as four bullet points would be the
 * obvious move and the wrong one: when people evaluate an all-in-one against
 * specialists they draw compensatory inferences, marking the all-in-one down on
 * each specialist's home turf. Four services invites four comparisons and loses
 * all of them. One domain — everything a customer sees before they walk in —
 * reads as a specialism instead.
 *
 * The second problem is price. A low price attached to a broad claim does not
 * make the price look generous, it makes the claim look thin: the mismatch gets
 * resolved by discounting the quality cue, not the cost one. Asserting "a real
 * website, included" would therefore land as "a template, included". So the
 * claim is not asserted here — it is handed to the visitor to check, because
 * they are already standing inside the evidence. That single sentence does more
 * for the website line than any adjective could.
 *
 * Method stays vague on purpose. The outcome is the part that has to be clear.
 */
export default function Scope() {
  return (
    // z-10 so the drips paint over the section below rather than under it.
    <section className="relative z-10 bg-[#e2a339] px-6 py-16 text-ink md:px-10 md:py-24">
      <SyrupEdge />

      <p className="t-mono eyebrow text-syrup-deep">How far it goes</p>

      <h2 className="t-grotesk mt-5 max-w-[19ch] text-[clamp(1.9rem,7.4vw,3.4rem)] leading-[0.95]">
        If the problem is how your business looks online,{" "}
        <span className="t-serif font-normal">it&apos;s already in scope.</span>
      </h2>

      <div className="mt-10 grid gap-x-16 gap-y-8 md:grid-cols-2">
        <div className="space-y-5">
          <p className="s-body">
            The reels, the ads behind them, the site they point at, and the
            argument underneath all three. I don&apos;t sell those separately
            because they aren&apos;t separate problems — a reel that works,
            pointing at a website that doesn&apos;t, is still a business nobody
            calls.
          </p>
          <p className="s-body">
            It isn&apos;t one video and goodbye either. I come back and shoot again,
            for as long as the thing needs it, without a contract that outlives the
            work.
          </p>
        </div>

        <div className="space-y-5">
          {/* The one claim on this page the visitor can verify without me. */}
          <p className="s-mid t-grotesk">
            You&apos;re reading one of the websites.{" "}
            <span className="t-serif font-normal text-syrup-deep">
              Same money, not an extra invoice.
            </span>
          </p>
          <p className="s-body text-syrup-deep">
            Whatever the mix ends up being, it stays under $
            {PRICE_CEILING.toLocaleString()}. If you&apos;re not sure whether
            something counts, ask — the answer is usually yes.
          </p>
        </div>
      </div>
    </section>
  );
}
