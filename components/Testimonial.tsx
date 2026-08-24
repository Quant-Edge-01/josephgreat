import { RETAINER } from "@/lib/site";

/**
 * A client quote — and nothing at all until there is a real one.
 *
 * The component exists now so the quote can be dropped in without a redesign
 * when it arrives. It deliberately cannot render placeholder prose: pass no
 * `quote` and it returns null, so there is no state in which invented words sit
 * on the page looking like something a client said. That is not a stylistic
 * preference. A fabricated testimonial is the one thing on this site that would
 * be worth nothing if true and catastrophic if noticed, and the whole argument
 * of the page is that every claim on it is checkable.
 *
 * To ship one:
 *   <Testimonial
 *     quote="…their exact words…"
 *     attribution="Owner, Dream Alterations"
 *   />
 *
 * Use their words verbatim. Do not tidy the grammar, do not add a surname or a
 * photo that was not given, and do not paraphrase a DM into something punchier.
 */
export default function Testimonial({
  quote,
  attribution,
  context,
}: {
  /** The client's own words. Absent = the section does not exist. */
  quote?: string;
  /** e.g. "Owner, Dream Alterations". */
  attribution?: string;
  /** Optional line under the attribution, e.g. the retainer length. */
  context?: string;
}) {
  // TODO: real quote pending — do not ship placeholder text as if it were a
  // testimonial. Until `quote` is passed, this renders nothing on purpose.
  if (!quote?.trim()) return null;

  return (
    <section data-nav-dark className="bg-void-2 px-6 py-16 md:px-10 md:py-24">
      <p className="t-mono eyebrow text-neon">In their words</p>

      <blockquote className="mt-8 max-w-[46rem]">
        <p className="t-serif text-[clamp(1.5rem,5.4vw,2.8rem)] leading-[1.14] text-gold">
          &ldquo;{quote}&rdquo;
        </p>
        {attribution && (
          <footer className="t-mono mt-7 text-cream/85">
            — {attribution}
            {context && <span className="mt-1.5 block text-cream/60">{context}</span>}
          </footer>
        )}
      </blockquote>
    </section>
  );
}

/** The line to pass as `context` once the quote lands. */
export const RETAINER_CONTEXT = `paying client since ${RETAINER.sinceLabel} ${RETAINER.since.getFullYear()}`;
