"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useRef, useState } from "react";

/**
 * Holds the "who is being contacted about what" state for the whole app, and
 * nothing else.
 *
 * The panel itself lives in ContactPanel and is fetched on demand. This
 * provider is mounted in the root layout, so anything imported here lands in
 * the bundle of every route — and the panel pulls in Framer Motion for a dialog
 * most visitors never open. Nothing in the modal is needed until somebody
 * opens it.
 */

const Ctx = createContext<(subject?: string) => void>(() => {});
export const useContact = () => useContext(Ctx);

/** Whether the panel is currently up — fixed page chrome hides behind it. */
const OpenCtx = createContext(false);
export const useContactOpen = () => useContext(OpenCtx);

const ContactPanel = dynamic(() => import("./ContactPanel"), { ssr: false });

export default function ContactProvider({ children }: { children: React.ReactNode }) {
  const [subject, setSubject] = useState<string | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((s = "Project") => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setSubject(s);
  }, []);

  const close = useCallback(() => {
    setSubject(null);
    // Send focus back where it came from rather than to the top of the page.
    openerRef.current?.focus?.();
  }, []);

  return (
    <Ctx.Provider value={open}>
      <OpenCtx.Provider value={subject !== null}>{children}</OpenCtx.Provider>
      {/* not rendered — and therefore not downloaded — until first opened */}
      {subject !== null && <ContactPanel subject={subject} onClose={close} />}
    </Ctx.Provider>
  );
}
