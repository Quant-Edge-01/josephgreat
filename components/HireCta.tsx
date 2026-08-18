"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavDark } from "@/lib/useNavDark";
import { useContactOpen } from "./ContactProvider";

/**
 * The home page's persistent call to action.
 *
 * Three changes out of the audit. It scrolls to the form on this page rather
 * than navigating away, so the scroll the visitor has already invested isn't
 * thrown away. It offers the free thing instead of "hire me — $1,000 max",
 * which asks a stranger to commit money as their first interaction. And it
 * gets out of the way once the form is actually on screen, rather than
 * hovering over the fields it is advertising.
 *
 * It still stays off the first screen (the lockup owns that), sits at the
 * bottom because the dots menu owns the top-right, and drops below the menu and
 * modal z-layers so it can never sit on top of either.
 */
export default function HireCta() {
  const [past, setPast] = useState(false);
  const [atForm, setAtForm] = useState(false);
  // sampled at the bottom of the viewport, where this actually floats
  const onDark = useNavDark("bottom");
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

  useEffect(() => {
    const target = document.getElementById("start");
    if (!target || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setAtForm(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  const show = past && !modalOpen && !atForm;

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
          <a
            href="#start"
            className="t-mono flex min-h-[52px] w-full items-center justify-center gap-3 px-6 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)] transition-colors duration-300 md:w-auto"
            style={{
              background: onDark ? "#ffb43d" : "#0d0c0b",
              color: onDark ? "#08070a" : "#f4efe3",
            }}
          >
            three things I&apos;d fix — free
            <span aria-hidden>↓</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
