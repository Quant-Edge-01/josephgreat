import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Web3Forms rather than an SMTP provider: the destination inbox is bound to the
 * access key, so nothing has to be proved through DNS. The root domain's mail
 * is already Private Email's and its Mail Settings can't take a second MX.
 */
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const LIMITS = { business: 120, email: 200, message: 2000 } as const;
const RATE = { max: 5, windowMs: 10 * 60 * 1000 } as const;

/**
 * Per-instance memory. Resets on cold start and isn't shared across regions,
 * so it is a spam speed bump, not a security control — which is all this
 * endpoint needs at three-figure monthly traffic.
 */
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE.windowMs);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) hits.clear(); // crude ceiling on memory growth
  return recent.length > RATE.max;
}

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a real person never fills a field they cannot see. Report success
  // so the bot has nothing to learn from, but send nothing.
  if (clean(payload.company_website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const business = clean(payload.business, LIMITS.business);
  const email = clean(payload.email, LIMITS.email);
  const message = clean(payload.message, LIMITS.message);

  const errors: Record<string, string> = {};
  if (!business) errors.business = "Tell me the business name.";
  if (!email) errors.email = "I need an email to reply to.";
  else if (!EMAIL_RE.test(email)) errors.email = "That email doesn't look right.";
  if (!message) errors.message = "One sentence is enough — what are we promoting?";

  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Try again in a few minutes, or DM instead." },
      { status: 429 },
    );
  }

  const key = process.env.WEB3FORMS_ACCESS_KEY;
  if (!key) {
    console.error("[enquiry] WEB3FORMS_ACCESS_KEY is not set — cannot send the enquiry.");
    return NextResponse.json(
      { error: "Mail isn't configured on the server." },
      { status: 500 },
    );
  }

  try {
    const upstream = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: `New enquiry — ${business}`,
        from_name: "JosephTheGreat site",
        // Reply goes to the person who wrote in, so the lead is answerable in
        // one click from the notification.
        replyto: email,
        // remaining keys are rendered as labelled rows in the email body
        "Business name": business,
        Email: email,
        "What they want to promote": message,
      }),
      // an upstream that never answers would otherwise hold the function open
      signal: AbortSignal.timeout(10_000),
    });

    // A rejected key still comes back 200 with {"success": false}, so the HTTP
    // status alone is not enough to call this sent.
    const result = (await upstream.json().catch(() => null)) as
      | { success?: boolean; message?: string }
      | null;

    if (!upstream.ok || !result?.success) {
      console.error(
        "[enquiry] Web3Forms refused the send:",
        upstream.status,
        result?.message ?? result,
      );
      return NextResponse.json({ error: "The mail service refused it." }, { status: 502 });
    }
  } catch (err) {
    console.error("[enquiry] Unexpected failure sending the enquiry:", err);
    return NextResponse.json({ error: "Could not send the enquiry." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
