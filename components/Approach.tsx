"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import SyrupJar from "./SyrupJar";

/**
 * The scroll here is not a feed. Scroll distance == physical distance to the jar.
 * Everything is driven off one progress value so nothing can desync, and every
 * animated property is transform or opacity only — iOS Safari never has to
 * re-layout or repaint while the finger is down.
 */

function useReveal(p: MotionValue<number>, a: number, b: number, c: number, d: number) {
  return {
    opacity: useTransform(p, [a, b, c, d], [0, 1, 1, 0]),
    y: useTransform(p, [a, b], [54, 0]),
    scale: useTransform(p, [a, b], [0.93, 1]),
  };
}

/** Length of the scroll track. The whole approach is paced off this one number. */
const TRACK_VH = 520;
/**
 * Progress at which the stage has gone fully dark — drives the menu's tone
 * sentinel. Follows `amber`: the syrup now closes over the frame at ~0.78, so
 * leaving this at the old 0.9 would strand ink-coloured dots on a black
 * backdrop for ~40vh.
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

export default function Approach() {
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
   * Front-loaded on purpose. With two keyframes the jar spent the first 62% of
   * the track crawling from a 26px speck to 300px — technically growing, but
   * below the threshold where a phone screen reads it as *approaching*.
   * These stops put it past 100px by 7% and bleeding off both edges by 55%.
   */
  const jarScale = useTransform(
    p,
    [0, 0.1, 0.3, 0.58, 0.84, 1],
    [0.22, 0.6, 1.15, 1.95, 3.7, 7.2],
  );
  const jarDrift = useTransform(p, [0, 1], ["7vh", "-3vh"]);
  const jarTilt = useTransform(p, [0, 0.5, 1], [-4, 1.5, -0.6]);

  const bg = useTransform(
    p,
    [0, 0.42, 0.74, 0.88],
    ["#ffffff", "#faf6ec", "#f3e4c2", "#e7ae43"],
  );

  const vignette = useTransform(p, [0.3, 0.85], [0, 0.55]);

  const one = useReveal(pb, 0.05, 0.12, 0.2, 0.26);
  const two = useReveal(pb, 0.3, 0.37, 0.46, 0.52);
  const three = useReveal(pb, 0.56, 0.63, 0.74, 0.8);

  /**
   * Both discs are feathered, so they over-scale to actually cover: on a phone
   * a 300vmax circle needs scale 0.37 to clear the viewport diagonal, 0.47 on a
   * square one.
   *
   * The syrup now starts rising at 0.68 and closes over the frame at ~0.78 —
   * i.e. *during* block 03's fade-out (0.74 → 0.80), so the text sinks into it
   * instead of leaving and handing over to nine percent of nothing.
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
          Mobile offset is px, not vh, because the thing it has to clear is:
          HireCta sits at bottom-14 (56px) and is 48px tall, so it owns the band
          104px up from the bottom edge. 11vh tracked the viewport instead of
          the button and collided on every phone — worse on short ones, where
          11vh is only 70px. 144px leaves 40px of air at rest, and still ~25px
          mid-fade-in, when the reveal transform holds the block up to 54px
          lower. Desktop keeps vh: there the CTA is a right-hand pill.
        */}
        <div className="pointer-events-none absolute inset-x-6 bottom-36 md:inset-x-auto md:bottom-[13vh] md:left-[7vw] md:max-w-[36rem]">
          <motion.div style={one}>
            <p className="t-mono mb-3 text-ash">01 — who</p>
            <div className="rule pt-4">
              <h2 className="s-loud t-grotesk">Joseph The Great</h2>
              <p className="t-serif s-mid mt-1 text-syrup-deep">
                19, marketing &amp; social media.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ---------- 02 · record ---------- */}
        <div className="pointer-events-none absolute inset-x-6 top-[13vh] md:inset-x-auto md:right-[7vw] md:top-[17vh] md:max-w-[27rem]">
          <motion.div style={two} className="md:text-right">
            <p className="t-mono mb-3 text-ash">02 — record</p>
            <div className="rule space-y-2 pt-4">
              <p className="s-body">
                YouTube and Instagram projects since 11. Seven years of making content.
                In Canada on my own since 16. The last three years, marketing only.
              </p>
              <p className="s-body t-serif text-syrup">
                Not a pitch — a record. Ask me to prove any line of it.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ---------- 03 · the statement ---------- */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2">
          <motion.div style={three}>
            {/* bleeds 6% past both edges, so the padding has to buy that back */}
            <div className="-mx-[6%] w-[112%] -rotate-[1.4deg] bg-ink px-12 py-8 md:px-[14vw] md:py-12">
              <p className="t-mono mb-4 text-gold">03 — the part nobody says</p>
              <p className="s-loud t-grotesk text-cream">
                Agencies here bill <span className="text-gold">$3,000+</span> for
                template video <span className="t-serif font-normal">that doesn&apos;t work.</span>
              </p>
              <p className="s-body mt-5 max-w-[46rem] text-cream/60">
                It&apos;s not the edit. They never learned what marketing is. Surreal is
                the only thing left that stops a thumb — so that&apos;s what I make.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ---------- approach HUD ---------- */}
        <motion.div
          style={{ opacity: hudOpacity }}
          className="pointer-events-none absolute inset-x-6 bottom-5 flex items-end justify-between md:inset-x-10"
        >
          <span className="t-mono text-syrup-deep/70">
            distance{" "}
            <motion.span className="text-syrup-deep">{metersLeft}</motion.span> m
          </span>
          <span className="t-mono text-syrup-deep/70">maple grove no. 01</span>
        </motion.div>

        <motion.div
          style={{ opacity: hudOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-ink/10"
        >
          <motion.div
            style={{ scaleX: progressX, originX: 0 }}
            className="h-full w-full bg-syrup"
          />
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
