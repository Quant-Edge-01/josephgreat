import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EMAIL } from "@/lib/site";

export const runtime = "nodejs";

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

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[enquiry] RESEND_API_KEY is not set — cannot send the enquiry.");
    return NextResponse.json(
      { error: "Mail isn't configured on the server." },
      { status: 500 },
    );
  }

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: `JosephTheGreat site <enquiry@josephthegreat.art>`,
      to: [EMAIL],
      replyTo: email,
      subject: `Enquiry — ${business}`,
      text: [
        `Business: ${business}`,
        `Email:    ${email}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[enquiry] Resend rejected the send:", error);
      return NextResponse.json({ error: "The mail service refused it." }, { status: 502 });
    }
  } catch (err) {
    console.error("[enquiry] Unexpected failure sending the enquiry:", err);
    return NextResponse.json({ error: "Could not send the enquiry." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
