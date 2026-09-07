export const EMAIL = "email@josephthegreat.art";

/**
 * Handle stored bare; the display form and the profile URL are both derived
 * from it so the two can never drift apart.
 */
export const IG_USER = "thejosephgreat";
export const IG_HANDLE = `@${IG_USER}`;
export const IG_URL = `https://instagram.com/${IG_USER}`;

export const PRICE_FLOOR = 700;
export const PRICE_CEILING = 1000;
export const PRICE_RANGE = `$${PRICE_FLOOR}–$${PRICE_CEILING.toLocaleString()}`;

export const mailto = (subject = "Project") =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;

/**
 * The low-friction offer, in one place. It is quoted in the hero, the form
 * heading, the metadata and the confirmation screen, and those four have to
 * agree word-for-word — a visitor who is promised three fixes and then thanked
 * for "your enquiry" has been handed to a different business mid-sentence.
 *
 * It is also a promise Joseph keeps by hand, one reply at a time. Nothing here
 * should grow into something that cannot be delivered in fifteen minutes.
 */
export const OFFER = {
  /** The ask, as a button. */
  cta: "Get 3 free ideas",
  /** The full promise. */
  line: "Send me your business link. I’ll send back 3 free creative ideas.",
  /** What happens next, in the order people worry about it. */
  reply: "I reply myself, usually within a day.",
  /**
   * "No follow-up sequence" is marketing-insider language for a promise the
   * visitor cares about in plainer words. And a call is not forbidden — it is
   * simply never required — so the blanket "No call." was quietly untrue for
   * anyone who would rather talk.
   */
  noCall: "No calendar link, and I won't chase you.",
  /** Offered, never asked for. There is deliberately no booking link anywhere. */
  callOptional:
    "If you'd rather talk it through, say so and I'll call you — but you never have to.",
} as const;

/**
 * The one case a Toronto owner can map onto their own shop. Referenced by slug
 * rather than by index so reordering WORKS can't silently feature the Roblox
 * channel to a bridal client.
 */
export const FLAGSHIP_SLUG = "dream-alteration";

/**
 * Dream Alterations is not a finished portfolio piece — it is a client who is
 * still paying, every month, since January 2026.
 *
 * This is the strongest fact the business owns and it was nowhere on the site.
 * Anyone can produce one good campaign screenshot. Retention is the part that
 * cannot be staged: it is a third party voting with money, repeatedly, and it
 * answers the "you're nineteen with a new account" objection more completely
 * than any argument could.
 *
 * The month count is derived rather than typed, for two reasons: a hardcoded
 * "ninth month" is wrong the moment it ships (January to August is eight), and
 * it silently rots afterwards. Note the one caveat — pages are statically
 * generated, so the number is fixed at build time and steps forward on the next
 * deploy, not on the first of the month.
 */
export const RETAINER = {
  /** Month is 0-indexed: 0 = January. */
  since: new Date(2026, 0, 1),
  sinceLabel: "January",
  monthly: 600,
  currency: "CAD",
} as const;

const ORDINALS = [
  "first", "second", "third", "fourth", "fifth", "sixth",
  "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth",
];

/** Inclusive: the month work started counts as month one. */
export function monthsRetained(now: Date = new Date()) {
  const { since } = RETAINER;
  return (
    (now.getFullYear() - since.getFullYear()) * 12 +
    (now.getMonth() - since.getMonth()) +
    1
  );
}

/** "eighth" for 8, falling back to "8th" past twelve. */
export function retainedOrdinal(now: Date = new Date()) {
  const n = monthsRetained(now);
  return ORDINALS[n - 1] ?? `${n}th`;
}

/** The compact badge used on the card, the case page and the case block. */
export const RETAINER_BADGE = `current client · since ${RETAINER.sinceLabel.toLowerCase()}`;

/** One sentence of proof, for the fold and for metadata. */
export function retainerLine(now: Date = new Date()) {
  return `Running content for a GTA bridal shop since ${RETAINER.sinceLabel} — ${retainedOrdinal(now)} month, $${RETAINER.monthly}/month.`;
}

/**
 * Paths the entry gate must never cover.
 *
 * The gate is a full-screen "tap to enter" overlay, which is the wrong thing to
 * put in front of a privacy policy: the URL is handed to Meta for ad review and
 * printed on lead forms, and a reviewer opening it needs the policy, not a door.
 * Declared here rather than inline because two places consume it — the inline
 * script in the document head and the gate component itself — and they cannot
 * be allowed to disagree.
 */
export const UNGATED_PATHS = ["/privacy-policy"] as const;

/** Trailing slashes are normalised so "/privacy-policy/" is ungated too. */
export function isUngated(pathname: string) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return (UNGATED_PATHS as readonly string[]).includes(clean);
}
