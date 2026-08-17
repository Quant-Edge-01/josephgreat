/**
 * The bottom edge of a syrup-coloured section, running before it sets.
 *
 * Pass 3 of the rebuild was a brand check: had the site quietly turned into a
 * competent agency landing page? Mostly no — the lockup, the jar, the folders,
 * the grain and the HUD all survived — but the sections added for clarity
 * (process, objections, the ledger) were arriving as tidy rectangles, and a
 * stack of tidy rectangles is exactly what everything else in this category
 * looks like.
 *
 * So the amber slabs no longer end. They drip into whatever is underneath,
 * which is the one metaphor the whole site is built on. Purely decorative,
 * `aria-hidden`, no layout cost (absolutely positioned, parent is relative),
 * and it cannot interfere with reading or tapping anything.
 *
 * Drip geometry is hand-set rather than random: a random row reads as noise,
 * and these are meant to look poured.
 */

const DRIPS = [
  { left: "4%", w: 14, h: 26 },
  { left: "11%", w: 8, h: 44 },
  { left: "19%", w: 20, h: 16 },
  { left: "27%", w: 10, h: 58 },
  { left: "36%", w: 16, h: 30 },
  { left: "44%", w: 7, h: 22 },
  { left: "52%", w: 22, h: 48 },
  { left: "61%", w: 11, h: 18 },
  { left: "68%", w: 15, h: 38 },
  { left: "77%", w: 9, h: 62 },
  { left: "84%", w: 18, h: 24 },
  { left: "92%", w: 12, h: 40 },
];

export default function SyrupEdge({ colour = "#e2a339" }: { colour?: string }) {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-x-0 top-full block h-16">
      {DRIPS.map((d) => (
        <span
          key={d.left}
          className="absolute top-0 rounded-b-full"
          style={{ left: d.left, width: d.w, height: d.h, background: colour }}
        />
      ))}
    </span>
  );
}
