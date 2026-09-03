/**
 * A thin strip of the wrong thing, between two sections of the right thing.
 *
 * The commercial sections of this page are, correctly, rectangles containing
 * arguments. A stack of them is also what every other studio in this category
 * looks like, and the brief's complaint was exactly that — clean, and therefore
 * anonymous. These bands are the interruption: label-voice fragments from a
 * product that does not exist, running past at a readable speed.
 *
 * Costs about 70px of scroll height. That budget matters — the whole point of
 * the last rebuild was that this page was too long, and personality that is
 * paid for in extra screens is not free. Nothing here has to be read for the
 * page to sell anything, so nothing here is allowed to take up room.
 *
 * The marquee is one CSS translate on a duplicated row, which the compositor
 * handles on its own thread; it is switched off entirely by the reduced-motion
 * block in globals.css, where the strip degrades to a static row of the same
 * words.
 */

import DriftingJar from "./DriftingJar";

const LINES = [
  "product of Ontario",
  "contains no agency",
  "single batch — N°01",
  "best before the trend ends",
  "not suitable for brand guidelines",
  "made in a small room in Toronto",
  "no team, no retainer trap",
  "shake before viewing",
];

export default function Interlude({
  tone = "void",
  jar = false,
}: {
  tone?: "void" | "cream";
  /**
   * Gives the band enough height for the jar to drift through it. Used once,
   * deliberately: a signature object that appears on every break is a pattern,
   * and a pattern is not a surprise.
   */
  jar?: boolean;
}) {
  const dark = tone === "void";

  return (
    <div
      className={`scanlines relative overflow-hidden border-y ${
        jar ? "flex h-[16rem] items-end pb-4 md:h-[19rem]" : "py-4"
      } ${dark ? "border-neon/15 bg-void-2 text-neon/70" : "border-ink/15 bg-cream text-syrup"}`}
    >
      {jar && (
        <DriftingJar
          side="right"
          drift={70}
          tilt={-9}
          className="w-[30vw] max-w-[11rem] md:max-w-[13rem]"
        />
      )}

      <div className="marquee-track relative z-10" aria-hidden>
        {/* rendered twice: the track translates exactly -50%, so the second
            copy is what is on screen when the first has finished leaving */}
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {LINES.map((line) => (
              <span key={line} className="t-mono flex items-center whitespace-nowrap">
                {line}
                <span className="mx-6 opacity-40">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
