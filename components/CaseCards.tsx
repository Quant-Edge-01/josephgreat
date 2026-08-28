import Link from "next/link";
import { RETAINER } from "@/lib/site";
import { WORKS } from "@/lib/works";

/**
 * Four campaign posters, not a card grid.
 *
 * The old Portfolio put every case in the same manila-folder treatment, which
 * made four very different jobs look like four of the same thing. Each case now
 * gets its own colour environment keyed to the actual business — bridal amber,
 * gym acid, kids'-TV neon, fintech ash — one dominant screenshot, the problem
 * in a line, and the single number that settles it.
 *
 * Dream Alterations leads and is given the full width, because it is the only
 * one of the four that proves enquiries rather than attention, and it is the
 * business a Toronto owner can map onto their own.
 */

type Env = {
  /** Section background behind the card. */
  shell: string;
  /** Accent used for the number and the rule. */
  accent: string;
  /** Muted text on that shell. */
  muted: string;
  /** Border colour. */
  edge: string;
  problem: string;
};

const ENV: Record<string, Env> = {
  "dream-alteration": {
    shell: "bg-[#e2a339] text-ink",
    accent: "text-syrup-deep",
    muted: "text-syrup-deep",
    edge: "border-ink/30",
    problem: "An appointments-only bridal shop nobody could name, competing with every alteration place in the city.",
  },
  "spartan-gymnastics": {
    shell: "bg-void-2 text-cream",
    accent: "text-acid",
    muted: "text-cream/70",
    edge: "border-acid/30",
    problem: "A neighbourhood gym selling camps and spring sessions to people who had never heard of it.",
  },
  joeroblox85: {
    shell: "bg-void text-cream",
    accent: "text-neon",
    muted: "text-cream/70",
    edge: "border-neon/30",
    problem: "The least forgiving audience on the internet: eight-year-olds, who leave in the first second.",
  },
  quantlarper: {
    shell: "bg-[#14131a] text-cream",
    accent: "text-cream",
    muted: "text-cream/70",
    edge: "border-cream/25",
    problem: "A market tool in a niche where every second account is a man renting a Lamborghini by the hour.",
  },
};

export default function CaseCards() {
  const [lead, ...rest] = WORKS;
  const env = ENV[lead.slug];

  return (
    <section id="work" data-nav-dark className="bg-void">
      {/* ---------- the lead case, full width ---------- */}
      <Link
        href={`/works/${lead.slug}`}
        className={`group block ${env.shell} px-6 py-14 md:px-10 md:py-20`}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className={`t-mono eyebrow ${env.muted}`}>Case 01 — proves enquiries</p>
          {lead.current && (
            <p className="t-mono">
              <span
                aria-hidden
                className="mr-2 inline-block h-2 w-2 translate-y-[-1px] rounded-full bg-ink align-middle"
              />
              still running · ${RETAINER.monthly}/month
            </p>
          )}
        </div>

        <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:items-end md:gap-14">
          <div>
            <h3 className="t-grotesk text-[clamp(2.1rem,8.5vw,4.4rem)] leading-[0.92]">
              {lead.title}
            </h3>
            <p className={`s-body mt-5 max-w-[34ch] ${env.muted}`}>{env.problem}</p>

            <p className="mt-8 flex flex-wrap items-baseline gap-x-3">
              <span className="t-grotesk text-[clamp(2.4rem,9vw,4rem)] leading-none">
                {lead.headline.value}
              </span>
              <span className={`t-mono ${env.muted}`}>{lead.headline.label}</span>
            </p>
            <p className={`t-mono mt-3 ${env.muted}`}>
              $214.86 spent · 59 conversations · 9 qualified leads
            </p>

            <span
              className={`t-mono mt-9 inline-flex min-h-[52px] items-center gap-3 border ${env.edge} px-5 py-4 transition-colors duration-300 group-hover:bg-ink group-hover:text-cream`}
            >
              open the case
              <span aria-hidden>↗</span>
            </span>
          </div>

          <div className={`hatch overflow-hidden border ${env.edge}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lead.images[0].src}
              alt={lead.images[0].alt}
              width={lead.images[0].w}
              height={lead.images[0].h}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </div>
      </Link>

      {/* ---------- the other three ---------- */}
      <div className="grid md:grid-cols-3">
        {rest.map((w, i) => {
          const e = ENV[w.slug];
          return (
            <Link
              key={w.slug}
              href={`/works/${w.slug}`}
              className={`group flex flex-col justify-between ${e.shell} border-t border-white/10 px-6 py-12 md:border-l md:border-t-0 md:px-8 md:py-16`}
            >
              <div>
                <p className={`t-mono eyebrow ${e.muted}`}>
                  Case 0{i + 2} — proves {w.proves === "enquiries" ? "enquiries" : "attention"}
                </p>
                <h3 className="t-grotesk mt-5 text-[clamp(1.6rem,5.4vw,2.2rem)] leading-[0.98]">
                  {w.title}
                </h3>
                <p className={`s-body mt-4 max-w-[32ch] ${e.muted}`}>{e.problem}</p>
              </div>

              <div
                className={`hatch mt-8 aspect-[4/3] overflow-hidden border ${e.edge}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={w.cover}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="cover-img h-full w-full object-cover object-top"
                />
              </div>

              <div className="mt-7">
                <p className="flex flex-wrap items-baseline gap-x-2.5">
                  <span className={`t-grotesk text-[clamp(1.7rem,6vw,2.4rem)] leading-none ${e.accent}`}>
                    {w.headline.value}
                  </span>
                  <span className={`t-mono ${e.muted}`}>{w.headline.label}</span>
                </p>
                <p className={`t-mono mt-5 flex items-center justify-between border-t ${e.edge} pt-4`}>
                  open the case
                  <span aria-hidden className={e.accent}>↗</span>
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
