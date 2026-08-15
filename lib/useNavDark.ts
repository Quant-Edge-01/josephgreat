"use client";

import { useEffect, useState } from "react";

/**
 * True while a section marked `data-nav-dark` is crossing the top strip of the
 * viewport. Fixed chrome (the dots menu, the hire CTA) uses it to flip between
 * ink and cream — no single colour survives white, amber and near-black.
 *
 * Extracted so the menu and the CTA can never disagree about the backdrop.
 */
export function useNavDark() {
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll("[data-nav-dark]");
    if (!targets.length) return;

    const lit = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) lit.add(e.target);
          else lit.delete(e.target);
        }
        setOnDark(lit.size > 0);
      },
      { rootMargin: "0px 0px -90% 0px", threshold: 0 },
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return onDark;
}
