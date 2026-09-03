import TrackReach from "./TrackReach";
import { RETAINER, retainedOrdinal } from "@/lib/site";

/**
 * The numbers, immediately after the hero, with the metrics kept apart.
 *
 * This replaces the old Ledger section, which spent a full screen arguing the
 * difference between views, conversations and leads across three long rows. The
 * distinction still has to survive — implying that 33.1M views is 33.1M
 * customers would be the single most dishonest thing this page could do — but
 * it does not need an essay. Each figure is labelled with what it actually is,
 * the three kinds are visually separated, and one line underneath names the
 * hierarchy outright.
 */

type Metric = {
  value: string;
  label: string;
  kind: "money" | "conversation" | "lead" | "view";
  note?: string;
};

const METRICS: Metric[] = [
  { value: "$214.86", label: "ad spend", kind: "money", note: "Dream Alterations" },
  { value: "59", label: "messaging conversations", kind: "conversation" },
  { value: "$3.64", label: "per conversation", kind: "money" },
  { value: "9", label: "qualified leads", kind: "lead" },
  { value: "33.1M", label: "owned-channel views", kind: "view", note: "JoeRoblox85" },
  { value: "1.2M", label: "organic views, $0 spend", kind: "view", note: "Quant Larper" },
  { value: "74.9%", label: "reach from non-followers", kind: "view", note: "Spartan" },
];

const TONE: Record<Metric["kind"], string> = {
  money: "text-neon",
  conversation: "text-acid",
  lead: "text-acid",
  view: "text-cream",
};

export default function ProofStrip() {
  return (
    <section
      id="proof"
      data-nav-dark
      className="scroll-mt-16 bg-void-2 px-6 py-14 md:px-10 md:py-20"
    >
      <TrackReach id="proof" />

      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <p className="t-mono eyebrow text-neon">Screenshotted, not claimed</p>
        <p className="t-mono text-cream/70">
          {retainedOrdinal()} month with the bridal shop · ${RETAINER.monthly}/mo
        </p>
      </div>

      <dl className="reveal mt-9 grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-4">
        {METRICS.map((m) => (
          <div key={m.value + m.label}>
            <dt
              className={`t-grotesk text-[clamp(1.7rem,6vw,2.9rem)] leading-none ${TONE[m.kind]}`}
            >
              {m.value}
            </dt>
            <dd className="t-mono mt-2.5 text-cream/75">
              {m.label}
              {m.note && <span className="mt-1 block text-cream/50">{m.note}</span>}
            </dd>
          </div>
        ))}
      </dl>

      {/* The one sentence that stops the numbers being read as one number. */}
      <p className="s-body mt-10 max-w-[46rem] text-cream/80">
        Three different things, deliberately not added together. A{" "}
        <span className="text-cream">view</span> is someone who watched. A{" "}
        <span className="text-acid">conversation</span> is someone who opened a message
        thread with the business. A <span className="text-acid">qualified lead</span> is
        someone who actually wanted the thing — nine, out of those fifty-nine. Views are
        the cheap number; anyone selling you those is selling you the cheapest of the
        three.
      </p>
    </section>
  );
}
