"use client";

import { useSyncExternalStore } from "react";

/**
 * Is the fixed chrome currently sitting on a dark section?
 *
 * The site runs white → amber → near-black, so the dots menu and the floating
 * CTA have to flip between ink and cream or they disappear. Sections opt in
 * with `data-nav-dark`.
 *
 * Three things were wrong with the previous version.
 *
 * It ran inside the hook, so every consumer built its own observer over its own
 * copy of the state. Sharing a hook is not sharing state, and the menu and the
 * CTA visibly disagreed — the CTA unmounts and remounts with AnimatePresence,
 * and its replacement observer had not yet delivered a callback.
 *
 * It used IntersectionObserver, whose callbacks are tied to the rendering
 * steps, so the answer was always a frame stale and unavailable on first paint.
 *
 * And it asked one question for two elements that are at opposite ends of the
 * screen. The menu is 42px from the top; the CTA floats ~82px off the bottom.
 * On any page where the fold is light and the next section is dark — which is
 * most of this one — a single sample point is necessarily wrong for one of
 * them. Each position is now sampled where it actually sits.
 */

export type ChromeSlot = "top" | "bottom";

/** Vertical centre of the dots menu: fixed at top-5 (20px), 44px tall. */
const TOP_SAMPLE = 42;
/** Vertical centre of the floating CTA: bottom-14 (56px), 52px tall. */
const BOTTOM_INSET = 82;
/** Floor between recomputes. Cheap work, but no reason to do it per event. */
const THROTTLE_MS = 80;

const state: Record<ChromeSlot, boolean> = { top: false, bottom: false };
let lastRun = 0;
let timer: ReturnType<typeof setTimeout> | null = null;
let started = false;
const listeners = new Set<() => void>();

/** Is a dark section covering this line of the viewport? */
function darkAt(y: number) {
  for (const el of document.querySelectorAll("[data-nav-dark]")) {
    const r = el.getBoundingClientRect();
    if (r.top <= y && r.bottom >= y) return true;
  }
  return false;
}

function evaluate() {
  lastRun = Date.now();
  const top = darkAt(TOP_SAMPLE);
  const bottom = darkAt(window.innerHeight - BOTTOM_INSET);
  if (top === state.top && bottom === state.bottom) return;
  state.top = top;
  state.bottom = bottom;
  for (const l of listeners) l();
}

function schedule() {
  const wait = Math.max(0, THROTTLE_MS - (Date.now() - lastRun));
  if (wait === 0) {
    evaluate();
    return;
  }
  // trailing edge, so the resting position after a flick is always evaluated
  if (timer) return;
  timer = setTimeout(() => {
    timer = null;
    evaluate();
  }, wait);
}

function subscribe(cb: () => void) {
  listeners.add(cb);

  if (!started) {
    started = true;
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
  }
  // Always re-evaluate: a late subscriber (the CTA remounting mid-page) must
  // not inherit whatever the answer was when the page loaded.
  evaluate();

  return () => {
    listeners.delete(cb);
    // Listeners stay attached deliberately: the CTA unmounts every time the
    // page scrolls back past its threshold, and tearing this down and building
    // it again is how the two consumers drifted apart in the first place.
  };
}

export function useNavDark(slot: ChromeSlot = "top") {
  return useSyncExternalStore(
    subscribe,
    () => state[slot],
    () => false, // server render: the first paint is always over light chrome
  );
}
