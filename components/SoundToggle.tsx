"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getAmbient } from "@/lib/ambient";

/**
 * The sound control. On by default — and that default is the whole reason this
 * component is more complicated than a button.
 *
 * WHY IT CANNOT SIMPLY PLAY ON LOAD
 *
 * Every current browser refuses to start audio until the page has received a
 * genuine user gesture; AudioContext.resume() rejects, or resolves into a
 * context still stuck in "suspended". There is no flag, no permission and no
 * workaround, and this is enforced identically in Chrome, Safari and Firefox.
 * A component that pretends otherwise ships a control reading "Sound on" over
 * silence, which is worse than being off.
 *
 * So the bed arms itself on load and starts on the first real interaction —
 * a click, a key, a tap, anywhere on the page. In practice that is the visitor's
 * first scroll-and-click and it feels automatic. Until then the control
 * honestly reads "Sound off", because it is.
 *
 * Scroll deliberately does not count: browsers do not treat it as activation,
 * so trying to start there just fails silently and burns the listener.
 *
 * Turning it off is remembered for the session and beats the default, so "off"
 * means off — including across the client-side route changes to /works/*.
 * sessionStorage rather than localStorage keeps a soundtrack someone silenced
 * from returning unannounced weeks later.
 */

const KEY = "jtg-sound";
const HINT_KEY = "jtg-sound-hint";

export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const [hint, setHint] = useState(false);
  const engine = useRef(getAmbient());

  /* The entry gate starts the same engine, so the label has to follow the
     engine rather than only this component's own clicks. Not disposed on
     unmount any more: the instance is shared and outlives this control. */
  useEffect(() => {
    const e = engine.current;
    setOn(e.isRunning);
    return e.subscribe(setOn);
  }, []);

  /* Tell people it is on and how to stop it, once, shortly after it starts.
     With sound opt-out rather than opt-in this is the important affordance:
     the visitor needs to find the off switch, not the on switch. */
  const offerHint = useCallback(() => {
    if (sessionStorage.getItem(HINT_KEY)) return;
    sessionStorage.setItem(HINT_KEY, "1");
    setHint(true);
    window.setTimeout(() => setHint(false), 6500);
  }, []);

  /* Arming still matters even with the gate: the gate only appears once per
     session, so a reload or a return from /works/* has no gate to tap and the
     bed has to catch the next interaction instead. */
  useEffect(() => {
    if (sessionStorage.getItem(KEY) !== "on") return;
    if (engine.current.isRunning) return;

    let done = false;
    const go = async () => {
      if (done || sessionStorage.getItem(KEY) !== "on") return;
      const started = await engine.current?.start();
      /* Blocked after all — leave the listeners up and try the next gesture
         rather than flipping the label to a lie. */
      if (!started) return;
      done = true;
      detach();
      sessionStorage.setItem(KEY, "on");
      setOn(true);
      offerHint();
    };
    const detach = () => {
      window.removeEventListener("pointerdown", go);
      window.removeEventListener("keydown", go);
      window.removeEventListener("touchend", go);
    };
    window.addEventListener("pointerdown", go);
    window.addEventListener("keydown", go);
    window.addEventListener("touchend", go);
    return detach;
  }, [offerHint]);

  // never play into a tab nobody is looking at
  useEffect(() => {
    const onVis = () =>
      document.hidden
        ? engine.current?.suspendForHide()
        : void engine.current?.resumeFromHide();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  async function toggle() {
    setHint(false);
    if (on) {
      engine.current?.stop();
      sessionStorage.setItem(KEY, "off");
      setOn(false);
    } else {
      const started = await engine.current?.start();
      if (started) {
        sessionStorage.setItem(KEY, "on");
        setOn(true);
      }
    }
  }

  return (
    // Right, not left: the hero's proof line and every section eyebrow are
    // ranged left, so a control fixed in that corner lands on copy at some
    // scroll offset on every page. The right gutter is empty the whole way down.
    <div className="sound-control shrink-0">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        aria-label={on ? "Mute music" : "Play music"}
        onPointerDown={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        className="t-mono flex min-h-11 min-w-11 items-center justify-center gap-2.5 border border-neon/35 bg-void/80 px-3 text-cream transition-colors duration-300 hover:border-neon/70"
      >
        {!on && (
          <span aria-hidden className="text-xl leading-none">
            ♪
          </span>
        )}
        <span
          aria-hidden
          className={on ? "flex h-3.5 items-end gap-[2px]" : "hidden"}
        >
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={on ? "eq-bar" : "eq-bar eq-off"}
              style={{ animationDelay: `${i * 0.13}s` }}
            />
          ))}
        </span>
        {/* the state, not the action — a control reading "Sound off" while
            sound is off is ambiguous about which of the two it means */}
        <span className="hidden lg:inline">
          {on ? "Sound on" : "Sound off"}
        </span>
      </button>

      {hint && false && (
        <p className="t-mono pointer-events-none hidden max-w-[16rem] text-right text-cream/55 sm:block">
          soundtrack playing — mute here →
        </p>
      )}
    </div>
  );
}
