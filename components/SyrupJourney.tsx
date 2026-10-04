"use client";

import { useEffect, useRef } from "react";

/** A decorative pour that advances with reading progress. */
export default function SyrupJourney() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current;
    const story = svg?.parentElement;
    if (!svg || !story) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = story.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (innerHeight * 0.64 - rect.top) / (rect.height + innerHeight * 0.1)));
      svg.style.setProperty("--pour", reduced.matches ? "1" : String(progress));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); cancelAnimationFrame(frame); };
  }, []);
  return (
    <svg ref={ref} className="home-syrup" viewBox="0 0 180 1100" preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id="home-syrup-colour" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stopColor="#6a1d0b" /><stop offset=".36" stopColor="#ad3b0d" /><stop offset=".62" stopColor="#e99426" /><stop offset="1" stopColor="#6e2508" /></linearGradient></defs>
      <path className="home-syrup-shadow" d="M85 -35 C170 65 35 140 105 250 S150 385 83 485 S155 675 86 775 S125 945 71 1150" />
      <path className="home-syrup-line" pathLength="1" d="M85 -35 C170 65 35 140 105 250 S150 385 83 485 S155 675 86 775 S125 945 71 1150" />
      <path className="home-syrup-glint" pathLength="1" d="M85 -35 C170 65 35 140 105 250 S150 385 83 485 S155 675 86 775 S125 945 71 1150" />
    </svg>
  );
}
