"use client";

import { useEffect, useId, useRef, useState } from "react";
import { EMAIL, IG_HANDLE, IG_URL, OFFER, mailto } from "@/lib/site";
import { track } from "@/lib/track";

type Field = "site" | "reply";
type Errors = Partial<Record<Field, string>>;
type State = "idle" | "sending" | "sent" | "failed";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** `@name`, `name`, instagram.com/name, or any domain-looking string. */
const HANDLE_RE = /^@?[A-Za-z0-9._]{2,40}$/;
const URLISH_RE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i;

/**
 * Digits and phone punctuation only — no letters, so an @handle can never pass
 * as a number. 10 to 15 digits covers a North American number with or without
 * the country code, and everything the E.164 maximum allows.
 */
const PHONE_SHAPE_RE = /^\+?[\d\s().-]{9,}$/;
function isPhone(v: string) {
  if (!PHONE_SHAPE_RE.test(v)) return false;
  const digits = v.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

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
 * Nothing a human can clear. A bot that fills every field it finds trips the
 * honeypot; a bot that posts instantly trips the clock. 1.5s is far under the
 * time it takes a person to focus two fields, even with autofill, so a real
 * visitor can never hit it.
 */
const MIN_FILL_MS = 1500;

function validate(name: Field, raw: string): string | undefined {
  const v = raw.trim();
  if (name === "site") {
    if (!v) return "Your Instagram handle or your website — either one.";
    if (!HANDLE_RE.test(v) && !URLISH_RE.test(v))
      return "That doesn't look like a handle or a link. @yourshop works.";
    return;
  }
  if (!v) return "An email address or a phone number.";
  /*
   * This used to accept an @handle, on the theory that forcing an email on
   * someone who lives in the Instagram app costs more sends than it saves.
   * That was wrong, and it cost a real lead: Instagram will not deliver a DM
   * to someone who does not follow you — it lands in a hidden request folder
   * or nowhere at all — so a handle here produced an enquiry that could not be
   * answered. Friction saved on a lead you cannot reach is not saved at all.
   *
   * Nothing is lost by refusing it: the field above already captures their
   * Instagram. This one only has to be a channel that actually opens.
   */
  if (EMAIL_RE.test(v) || isPhone(v)) return;
  // Mostly digits: they meant a number and got the length wrong.
  if (/^\+?[\d\s().-]+$/.test(v))
    return "That doesn't look like a full phone number — include the area code.";
  // A handle or a URL. Instagram handles routinely contain dots
  // (@dream.alterations), so this cannot key off punctuation.
  if (v.startsWith("@") || HANDLE_RE.test(v) || URLISH_RE.test(v))
    return "Use an email or phone number so I can send your ideas back.";
  return "That doesn't look like an email or a phone number.";
}

/**
 * Two required fields and one optional one. No budget dropdown, no "how did you
 * hear about us": every extra box costs sends, and none of them are needed to
 * look at an account and write back.
 *
 * The reply field takes an email or a phone number and refuses a bare handle —
 * see validate(). That is a deliberate step back up in friction, taken because
 * the cheaper version produced an enquiry nobody could answer.
 */
export default function EnquiryForm({
  context = "site",
}: {
  context?: string;
}) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLParagraphElement>(null);
  const mountedAt = useRef(Date.now());
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [failure, setFailure] = useState("");

  useEffect(() => {
    if (state === "sent") doneRef.current?.focus();
  }, [state]);

  /** Validate on blur, but never surprise someone who hasn't typed yet. */
  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = e.target.name as Field;
    if (name !== "site" && name !== "reply") return;
    if (!e.target.value.trim()) return;
    setErrors((prev) => ({ ...prev, [name]: validate(name, e.target.value) }));
  }

  /** Clear an error the moment it stops being true, not on the next submit. */
  function onInput(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const el = e.currentTarget;
    const name = el.name as Field;
    if (name !== "site" && name !== "reply") return;
    setErrors((prev) =>
      prev[name] ? { ...prev, [name]: validate(name, el.value) } : prev,
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const site = String(data.get("site") ?? "").trim();
    const reply = String(data.get("reply") ?? "").trim();
    const promoting = String(data.get("promoting") ?? "").trim();
    const discoverySource = String(data.get("discovery_source") ?? "").trim();

    const next: Errors = {};
    const siteErr = validate("site", site);
    const replyErr = validate("reply", reply);
    if (siteErr) next.site = siteErr;
    if (replyErr) next.reply = replyErr;

    setErrors(next);
    if (Object.keys(next).length) {
      // Send focus to the first thing that needs fixing rather than leaving a
      // screen-reader user to hunt for the message.
      const first = next.site ? "site" : "reply";
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    // A real person never fills a field they cannot see, and never submits in
    // under a second and a half. Show the success state so a bot learns
    // nothing from the difference, and send nothing.
    const tooFast = Date.now() - mountedAt.current < MIN_FILL_MS;
    if (String(data.get("company_website") ?? "").trim() || tooFast) {
      setState("sent");
      return;
    }

    if (!ACCESS_KEY) {
      console.error(
        "[enquiry] NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set — the enquiry cannot be sent. " +
          "Set it in the Vercel project (and .env.local for development), then redeploy.",
      );
      setFailure("Please email me using the link below.");
      setState("failed");
      return;
    }

    setState("sending");
    setFailure("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `3 creative ideas — ${site}`,
          from_name: "JosephTheGreat site",
          // Only a real address can be a reply-to. An @handle here would make
          // the notification unreplyable, so it is left off and the handle is
          // carried in the body instead.
          ...(EMAIL_RE.test(reply) ? { replyto: reply } : {}),
          // remaining keys render as labelled rows in the email body
          "Instagram or website": site,
          [EMAIL_RE.test(reply)
            ? "Reply by email"
            : "Reply by phone / WhatsApp"]: reply,
          "What they're promoting": promoting || "— not given —",
          "How they found Joseph": discoverySource || "— not given —",
          "Sent from": context,
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
      // status alone is not enough to call this sent. Nothing below this line
      // runs unless the mail actually left.
      if (!res.ok || !result?.success) {
        console.error(
          `[enquiry] Web3Forms refused the send — status ${res.status}`,
        );
        setFailure("Please try again or email me below.");
        setState("failed");
        return;
      }

      // The only place Lead is fired anywhere in the codebase.
      track("Lead", { content_name: "teardown_request", source: context });
      setState("sent");
    } catch (err) {
      console.error("[enquiry] The enquiry never left the browser:", err);
      setFailure(
        "The request never left your browser — the connection dropped.",
      );
      setState("failed");
    } finally {
      window.clearTimeout(timeout);
    }
  }

  if (state === "sent") {
    return (
      <div className="rule-neon pt-8">
        <p
          ref={doneRef}
          tabIndex={-1}
          className="s-loud t-grotesk text-cream focus:outline-none"
        >
          Sent<span className="text-neon">.</span>
        </p>
        <p className="s-body mt-4 max-w-[34rem] text-cream/75">
          I’ll send your three ideas to the contact you gave me. {OFFER.reply}
          Email replies come from <span className="text-neon">{EMAIL}</span>.
        </p>
        <p className="s-body mt-4 max-w-[34rem] text-cream/60">
          {OFFER.noCall} If the three things are all you wanted, take them and
          go.
        </p>
      </div>
    );
  }

  const field =
    "w-full border border-neon/40 bg-void-2 px-4 py-3.5 text-[16px] text-cream placeholder:text-cream/55 focus:border-neon focus:outline-none";
  const label = "t-mono mb-2 block text-cream/75";
  // t-note, not t-mono: .t-mono sets text-transform on the class itself and so
  // beats Tailwind's normal-case, which turned every hint into shouted caps.
  const hint = "t-note mt-2 block text-cream/65";
  const err = "t-note mt-2 block text-acid";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="max-w-[34rem]"
    >
      <div className="mb-6">
        <label htmlFor={`${id}-site`} className={label}>
          Your Instagram or website
        </label>
        <input
          id={`${id}-site`}
          name="site"
          required
          type="text"
          maxLength={200}
          autoComplete="url"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder="@yourshop"
          onBlur={onBlur}
          onInput={onInput}
          aria-invalid={!!errors.site}
          aria-describedby={errors.site ? `${id}-site-err` : `${id}-site-hint`}
          className={field}
        />
        {errors.site ? (
          <span id={`${id}-site-err`} className={err}>
            {errors.site}
          </span>
        ) : (
          <span id={`${id}-site-hint`} className={hint}>
            This is the thing I actually look at.
          </span>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor={`${id}-reply`} className={label}>
          Where should I send it back?
        </label>
        <input
          id={`${id}-reply`}
          name="reply"
          required
          type="text"
          maxLength={200}
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder="you@shop.ca or 416 555 1234"
          onBlur={onBlur}
          onInput={onInput}
          aria-invalid={!!errors.reply}
          aria-describedby={
            errors.reply ? `${id}-reply-err` : `${id}-reply-hint`
          }
          className={field}
        />
        {errors.reply ? (
          <span id={`${id}-reply-err`} className={err}>
            {errors.reply}
          </span>
        ) : (
          <span id={`${id}-reply-hint`} className={hint}>
            Email or WhatsApp — whichever you check.
          </span>
        )}
      </div>

      <details className="mb-6 short-detail text-cream/80">
        <summary className="mb-3">Anything I should know? (optional)</summary>
        <label htmlFor={`${id}-promoting`} className={label}>
          What are you promoting?{" "}
          <span className="t-note text-cream/65">(optional)</span>
        </label>
        <textarea
          id={`${id}-promoting`}
          name="promoting"
          rows={2}
          maxLength={2000}
          placeholder="Spring sessions. A new location. Whatever's next."
          onInput={onInput}
          className={`${field} resize-y`}
        />
      </details>

      <div className="mb-6">
        <label htmlFor={`${id}-source`} className={label}>
          How did you find Joseph?{" "}
          <span className="t-note text-cream/65">(optional)</span>
        </label>
        <select
          id={`${id}-source`}
          name="discovery_source"
          defaultValue=""
          className={field}
        >
          <option value="">Choose one</option>
          <option value="ChatGPT / AI assistant">ChatGPT / AI assistant</option>
          <option value="Google">Google</option>
          <option value="Instagram">Instagram</option>
          <option value="Referral">Referral</option>
          <option value="Outreach">Outreach</option>
          <option value="Other">Other</option>
        </select>
        <span className={hint}>This helps measure what actually brings enquiries.</span>
      </div>

      {/* honeypot — off-screen, never focusable, must stay empty */}
      <div
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor={`${id}-hp`}>Company website</label>
        <input
          id={`${id}-hp`}
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        className="t-grotesk min-h-[60px] w-full bg-neon px-6 text-[1.2rem] text-void transition-colors duration-300 hover:bg-acid disabled:cursor-wait disabled:opacity-70"
      >
        {state === "sending" ? "Sending…" : "Send me 3 ideas"}
      </button>

      <p className="t-note mt-4 text-cream/70">{OFFER.reply}</p>
      {/*
        Offered, not asked for, and with no booking link anywhere — the point of
        "no call" was never that talking is forbidden, it was that nobody has to
        sit through a discovery call to get an answer. Saying so removes the
        objection for people who would simply rather speak.
      */}

      {state === "failed" && (
        <div role="alert" className="mt-8 border border-acid/50 p-5">
          <p className="s-body text-cream">
            That didn&apos;t go through — {failure} Nothing you typed is lost,
            and you can hit send again.
          </p>
          <p className="s-body mt-3 text-cream/70">
            Or just use whichever is easier:
          </p>
          <div className="t-mono mt-4 flex flex-col gap-2">
            <a className="underline-swipe w-fit text-neon" href={IG_URL}>
              {IG_HANDLE} ↗
            </a>
            <a
              className="underline-swipe w-fit text-neon"
              href={mailto(OFFER.cta)}
            >
              {EMAIL} ↗
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
