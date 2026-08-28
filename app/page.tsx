import CaseCards from "@/components/CaseCards";
import Founder from "@/components/Founder";
import JarHero from "@/components/JarHero";
import Objections from "@/components/Objections";
import Offer from "@/components/Offer";
import ProofStrip from "@/components/ProofStrip";
import StartHere from "@/components/StartHere";
import Testimonial from "@/components/Testimonial";

/**
 * Seven sections, down from twelve.
 *
 * What went, and where it went:
 *
 * - Approach (a 300vh pinned jar sequence) — deleted. Three short copy blocks
 *   were costing three screens of scrolling and repeating the founder section
 *   almost verbatim. The jar is now the hero, where it does the same work in
 *   one screen and arrives before the explaining starts.
 * - Flagship + Portfolio — merged into CaseCards. The bridal shop keeps the
 *   lead position and the full width.
 * - Ledger (a screen arguing views ≠ conversations ≠ leads) — compressed into
 *   ProofStrip, where the distinction is carried by labels and one sentence.
 * - Scope + Process + Pricing — merged into Offer. Three sections were
 *   describing the same purchase in three different vocabularies.
 * - Identity — became Founder, absorbing the record from the old scroll panels.
 * - Objections — seven questions down to four; the age defence went entirely,
 *   because arguing with your own age invites the reader to price the work
 *   like a teenager's.
 * - HireCta (floating button) — dropped. The persistent nav carries the CTA,
 *   and two pieces of fixed chrome doing one job is one too many.
 */
export default function Page() {
  return (
    <main id="main">
      <JarHero />
      <ProofStrip />
      <CaseCards />
      {/* Renders nothing until a real quote is passed — see Testimonial.tsx. */}
      <Testimonial />
      <Offer />
      <Founder />
      <Objections />
      <StartHere context="home" />
    </main>
  );
}
