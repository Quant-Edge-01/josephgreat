import type { CSSProperties } from "react";
import { FLAGSHIP_SLUG, OFFER } from "@/lib/site";
import { workBySlug } from "@/lib/works";

/**
 * The founder, inside the jar, on the first screen.
 *
 * The brief asked for a scroll-driven photographic sequence — Joseph seated in
 * the jar, a hand against the glass, then the other. Those frames do not exist:
 * `public/joseph.jpg` is the only authentic portrait in the repository. The
 * brief's own fallback applies, and it is the right one — inventing a face or
 * generating a stranger would destroy the single thing this page is selling.
 * See ASSETS.md for the shot list that would unlock the sequence.
 *
 * So this is one composed frame rather than five. The real photograph is
 * clipped into the jar silhouette, tinted into the syrup palette, and half
 * submerged: the amber pool sits at the meniscus and his lower body reads
 * through it. Glass, rim light and specular streaks are painted over the top,
 * so the photo looks contained rather than pasted behind a decoration.
 *
 * No client JS. The entrance is CSS, so the headline, the proof and the button
 * are painted with the first frame of HTML — Motion would have serialised
 * `opacity: 0` into the markup and left the fold blank until hydration.
 */

const JAR_BODY =
  "M156 66 L156 118 C156 152 88 166 66 232 C63 330 60 430 60 520 " +
  "C60 552 78 568 106 568 L294 568 C322 568 340 552 340 520 " +
  "C340 430 337 330 334 232 C312 166 244 152 244 118 L244 66 Z";

const JAR_INNER =
  "M166 68 L166 120 C166 156 96 172 78 236 C75 332 72 428 72 518 " +
  "C72 544 88 556 112 556 L288 556 C312 556 328 544 328 518 " +
  "C328 428 325 332 322 236 C304 172 234 156 234 120 L234 68 Z";

/** Where the syrup surface sits inside the jar, in viewBox units. */
const MENISCUS = 402;

const delay = (s: number) => ({ "--delay": `${s}s` }) as CSSProperties;

export default function JarHero() {
  const dream = workBySlug(FLAGSHIP_SLUG)!;
  const [spend, convos, , leads] = dream.stats.map((s) => s.value);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden bg-void px-6 pb-8 pt-24 md:px-10 md:pb-10 md:pt-28">
      {/* ---------- the jar ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
        <svg
          viewBox="0 0 400 620"
          className="jar-rise h-[92svh] w-auto max-w-none opacity-95"
          shapeRendering="geometricPrecision"
        >
          <defs>
            <clipPath id="jh-inner">
              <path d={JAR_INNER} />
            </clipPath>

            {/* pulls the cold studio grey of the photo into the syrup palette */}
            <linearGradient id="jh-tint" x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0%" stopColor="#e0972b" stopOpacity="0.20" />
              <stop offset="55%" stopColor="#a4560f" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#3d1a02" stopOpacity="0.42" />
            </linearGradient>

            {/* the pool he is standing in */}
            <linearGradient id="jh-syrup" x1="0" y1="0" x2="0.25" y2="1">
              <stop offset="0%" stopColor="#e0972b" stopOpacity="0.72" />
              <stop offset="34%" stopColor="#c2721a" stopOpacity="0.86" />
              <stop offset="100%" stopColor="#4a2103" stopOpacity="0.96" />
            </linearGradient>

            <linearGradient id="jh-glass" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.46" />
              <stop offset="13%" stopColor="#ffffff" stopOpacity="0.07" />
              <stop offset="52%" stopColor="#e8dcc4" stopOpacity="0.04" />
              <stop offset="87%" stopColor="#ffffff" stopOpacity="0.11" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
            </linearGradient>

            <linearGradient id="jh-streak" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="jh-metal" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6b5a34" />
              <stop offset="14%" stopColor="#c9a96a" />
              <stop offset="32%" stopColor="#f0e0bb" />
              <stop offset="50%" stopColor="#b6934f" />
              <stop offset="70%" stopColor="#e2cd9a" />
              <stop offset="100%" stopColor="#5b4c2c" />
            </linearGradient>

            {/* darkens the glass edges so the figure sits *in* something */}
            <radialGradient id="jh-vig" cx="50%" cy="38%" r="66%">
              <stop offset="62%" stopColor="#08070a" stopOpacity="0" />
              <stop offset="100%" stopColor="#08070a" stopOpacity="0.52" />
            </radialGradient>
          </defs>

          <g clipPath="url(#jh-inner)">
            {/* The real photograph. Top-aligned so the mask sits high in the
                jar; sliced, so the sides crop and he reads as compressed. */}
            {/*
              Placement is arithmetic, not taste. In joseph.jpg the mask sits at
              roughly 0.76 across and 0.12–0.26 down. At the first attempt —
              x=-8, width=416 — that put the head at x≈308 against a jar whose
              inner edge is 328, so the face was jammed against the right wall
              and half lost to the clip. Solving x + 0.76·w = 200 for w=560
              gives x=-225, which lands the mask on the jar's centre line.
            */}
            {/* the empty glass above his head — without it the photo's top
                edge lands as a hard seam across the shoulder of the jar */}
            <rect
              x="60"
              y="58"
              width="280"
              height="520"
              fill="#1a1207"
            />
            <image
              href="/joseph.jpg"
              x="-225"
              y="176"
              width="560"
              height="700"
              preserveAspectRatio="xMidYMin slice"
            />
            <rect x="60" y="58" width="280" height="520" fill="url(#jh-tint)" />
            <rect x="60" y="58" width="280" height="520" fill="url(#jh-vig)" />

            {/* submerged from the waist down */}
            <rect x="60" y={MENISCUS} width="280" height={578 - MENISCUS} fill="url(#jh-syrup)" />
            <ellipse cx="200" cy={MENISCUS} rx="130" ry="9" fill="#f3b754" opacity="0.72" />
            <ellipse cx="200" cy={MENISCUS - 3} rx="130" ry="7" fill="#fff0cd" opacity="0.3" />
          </g>

          {/* ---- glass shell, painted over the figure ---- */}
          <path d={JAR_BODY} fill="url(#jh-glass)" />
          <path d={JAR_BODY} fill="none" stroke="#ffcf7d" strokeOpacity="0.34" strokeWidth="2" />

          {/* handle */}
          <path
            d="M246 92 C302 90 320 116 314 142 C308 170 274 180 250 172"
            fill="none"
            stroke="#c98d3a"
            strokeOpacity="0.42"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* lid */}
          <rect x="149" y="26" width="102" height="42" fill="url(#jh-metal)" />
          <rect x="142" y="16" width="116" height="14" rx="4" fill="url(#jh-metal)" />
          <g stroke="#3d3016" strokeOpacity="0.3" strokeWidth="1.6">
            {Array.from({ length: 11 }, (_, i) => (
              <line key={i} x1={155 + i * 9} y1={30} x2={155 + i * 9} y2={66} />
            ))}
          </g>

          {/* specular streaks last, so the glass reads as glass */}
          <g clipPath="url(#jh-inner)">
            <rect x="88" y="150" width="18" height="380" fill="url(#jh-streak)" opacity="0.5" />
            <rect x="300" y="200" width="8" height="300" fill="url(#jh-streak)" opacity="0.34" />
          </g>
        </svg>
      </div>

      {/*
        Vertical, not radial. A radial scrim centred on the viewport puts its
        darkest ring exactly where the mask sits — roughly 28% down, because the
        figure is top-aligned in the jar — and buries the one thing the first
        screen exists to show. This keeps the face band nearly clear and pays
        for it at the top and bottom, which is where the type actually is.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,7,10,0.88)_0%,rgba(8,7,10,0.34)_13%,rgba(8,7,10,0.10)_27%,rgba(8,7,10,0.30)_38%,rgba(8,7,10,0.72)_52%,rgba(8,7,10,0.92)_100%)]"
      />

      {/* ---------- type ---------- */}
      <p className="t-mono anim-up relative z-10 text-neon" style={delay(0.05)}>
        Joseph The Great — Toronto &amp; the GTA
      </p>

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="s-hero anim-up t-grotesk leading-[0.8] text-cream" style={delay(0.12)}>
          Be <span className="t-serif font-normal text-neon">unique.</span>
        </h1>

        <p
          className="s-mid anim-up t-grotesk mt-6 max-w-[24ch] text-balance text-cream"
          style={delay(0.2)}
        >
          Surreal campaigns that start{" "}
          <span className="t-serif font-normal text-neon">real conversations.</span>
        </p>

        <div className="anim-up mt-8 flex w-full flex-col items-center gap-4" style={delay(0.28)}>
          <a
            href="#start"
            className="t-grotesk flex min-h-[60px] w-full max-w-[26rem] items-center justify-center gap-3 bg-neon px-8 text-[1.15rem] text-void transition-colors duration-300 hover:bg-acid"
          >
            {OFFER.cta}
            <span aria-hidden>↓</span>
          </a>
          <p className="max-w-[34rem] text-[0.98rem] leading-relaxed text-cream/75">
            I&apos;ll send back the first three things I&apos;d change — free.
          </p>
        </div>
      </div>

      <p
        className="s-proof anim-up relative z-10 text-center text-cream"
        style={delay(0.36)}
      >
        <span className="text-neon">{spend}</span> in ads →{" "}
        <span className="text-neon">{convos}</span> conversations →{" "}
        <span className="text-neon">{leads}</span> qualified leads.
      </p>
    </section>
  );
}
