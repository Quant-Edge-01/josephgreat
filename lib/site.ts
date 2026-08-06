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

export const mailto = (subject = "Project") =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;
