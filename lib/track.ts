/**
 * Thin wrapper over the Meta Pixel. Every call is guarded: ad blockers stop
 * `fbq` from ever being defined, and a tracking call must never be the reason
 * a form submission or a link click fails.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export type PixelEvent = "ViewContent" | "Lead" | "Contact";

export function track(event: PixelEvent, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    window.fbq?.("track", event, params);
  } catch {
    /* blocked or not loaded — nothing to do */
  }
}
