"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import SyrupJar from "./SyrupJar";

/**
 * The labelled jar, drifting through the page.
 *
 * This is the site's signature object and it is deliberately kept out of the
 * argument. It carries no copy, states no benefit and sits in the gutter beside
 * sections that are doing the selling — a thing that is simply *there*, moving
 * at the wrong speed, in a page that is otherwise behaving itself. The brief
 * was explicit that the jar must not become the message, and the way to honour
 * that is to give it no message to carry.
 *
 * Motion is transform and opacity only, bound to one scroll progress value, so
 * a drifting jar costs the compositor a matrix multiply and never triggers
 * layout. Under prefers-reduced-motion the scroll binding is not created at
 * all — see the component boundary below.
 *
 * ACCESSIBILITY NOTE ON THE EASTER EGG
 *
 * Clicking tips the jar over and pours. That conveys no information and
 * performs no function, so it is aria-hidden and outside the tab order: adding
 * a tab stop for a joke would tax keyboard users to reward mouse users. The
 * rule is not "never hide interactive things", it is "never hide meaning", and
 * there is no meaning here to hide.
 */

type Props = {
  /** Which gutter it lives in. */
  side?: "left" | "right";
  /** Width, as a Tailwind arbitrary value. */
  className?: string;
  /** How far it travels against the scroll, in px. Higher = more detached. */
  drift?: number;
  /** Resting tilt, degrees. */
  tilt?: number;
};

export default function DriftingJar(props: Props) {
  return useReducedMotion() ? <JarStatic {...props} /> : <JarDrift {...props} />;
}

function shell(side: "left" | "right", className?: string) {
  return [
    "pointer-events-none absolute top-0 z-0 select-none",
    side === "left" ? "left-[-3%]" : "right-[-3%]",
    className ?? "w-[34vw] max-w-[15rem]",
  ].join(" ");
}

/* Reduced motion: present, tilted, going nowhere. */
function JarStatic({ side = "right", className, tilt = -6 }: Props) {
  return (
    <div aria-hidden className={shell(side, className)} style={{ opacity: 0.5 }}>
      <SyrupJar className="h-auto w-full" style={{ transform: `rotate(${tilt}deg)` }} />
    </div>
  );
}

function JarDrift({ side = "right", className, drift = 90, tilt = -6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [poured, setPoured] = useState(false);

  /* Progress across the whole time the jar is anywhere near the viewport, so
     the drift is continuous rather than starting when it is already on screen. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);
  const rotate = useTransform(scrollYProgress, [0, 1], [tilt - 7, tilt + 7]);

  /*
    Opacity is a constant, not a transform.

    It was a scroll ramp from 0, which meant the jar was invisible until
    hydration had run and Motion had produced its first frame — and stayed
    invisible for anyone whose tab was backgrounded on load, since rAF is
    paused there. The ramp was also redundant: the band clips with
    overflow-hidden, so the jar is already hidden at both ends of its travel by
    geometry. Painting it at a fixed 0.5 means the worst case for a broken or
    slow JS bundle is a jar that sits still, rather than one that never appears.
  */
  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={shell(side, className)}
      style={{ y, rotate, opacity: 0.5 }}
    >
      <div
        className={`pointer-events-auto cursor-pointer ${poured ? "jar-tip" : ""}`}
        onClick={() => {
          setPoured(true);
          window.setTimeout(() => setPoured(false), 2600);
        }}
      >
        <SyrupJar className="h-auto w-full" />
      </div>

      {/* the pour — a drip that runs out of the neck and falls away */}
      {poured && <span className="jar-pour" />}
    </motion.div>
  );
}
