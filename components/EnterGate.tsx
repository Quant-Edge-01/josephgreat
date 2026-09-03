"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getAmbient } from "@/lib/ambient";
import SyrupJar from "./SyrupJar";

/**
 * The entry gate: a white screen with the jar on it, which breaks when tapped.
 *
 * The real job here is the tap, not the theatre. Every browser refuses to start
 * audio before a genuine user gesture, and on iOS that refusal is stricter than
 * elsewhere — which is why the soundtrack was not starting on a phone even when
 * the Sound button was pressed. A full-screen target that has to be tapped
 * before anything else guarantees the gesture exists, and lets the context be
 * created, unlocked and resumed inside it. See lib/ambient.ts for the two iOS
 * specifics (the ringer switch and the unlock buffer).
 *
 * HOW IT AVOIDS BEING A TRAP
 *
 * An interstitial is a real cost — every extra tap loses some people — so this
 * one is built to fail open in every direction:
 *
 * - The whole site is in the HTML underneath, always. The gate is an overlay,
 *   never a replacement, so crawlers and link previews read the full page.
 * - Visibility is driven by a `data-gate` attribute set by a tiny inline script
 *   in the document head. No JavaScript, no attribute, no gate — the site is
 *   simply there. A gate rendered unconditionally would lock out anyone whose
 *   bundle failed to load.
 * - It is per session, so it does not reappear on the way back from /works/*.
 * - There is a visible way in without sound, because "tap here and we will make
 *   noise at you" is not a choice everyone wants to be forced into.
 */

const ENTERED_KEY = "jtg-entered";
const SOUND_KEY = "jtg-sound";
/** Split, then fade. Kept short on purpose: this is a door, not a title card. */
const BREAK_MS = 430;

export default function EnterGate() {
  const [breaking, setBreaking] = useState(false);
  const [gone, setGone] = useState(false);
  const enterBtn = useRef<HTMLButtonElement>(null);
  const done = useRef(false);

  useEffect(() => {
    /* Already through it this session — a client-side return from /works/*
       still renders this markup on the server, so drop it immediately rather
       than leaving two jar SVGs and two buttons in the document. */
    if (sessionStorage.getItem(ENTERED_KEY)) {
      setGone(true);
      return;
    }
    // focus the way in, so a keyboard lands here and not on the page behind
    enterBtn.current?.focus();
  }, []);

  const open = useCallback((withSound: boolean) => {
    if (done.current) return;
    done.current = true;

    /* Start audio synchronously, still inside the gesture's call stack. Anything
       awaited first — even a state update that schedules a render — can cost the
       user activation on Safari and the context comes back suspended. */
    if (withSound) {
      void getAmbient().start();
      sessionStorage.setItem(SOUND_KEY, "on");
    } else {
      sessionStorage.setItem(SOUND_KEY, "off");
    }

    setBreaking(true);
    sessionStorage.setItem(ENTERED_KEY, "1");
    window.setTimeout(() => {
      document.documentElement.removeAttribute("data-gate");
      setGone(true);
    }, BREAK_MS);
  }, []);

  if (gone) return null;

  return (
    <div
      className={`site-gate ${breaking ? "gate-breaking" : ""}`}
      onClick={() => open(true)}
    >
      <div className="gate-jar">
        {/* Two clipped copies of the same jar. The crack is a hand-set polygon
            rather than a straight cut — a clean vertical line reads as a wipe,
            and the brief asked for something that had broken. */}
        <span className="gate-half gate-half-l">
          <SyrupJar className="h-full w-auto" />
        </span>
        <span className="gate-half gate-half-r">
          <SyrupJar className="h-full w-auto" />
        </span>
      </div>

      <button
        ref={enterBtn}
        type="button"
        className="t-grotesk gate-cta"
        onClick={(e) => {
          e.stopPropagation();
          open(true);
        }}
      >
        Tap to enter
      </button>

      {/* The "with sound" half of this used to live here and orphaned itself
          onto a second line on a phone. The muted link below carries the same
          information by contrast, and more plainly. */}
      <p className="t-mono gate-note">Toronto creative marketing studio</p>

      <button
        type="button"
        className="t-mono gate-muted"
        onClick={(e) => {
          e.stopPropagation();
          open(false);
        }}
      >
        enter without sound
      </button>
    </div>
  );
}
