"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/** Fires ViewContent once when a case study is opened. Renders nothing. */
export default function TrackView({ id }: { id: string }) {
  useEffect(() => {
    track("ViewContent", { content_type: "work", content_ids: [id] });
  }, [id]);

  return null;
}
