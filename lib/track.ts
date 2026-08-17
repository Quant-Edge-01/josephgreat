/**
 * Thin wrapper over the Meta Pixel.
 *
 * Two hard rules, both learned from the previous version:
 *
 * 1. A tracking call must never be the reason a form submission or a link click
 *    fails. Ad blockers stop `fbq` from ever being defined, and `fbq` itself can
 *    throw if the snippet half-loaded. Every call is guarded and swallowed.
 * 2. An event must never fire twice for one real-world action. React Strict Mode
 *    double-invokes effects, App Router re-renders on every navigation, and the
 *    same component can mount in two trees. Dedupe therefore lives at module
 *    scope, not in a ref — a ref is per-instance and resets on remount.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Standard Meta events only. `Lead` is deliberately reserved for a verified
 * successful send — see EnquiryForm. Clicking the submit button is not a lead;
 * it is at best an intent, and counting it as a lead poisons the optimiser with
 * conversions that never reached the inbox.
 */
export type PixelEvent = "PageView" | "ViewContent" | "Lead" | "Contact";

/** Keys already fired in this document. Cleared only by a full page load. */
const fired = new Set<string>();

/** Opt-in console tracing: `?pixeldebug=1`, or localStorage `pixeldebug=1`. */
function debugging() {
  if (typeof window === "undefined") return false;
  try {
    return (
      new URLSearchParams(window.location.search).has("pixeldebug") ||
      window.localStorage.getItem("pixeldebug") === "1"
    );
  } catch {
    return false;
  }
}

/**
 * Meta's dedupe id. Harmless without a Conversions API counterpart, and it
 * makes an individual event findable in Test Events instead of being one of
 * five identical rows.
 */
function eventId(event: string) {
  const rand =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${event}-${Date.now().toString(36)}-${rand}`;
}

export function track(event: PixelEvent, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const id = eventId(event);
  if (debugging()) {
    console.info(`[pixel] ${event}`, { eventID: id, ...(params ?? {}) });
  }
  try {
    window.fbq?.("track", event, params ?? {}, { eventID: id });
  } catch {
    /* blocked, half-loaded, or not loaded — never the caller's problem */
  }
}

/**
 * Fire `event` at most once per `key` for the life of the document.
 *
 * Used for anything driven by an effect: ViewContent on a case study would
 * otherwise fire twice in development (Strict Mode) and again on every
 * re-render that changes the effect's identity.
 */
export function trackOnce(
  key: string,
  event: PixelEvent,
  params?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  if (fired.has(key)) {
    if (debugging()) console.info(`[pixel] skipped duplicate ${event} (${key})`);
    return;
  }
  fired.add(key);
  track(event, params);
}
