// PLACEHOLDERS — swap for the real handles before deploy.
export const EMAIL = "hey@josephthegreat.com";
export const IG_HANDLE = "@josephthegreat";
export const IG_URL = "https://instagram.com/josephthegreat";

export const PRICE_FLOOR = 700;
export const PRICE_CEILING = 1000;

export const mailto = (subject = "Project") =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;
