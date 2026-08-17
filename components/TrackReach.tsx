"use client";

import { useEffect, useRef } from "react";
import { trackOnce } from "@/lib/track";

/**
 * Reports ViewContent the first time the visitor actually reaches the proof,
 * rather than the moment the document loads.
 *
 * Firing ViewContent on load would make it a duplicate of PageView and useless
 * for optimisation — every bounce would look like engagement. Anchored to the
 * evidence section instead, it becomes the one mid-funnel number worth having:
 * of the people the ad delivered, how many got far enough to see a real result.
 *
 * Renders a zero-height sentinel, so it never affects layout.
 */
export default function TrackReach({ id }: { id: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (very old Safari) — count the visit rather than
    // silently dropping the whole funnel step.
    if (typeof IntersectionObserver === "undefined") {
      trackOnce(`reach:${id}`, "ViewContent", { content_type: "section", content_ids: [id] });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          trackOnce(`reach:${id}`, "ViewContent", {
            content_type: "section",
            content_ids: [id],
          });
          io.disconnect();
        }
      },
      { threshold: 0 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [id]);

  return <div ref={ref} aria-hidden className="h-0 w-0" />;
}
