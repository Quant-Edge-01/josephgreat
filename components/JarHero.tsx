import type { CSSProperties } from "react";
import { OFFER, PRICE_RANGE } from "@/lib/site";
import SyrupScroll from "./SyrupScroll";


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

  return (
    <section className="hero-scene relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden bg-void px-6 pb-8 pt-24 md:px-10 md:pb-10 md:pt-28">
      <SyrupScroll />
      {/* ---------- the jar ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 400 620"
          className="hero-jar jar-rise h-[92svh] w-auto max-w-none shrink-0 opacity-95"
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
          <path className="jar-crack" d="M318 483 l-10 8 15 9 -9 8" fill="none" stroke="#ffcf7d" strokeWidth="2" />
          <path className="jar-stream" d="M318 501 C349 501 357 525 351 548 C346 572 359 579 357 597" fill="none" stroke="url(#jh-syrup)" strokeWidth="14" strokeLinecap="round" pathLength="1" />
          <ellipse className="jar-pool" cx="305" cy="600" rx="115" ry="13" fill="url(#jh-syrup)" />
          <ellipse className="jar-pool" cx="300" cy="596" rx="92" ry="3" fill="#ffcf7d" opacity=".4" />
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
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,7,10,0.90)_0%,rgba(8,7,10,0.62)_22%,rgba(8,7,10,0.14)_38%,rgba(8,7,10,0.18)_54%,rgba(8,7,10,0.74)_66%,rgba(8,7,10,0.96)_100%)]"
      />

      {/* ---------- type ----------

        Two blocks, pinned to the two ends, with the middle of the frame left
        to the picture. The previous arrangement stacked everything through the
        vertical centre, which put the headline directly across his face: the
        photograph and the proposition were fighting for the same 200px and
        both lost.

        Left-aligned, not centred. A centred stack of headline / subhead /
        button is the house style of every SaaS template in the category, and
        the brief was explicit about not looking like one. Ranged left with a
        hard measure reads as editorial, which is what this is.
      */}
      <div className="relative z-10">
        <p className="t-mono anim-up eyebrow text-neon" style={delay(0.05)}>
          {/* The name is in the nav and the title bar; repeating it here cost a
              third line of the fold on a phone. What a stranger needs from this
              line is the category and the city. */}
          Creative marketing agency · Toronto
        </p>

        {/*
          The lockup is a <p> and the proposition below is the <h1>. Heading
          level is a semantic claim about what the page is about, and "Be
          unique." answers that for nobody — not a search result, not a screen
          reader landing cold. Size and heading level are different tools.
        */}
        <p
          className="s-hero anim-up t-grotesk mt-3 leading-[0.8] text-cream"
          style={delay(0.12)}
        >
          Be <span className="t-serif font-normal text-neon">unique.</span>
        </p>
      </div>

      <div className="relative z-10 mt-auto max-w-[52rem]">
        {/*
          What actually gets made, in nouns.

          The line here used to be "Surreal campaigns that start real
          conversations." It is a better sentence and it was the wrong thing to
          put on the first screen: it describes a quality of the work without
          ever saying what the work is. An owner arriving from an ad has to
          leave with three nouns — reels, ads, websites — and the adjective can
          wait for the second screen. The strangeness up here is carried by the
          picture, which does not need the copy's help.
        */}
        <h1
          className="anim-up t-grotesk max-w-[20ch] text-balance text-[clamp(1.6rem,5.2vw,3rem)] leading-[1.02] text-cream"
          style={delay(0.2)}
        >
          Reels, ads, and the websites{" "}
          <span className="t-serif font-normal text-neon">they land on.</span>
        </h1>

        <p
          className="anim-up mt-4 max-w-[44ch] text-[1.02rem] leading-snug text-cream/80"
          style={delay(0.26)}
        >
          Make your business memorable. Give people a reason to get in touch.
        </p>

        <div
          className="anim-up mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6"
          style={delay(0.34)}
        >
          <a
            href="#start"
            className="t-grotesk flex min-h-[60px] w-full max-w-[24rem] items-center justify-center gap-3 bg-neon px-8 text-[1.12rem] text-void transition-colors duration-300 hover:bg-acid sm:w-auto"
          >
            {OFFER.cta}
            <span aria-hidden>↓</span>
          </a>
          <p className="max-w-[22rem] text-[0.95rem] leading-snug text-cream/75">
            For your business. No call required.
          </p>
        </div>

        <p className="t-note mt-5 text-cream/75">Working together: {PRICE_RANGE} CAD / month.</p>
      </div>
    </section>
  );
}
