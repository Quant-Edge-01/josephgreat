"use client";

import { motion } from "motion/react";

const rise = {
  hidden: { y: "108%" },
  show: (i: number) => ({
    y: "0%",
    transition: { delay: 0.12 + i * 0.09, type: "spring" as const, stiffness: 180, damping: 22 },
  }),
};

export default function Hero() {
  return (
    <section className="relative flex h-[100dvh] flex-col justify-center bg-paper px-6 md:px-14">
      {/* one lockup, two typefaces: the seam between them is the whole idea */}
      <h1 className="s-mega mx-auto w-fit leading-[0.76]">
        <span className="block overflow-hidden">
          <motion.span
            className="t-grotesk inline-block font-[800] tracking-[-0.06em]"
            variants={rise}
            initial="hidden"
            animate="show"
            custom={0}
          >
            Be
          </motion.span>
        </span>
        <span className="block overflow-hidden pb-[0.1em]">
          <motion.span
            className="t-serif -ml-[0.03em] inline-block text-[1.14em]"
            variants={rise}
            initial="hidden"
            animate="show"
            custom={1}
          >
            unique
            <span className="text-gold">.</span>
          </motion.span>
        </span>
      </h1>

      {/* the only other mark on this screen: the affordance the whole site depends on */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute inset-x-0 bottom-4 flex flex-col items-center gap-3 md:bottom-7"
      >
        <span className="t-mono text-ash/55">come closer</span>
        <motion.span
          animate={{ scaleY: [0.25, 1, 0.25], originY: 0 }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="block h-10 w-px origin-top bg-ink/25"
        />
        {/* one line of proof, pitched well under the lockup so it never
            competes with it — the number does the work, not the styling */}
        <span className="t-mono px-6 text-center text-ash/40">
          last local job — $3.64 per conversation started
        </span>
      </motion.div>
    </section>
  );
}
