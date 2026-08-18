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
  cta: "Send me your Instagram",
  /** The full promise. */
  line: "Send me your Instagram. I'll tell you the first three things I'd change — free, and you're welcome to go do them yourself.",
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
