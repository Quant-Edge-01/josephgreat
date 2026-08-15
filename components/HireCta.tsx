"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PRICE_CEILING } from "@/lib/site";
import { useNavDark } from "@/lib/useNavDark";
import { useContactOpen } from "./ContactProvider";

/**
 * The home page's only concession to conversion. It stays out of the first
 * screen so the "Be unique." poster is never shared with a button, sits at the
 * bottom (the dots menu owns the top-right), and drops below the menu and modal
 * z-layers so it can never sit on top of either.
 */
export default function HireCta() {
  const [past, setPast] = useState(false);
  const onDark = useNavDark();
  const modalOpen = useContactOpen();

  useEffect(() => {
    const check = () => setPast(window.scrollY > window.innerHeight * 0.9);
    check();
    // Landing on /#work or a restored scroll position can put the page past the
    // threshold before this effect runs, with no scroll event to follow it —
    // so re-check once the browser has settled rather than waiting for one.
    const raf = requestAnimationFrame(check);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const show = past && !modalOpen;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
          // sits clear of the approach HUD, which owns `bottom-5` inside the
          // pinned stage — otherwise it lands on top of the distance readout
          className="fixed inset-x-4 bottom-14 z-[9000] flex justify-center md:inset-x-auto md:bottom-12 md:right-8 md:justify-end"
        >
          <Link
            href="/hire"
            className="t-mono flex min-h-[48px] w-full items-center justify-center gap-3 px-6 transition-colors duration-300 md:w-auto"
            style={{
              background: onDark ? "#ffb43d" : "#0d0c0b",
              color: onDark ? "#08070a" : "#f4efe3",
            }}
          >
            hire me — ${PRICE_CEILING.toLocaleString()} max
            <span aria-hidden>↗</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
