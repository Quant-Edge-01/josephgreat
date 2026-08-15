"use client";

import { useId, useState } from "react";
import { EMAIL, IG_HANDLE, IG_URL, mailto } from "@/lib/site";
import { track } from "@/lib/track";

type Errors = Partial<Record<"business" | "email" | "message", string>>;
type State = "idle" | "sending" | "sent" | "failed";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
/**
 * Public by design. Web3Forms answers a server-side POST with 403 "This method
 * is not allowed. Use our API in client side" unless you are on their Pro plan,
 * so the browser has to be the sender. The key can only ever deliver to the one
 * inbox it was issued for; abuse is fenced off by domain restriction in their
 * dashboard, not by hiding the key.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

/**
 * Three fields, and deliberately no phone / budget / timeline: every extra box
 * costs submissions and none of them are needed to write a reply.
 */
export default function EnquiryForm() {
  const id = useId();
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [failure, setFailure] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const business = String(data.get("business") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!business) next.business = "Tell me the business name.";
    if (!email) next.email = "I need an email to reply to.";
    else if (!EMAIL_RE.test(email)) next.email = "That email doesn't look right.";
    if (!message) next.message = "One sentence is enough — what are we promoting?";

    setErrors(next);
    if (Object.keys(next).length) return;

    // Honeypot: a real person never fills a field they cannot see. Show the
    // success state so a bot learns nothing, and send nothing.
    if (String(data.get("company_website") ?? "").trim()) {
      setState("sent");
      return;
    }

    if (!ACCESS_KEY) {
      console.error(
        "[enquiry] NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set — cannot send the enquiry.",
      );
      setFailure("Mail isn't configured on the server.");
      setState("failed");
      return;
    }

    setState("sending");
    setFailure("");
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New enquiry — ${business}`,
          from_name: "JosephTheGreat site",
          // Reply goes to whoever wrote in, so the lead is answerable in one
          // click from the notification.
          replyto: email,
          // remaining keys render as labelled rows in the email body
          "Business name": business,
          Email: email,
          "What they want to promote": message,
        }),
      });

      // Read as text first: on a refusal the body is the only place the reason
      // lives, and it is not always JSON — a Cloudflare challenge page comes
      // back as HTML. Parsing straight to an object throws that away exactly
      // when it is needed.
      const raw = await res.text();
      let result: { success?: boolean; message?: string } | null = null;
      try {
        result = JSON.parse(raw);
      } catch {
        /* keep raw — logged verbatim below */
      }

      // A rejected key still answers 200 with {"success": false}, so the HTTP
      // status alone is not enough to call this sent.
      if (!res.ok || !result?.success) {
        console.error(
          `[enquiry] Web3Forms refused the send — status ${res.status} ${res.statusText}, body: ${raw}`,
        );
        setFailure("The mail service refused it.");
        setState("failed");
        return;
      }

      track("Lead");
      setState("sent");
    } catch (err) {
      console.error("[enquiry] The enquiry never left the browser:", err);
      setFailure("The request never left the browser — connection dropped.");
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div className="rule-neon pt-8">
        <p className="s-loud t-grotesk text-cream">Got it.</p>
        <p className="s-body mt-4 max-w-[34rem] text-cream/70">
          I read everything myself, so the reply comes from a person and usually
          lands within a day. It will arrive from{" "}
          <span className="text-neon">{EMAIL}</span> — if it isn&apos;t there, it fell
          into spam.
        </p>
      </div>
    );
  }

  const field = "w-full border border-neon/30 bg-void-2 px-4 py-3.5 text-[16px] text-cream placeholder:text-cream/25 focus:border-neon focus:outline-none";
  const label = "t-mono mb-2 block text-cream/60";
  const err = "t-mono mt-2 block text-acid";

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-[34rem]">
      <div className="mb-6">
        <label htmlFor={`${id}-business`} className={label}>
          Business name
        </label>
        <input
          id={`${id}-business`}
          name="business"
          type="text"
          maxLength={120}
          autoComplete="organization"
          aria-invalid={!!errors.business}
          aria-describedby={errors.business ? `${id}-business-err` : undefined}
          className={field}
        />
        {errors.business && (
          <span id={`${id}-business-err`} className={err}>
            {errors.business}
          </span>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor={`${id}-email`} className={label}>
          Email
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          maxLength={200}
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${id}-email-err` : undefined}
          className={field}
        />
        {errors.email && (
          <span id={`${id}-email-err`} className={err}>
            {errors.email}
          </span>
        )}
      </div>

      <div className="mb-8">
        <label htmlFor={`${id}-message`} className={label}>
          What you want to promote
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={3}
          maxLength={2000}
          placeholder="One sentence is plenty."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${id}-message-err` : undefined}
          className={`${field} resize-y`}
        />
        {errors.message && (
          <span id={`${id}-message-err`} className={err}>
            {errors.message}
          </span>
        )}
      </div>

      {/* honeypot — off-screen, never focusable, must stay empty */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-hp`}>Company website</label>
        <input id={`${id}-hp`} name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        className="t-grotesk min-h-[56px] w-full bg-neon px-6 text-[1.15rem] text-void transition-colors duration-300 hover:bg-acid disabled:cursor-wait disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Send it"}
      </button>

      <p className="t-mono mt-4 text-cream/35">
        No call required. No phone number asked for.
      </p>

      {state === "failed" && (
        <div role="alert" className="mt-8 border border-acid/40 p-5">
          <p className="s-body text-cream">{failure}</p>
          <p className="s-body mt-3 text-cream/60">Use whichever of these is easier:</p>
          <div className="t-mono mt-4 flex flex-col gap-2">
            <a className="underline-swipe w-fit text-neon" href={IG_URL}>
              {IG_HANDLE} ↗
            </a>
            <a className="underline-swipe w-fit text-neon" href={mailto("Project")}>
              {EMAIL} ↗
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
