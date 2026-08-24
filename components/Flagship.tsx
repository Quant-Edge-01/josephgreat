import Link from "next/link";
import SyrupEdge from "./SyrupEdge";
import { FLAGSHIP_SLUG, RETAINER, retainedOrdinal } from "@/lib/site";
import { workBySlug } from "@/lib/works";

/**
 * The one case a Toronto owner can map onto their own shop, given the whole
 * width of the page.
 *
 * Expertise is the component of source credibility with the largest measured
 * effect on persuasion (Wilson & Sherrell 1993), and the only way to show it
 * rather than assert it is to put the receipts first. So this sits above every
 * paragraph of argument on both pages.
 */
export default function Flagship() {
  const w = workBySlug(FLAGSHIP_SLUG)!;

  return (
    // z-10 so the drips paint over the section below rather than under it: an
    // overflowing child still loses to a later sibling without one.
    <section className="relative z-10 bg-[#e2a339] px-6 py-16 text-ink md:px-10 md:py-24">
      <SyrupEdge />
      <p className="t-mono eyebrow text-syrup-deep">The closest thing to your business</p>

      <h2 className="t-grotesk mt-5 text-[clamp(1.9rem,7.4vw,3.4rem)] leading-[0.95]">
        {w.title}
      </h2>
      <p className="t-mono mt-3 text-syrup-deep">{w.client}</p>

      {/* Reads as a live status, not a portfolio credit. */}
      {w.current && (
        <p className="t-mono mt-5 inline-block border border-ink px-3.5 py-2.5">
          {/* inline-block, not a flex item: as a flex child the dot wrapped onto
              a line of its own as soon as the label needed two lines */}
          <span
            aria-hidden
            className="mr-2.5 inline-block h-2 w-2 translate-y-[-1px] rounded-full bg-ink align-middle"
          />
          current client · since {w.since} · ${RETAINER.monthly}/month
        </p>
      )}

      <dl className="mt-10 grid grid-cols-2 border-t border-ink/30 md:grid-cols-4">
        {w.stats.map((s) => (
          <div key={s.label} className="border-b border-r border-ink/30 py-6 pr-4 last:border-r-0">
            <dt className="t-grotesk text-[clamp(1.5rem,5.2vw,2.4rem)] leading-none">{s.value}</dt>
            <dd className="t-mono mt-2.5 text-syrup-deep">{s.label}</dd>
          </div>
        ))}
      </dl>

      <p className="s-body mt-8 max-w-[40rem]">
        Appointments-only shop, so an enquiry has to be a real one — there is no walk-in
        traffic to hide a weak campaign behind. On the best day of the run a conversation
        cost $1.46.
      </p>
      <p className="s-body mt-4 max-w-[40rem] text-syrup-deep">
        That was the first campaign. I am still running the account — {retainedOrdinal()}{" "}
        month now, paid monthly. One good month is luck; the months after it are the
        actual evidence.
      </p>

      <Link
        href={`/works/${w.slug}`}
        className="t-mono mt-8 inline-flex min-h-[52px] items-center gap-3 border border-ink px-5 py-4 transition-colors duration-300 hover:bg-ink hover:text-cream"
      >
        see the screenshots
        <span aria-hidden>↗</span>
      </Link>
    </section>
  );
}
