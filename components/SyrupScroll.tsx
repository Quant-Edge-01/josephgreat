"use client";
import { useEffect } from "react";

/** One frame per scroll event, only while the hero is visible. No React renders. */
export default function SyrupScroll() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero-scene");
    if (!hero) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    let frame = 0;
    let active = false;
    function paint() {
      frame = 0;
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -r.top / (r.height * 0.55)));
      hero.style.setProperty("--spill", String(p));
      hero.style.setProperty("--pool", String(Math.max(0, (p - 0.35) / 0.65)));
    }
    function scroll() {
      if (!frame) frame = requestAnimationFrame(paint);
    }
    function stop() {
      active = false;
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
      frame = 0;
    }
    function configure() {
      stop();
      if (motion.matches || connection?.saveData) {
        hero!.style.setProperty("--spill", "0");
        hero!.style.setProperty("--pool", "0");
      } else {
        active = true;
        window.addEventListener("scroll", scroll, { passive: true });
        scroll();
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) configure();
      else if (active) stop();
    });
    observer.observe(hero);
    motion.addEventListener("change", configure);
    return () => {
      stop();
      observer.disconnect();
      motion.removeEventListener("change", configure);
    };
  }, []);
  return null;
}
