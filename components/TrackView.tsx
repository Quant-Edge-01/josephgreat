"use client";

import { useEffect } from "react";
import { trackOnce } from "@/lib/track";

/**
 * Fires ViewContent once when a case study is opened. Renders nothing.
 *
 * Deduped at module scope rather than by an effect guard: Strict Mode invokes
 * this effect twice in development, and without the guard every local test run
 * reports two views of every project.
 */
export default function TrackView({ id }: { id: string }) {
  useEffect(() => {
    trackOnce(`view:${id}`, "ViewContent", {
      content_type: "work",
      content_ids: [id],
    });
  }, [id]);

  return null;
}
