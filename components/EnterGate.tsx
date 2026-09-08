"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getAmbient } from "@/lib/ambient";
import { isUngated } from "@/lib/site";
import SyrupJar from "./SyrupJar";

const ENTERED_KEY = "jtg-entered";
const SOUND_KEY = "jtg-sound";

export default function EnterGate() {
  const pathname = usePathname();
  const ungated = isUngated(pathname);
  const [breaking, setBreaking] = useState(false);
  const [gone, setGone] = useState(false);
  const enterBtn = useRef<HTMLButtonElement>(null);
  const done = useRef(false);

  useEffect(() => {
    try {
      if (ungated || sessionStorage.getItem(ENTERED_KEY)) {
        setGone(true);
        return;
      }
      enterBtn.current?.focus();
    } catch {
      document.documentElement.removeAttribute("data-gate");
      setGone(true);
    }
  }, [ungated]);

  const open = useCallback(() => {
    if (done.current) return;
    done.current = true;
    // Start inside the actual tap so Safari receives the user activation.
    // Audio failure must never prevent entry.
    void getAmbient().start().catch(() => {});
    try {
      sessionStorage.setItem(SOUND_KEY, "on");
      sessionStorage.setItem(ENTERED_KEY, "1");
    } catch { /* Entry also works when storage is unavailable. */ }
    setBreaking(true);
    window.setTimeout(() => {
      document.documentElement.removeAttribute("data-gate");
      setGone(true);
      document.querySelector<HTMLElement>("main")?.focus({ preventScroll: true });
    }, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 430);
  }, []);

  if (gone || ungated) return null;
  return (
    <div className={`site-gate ${breaking ? "gate-breaking" : ""}`} onClick={open}>
      <div className="gate-jar" aria-hidden="true">
        <span className="gate-half gate-half-l"><SyrupJar className="h-full w-auto" /></span>
        <span className="gate-half gate-half-r"><SyrupJar className="h-full w-auto" /></span>
      </div>
      <button ref={enterBtn} type="button" className="t-grotesk gate-cta" onClick={(e) => { e.stopPropagation(); open(); }}>
        Tap to enter
      </button>
      <p className="t-mono gate-note">Toronto creative marketing studio</p>
    </div>
  );
}
