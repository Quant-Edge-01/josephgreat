"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { PRICE_CEILING, PRICE_FLOOR } from "@/lib/site";
import SyrupJar from "./SyrupJar";

/**
 * The scroll here is not a feed. Scroll distance == physical distance to the jar.
 * Everything is driven off one progress value so nothing can desync, and every
 * animated property is transform or opacity only — iOS Safari never has to
 * re-layout or repaint while the finger is down.
 *
 * Two things changed after the conversion audit.
 *
 * The track was 520vh. Five and a bit screens of scrolling delivered three
 * short paragraphs, each of which was visible only inside a narrow progress
 * window — 01 from 0.05 to 0.26, then gone. A fast flick on a phone, which is
 * how people actually scroll (NN/g, *What Parallax Lacks*), delivered all three
 * at zero. It is now 300vh and the reveals do not exit: copy arrives and stays,
 * so by the time the syrup closes over the frame the whole statement is on
 * screen at once. That is both more readable and, as it turns out, weirder.
 *
 * And `prefers-reduced-motion` used to reach only the CSS. A 300vmax object
 * scaling through 7x under the finger is exactly the pattern that provokes
 * vestibular symptoms, so with the flag set the whole choreography is replaced
 * by ApproachStatic — the same words, in the same order, in normal flow.
 */

/** Length of the scroll track. The whole approach is paced off this one number. */
const TRACK_VH = 300;
/**
 * Progress at which the stage has gone fully dark — drives the menu's tone
 * sentinel. Follows `amber`: the syrup closes over the frame at ~0.78, so
 * leaving this at 0.9 would strand ink-coloured dots on a black backdrop.
 */
const DARK_AT = 0.8;
/**
 * Where the final black wipe begins. Kept separate from DARK_AT: the backdrop
 * reads dark once the *syrup* covers, which is earlier than the wipe that
 * hands off to the portfolio.
 */
const THROUGH_AT = 0.79;
/**
 * Where DARK_AT falls as a fraction of the track's own height. The pinned stage
 * eats one viewport of the track, so progress 0..1 spans (TRACK_VH - 100)vh.
 * Derived, not typed in — otherwise retuning TRACK_VH silently desyncs the
 * menu's colour from the backdrop.
 */
const DARK_OFFSET = (DARK_AT * (TRACK_VH - 100)) / TRACK_VH;

const BLOCKS = {
  who: {
    tag: "01 — who",
    title: "Joseph The Great",
    sub: "One person. I make the video, I run the ads, I answer the email.",
  },
  record: {
    tag: "02 — record",
    lines: [
      "Seven years making content — YouTube and Instagram since I was eleven. In Canada on my own since sixteen. The last three years, marketing only.",
      "Not a pitch — a record. Ask me to prove any line of it.",
    ],
  },
  statement: {
    tag: "03 — the part nobody says",
    body: "It's not the edit. Most of them never learned what marketing is. Surreal is the one thing left that stops a thumb — so that's what I make, for a tenth of the money.",
  },
};

/** Shared by both branches so the words can never drift apart. */
function Statement({ withPrice = false }: { withPrice?: boolean }) {
  return (
    <>
      <p className="t-mono mb-3 text-gold">{BLOCKS.statement.tag}</p>
      <p className="s-loud t-grotesk text-cream">
        Agencies here bill <span className="text-gold">$3,000+</span> for template video{" "}
        <span className="t-serif font-normal">that doesn&apos;t work.</span>
      </p>
      <p className="s-body mt-4 max-w-[46rem] text-cream/75">{BLOCKS.statement.body}</p>
      {withPrice && (
        <p className="t-mono mt-6 text-neon">
          mine is ${PRICE_FLOOR}–${PRICE_CEILING.toLocaleString()}
        </p>
      )}
    </>
  );
}

function useReveal(p: MotionValue<number>, from: number, to: number) {
  return {
    // 0 -> 1 and then held. No fade-out: the syrup and void discs paint over
    // the top of these blocks at the end of the track, which is a better exit
    // than dissolving them into white.
    opacity: useTransform(p, [from, to], [0, 1]),
    y: useTransform(p, [from, to], [46, 0]),
    scale: useTransform(p, [from, to], [0.95, 1]),
  };
}

/**
 * The branch is a component boundary, not an early return. `useScroll` binds to
 * a ref; if the hooks run but the tree owning that element is never rendered,
 * Motion warns that the target "is defined but not hydrated" on every load.
 * Hooks cannot be called conditionally — so the component holding them is the
 * thing that has to be conditional.
 */
export default function Approach() {
  return useReducedMotion() ? <ApproachStatic /> : <ApproachScroll />;
}

/* ---------------------------------------------------------------
   reduced motion — same words, same order, no choreography
   --------------------------------------------------------------- */
function ApproachStatic() {
  return (
    <section className="bg-paper px-6 py-20 md:px-14 md:py-28">
      <div className="mx-auto flex max-w-[70rem] flex-col gap-14 md:flex-row md:items-start md:gap-20">
        <div className="mx-auto w-[42vw] max-w-[16rem] shrink-0 md:mx-0">
          <SyrupJar className="h-auto w-full" />
        </div>

        <div className="flex flex-col gap-12">
          <div>
            <p className="t-mono mb-3 text-syrup">{BLOCKS.who.tag}</p>
            <div className="rule pt-4">
              <h2 className="s-loud t-grotesk">{BLOCKS.who.title}</h2>
              <p className="t-serif s-mid mt-1 text-syrup-deep">{BLOCKS.who.sub}</p>
            </div>
          </div>

          <div>
            <p className="t-mono mb-3 text-syrup">{BLOCKS.record.tag}</p>
            <div className="rule space-y-2 pt-4">
              <p className="s-body">{BLOCKS.record.lines[0]}</p>
              <p className="s-body t-serif text-syrup">{BLOCKS.record.lines[1]}</p>
            </div>
          </div>

          <div className="-rotate-[1deg] bg-ink px-7 py-8 md:px-10 md:py-10">
            <Statement withPrice />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   the approach itself
   --------------------------------------------------------------- */
function ApproachScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /**
   * Two springs off one source. The object gets a critically damped one
   * (zeta ~= 1.0) so a 300vmin jar never wobbles after you lift your finger;
   * the copy gets an underdamped one (zeta ~= 0.6) — that overshoot *is* the
   * bounce, and it costs nothing because it rides the same scroll value.
   */
  const p = useSpring(scrollYProgress, { stiffness: 200, damping: 16, mass: 0.3 });
  const pb = useSpring(scrollYProgress, { stiffness: 260, damping: 12, mass: 0.4 });

  /**
   * Front-loaded on purpose. With two keyframes the jar spent most of the track
   * crawling from a speck to something a phone screen still doesn't read as
   * *approaching*. These stops put it past 100px early and bleeding off both
   * edges by the time the copy has assembled.
   */
  const jarScale = useTransform(p, [0, 0.1, 0.3, 0.58, 0.84, 1], [0.24, 0.62, 1.15, 1.95, 3.7, 7.2]);
  const jarDrift = useTransform(p, [0, 1], ["7vh", "-3vh"]);
  const jarTilt = useTransform(p, [0, 0.5, 1], [-4, 1.5, -0.6]);

  const bg = useTransform(p, [0, 0.42, 0.74, 0.88], ["#ffffff", "#faf6ec", "#f3e4c2", "#e7ae43"]);
  const vignette = useTransform(p, [0.3, 0.85], [0, 0.55]);

  // Windows are wide and early now, and none of them close.
  const one = useReveal(pb, 0.04, 0.16);
  const two = useReveal(pb, 0.24, 0.4);
  const three = useReveal(pb, 0.5, 0.66);

  /**
   * Both discs are feathered, so they over-scale to actually cover: on a phone
   * a 300vmax circle needs scale 0.37 to clear the viewport diagonal, 0.47 on a
   * square one.
   */
  const amber = useTransform(p, [0.68, 0.79, 0.9], [0, 0.42, 1.6]);
  /**
   * Starts on the heels of the syrup, but ramps slowly before its final push:
   * bringing the wipe forward without flattening its curve would only move the
   * dead air to the end, where the screen sits black waiting for the release.
   */
  const voidDisc = useTransform(p, [THROUGH_AT, 0.93, 1], [0, 0.18, 0.62]);

  const metersLeft = useTransform(p, (v) =>
    (42 * (1 - Math.min(Math.max(v, 0) / 0.9, 1))).toFixed(1),
  );
  const hudOpacity = useTransform(p, [0, 0.04, 0.8, 0.87], [0, 1, 1, 0]);
  const progressX = useTransform(p, [0, 0.9], [0, 1]);

  return (
    <section ref={ref} className="relative" style={{ height: `${TRACK_VH}vh` }}>
      {/*
        Tone sentinel. This section starts white and ends black, so a single
        static marker can't tell the fixed menu which colour to be. It covers
        the stretch of track over which the stage is already dark.
      */}
      <div
        data-nav-dark
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ top: `${(DARK_OFFSET * 100).toFixed(2)}%` }}
      />

      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ background: bg }} />
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: vignette,
            background:
              "radial-gradient(58% 46% at 50% 50%, rgba(255,196,87,0.6), rgba(140,72,10,0) 72%)",
          }}
        />

        {/* ---------- the object ---------- */}
        <div className="absolute inset-0 grid place-items-center">
          <motion.div
            style={{ scale: jarScale, y: jarDrift, rotate: jarTilt, willChange: "transform" }}
          >
            <SyrupJar className="h-auto w-[54vmin] max-w-none" />
          </motion.div>
        </div>

        {/* ---------- 01 · who ---------- */}
        {/*
          Mobile offset is px, not vh, because the thing it has to clear is the
          floating CTA: it sits at bottom-14 (56px) and is 52px tall, so it owns
          the band ~108px up from the bottom edge. 11vh tracked the viewport
          instead of the button and collided on every phone.
        */}
        <div className="pointer-events-none absolute inset-x-6 bottom-36 md:inset-x-auto md:bottom-[13vh] md:left-[7vw] md:max-w-[34rem]">
          <motion.div style={one}>
            <p className="t-mono mb-3 text-syrup">{BLOCKS.who.tag}</p>
            <div className="rule pt-4">
              <h2 className="s-loud t-grotesk">{BLOCKS.who.title}</h2>
              <p className="t-serif s-mid mt-1 text-syrup-deep">{BLOCKS.who.sub}</p>
            </div>
          </motion.div>
        </div>

        {/* ---------- 02 · record ---------- */}
        <div className="pointer-events-none absolute inset-x-6 top-[11vh] md:inset-x-auto md:right-[7vw] md:top-[15vh] md:max-w-[26rem]">
          <motion.div style={two} className="md:text-right">
            <p className="t-mono mb-3 text-syrup">{BLOCKS.record.tag}</p>
            <div className="rule space-y-2 pt-4">
              <p className="s-body">{BLOCKS.record.lines[0]}</p>
              <p className="s-body t-serif text-syrup">{BLOCKS.record.lines[1]}</p>
            </div>
          </motion.div>
        </div>

        {/* ---------- 03 · the statement ---------- */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2">
          <motion.div style={three}>
            {/* bleeds 6% past both edges, so the padding has to buy that back */}
            <div className="-mx-[6%] w-[112%] -rotate-[1.4deg] bg-ink px-12 py-7 md:px-[14vw] md:py-11">
              <Statement />
            </div>
          </motion.div>
        </div>

        {/* ---------- approach HUD ---------- */}
        <motion.div
          style={{ opacity: hudOpacity }}
          className="pointer-events-none absolute inset-x-6 bottom-5 flex items-end justify-between md:inset-x-10"
        >
          <span className="t-mono text-syrup-deep">
            distance <motion.span className="text-ink">{metersLeft}</motion.span> m
          </span>
          <span className="t-mono text-syrup-deep">maple grove no. 01</span>
        </motion.div>

        <motion.div
          style={{ opacity: hudOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-ink/10"
        >
          <motion.div style={{ scaleX: progressX, originX: 0 }} className="h-full w-full bg-syrup" />
        </motion.div>

        {/*
          Through the glass. Both discs are far bigger than the viewport, so they
          are placed with left/top 50% + a -50% self-translate: grid/flex centring
          silently start-aligns an item that overflows its container, which parks
          a 2400px circle off-screen instead of over it.
        */}
        <motion.div
          style={{ scale: amber, x: "-50%", y: "-50%", willChange: "transform" }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[300vmax] w-[300vmax] rounded-full bg-[radial-gradient(circle_at_50%_48%,#6d3406_0%,#a4560f_32%,rgba(196,116,28,0.7)_62%,rgba(224,151,43,0)_100%)]"
        />
        <motion.div
          style={{ scale: voidDisc, x: "-50%", y: "-50%", willChange: "transform" }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[300vmax] w-[300vmax] rounded-full bg-[radial-gradient(circle,#08070a_0%,#08070a_62%,rgba(8,7,10,0.75)_82%,rgba(8,7,10,0)_100%)]"
        />
      </div>
    </section>
  );
}
