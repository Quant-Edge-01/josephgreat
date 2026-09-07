import Link from "next/link";

/**
 * The way out. Deliberately a slab and not an icon: someone who has scrolled
 * through 500vh of jar and landed on a black page needs an exit they cannot
 * miss or misread, so it says where it goes in words and stays pinned there.
 * Amber, because the page it returns you to is the inside of the jar.
 */
export default function BackToSyrup() {
  return (
    // right inset keeps a dark backdrop under the fixed dots menu — cream dots
    // on this amber measure about 1.6:1
    <div className="relative px-6 pt-24 md:px-10">
      <Link
        href="/#work"
        className="group relative inline-flex min-h-11 items-center gap-4 bg-[#e2a339] px-5 py-3 text-ink transition-colors duration-300 hover:bg-neon"
      >
        <span
          aria-hidden
          className="t-grotesk shrink-0 text-[clamp(1.6rem,6vw,2.6rem)] leading-none transition-transform duration-500 group-hover:-translate-x-2"
        >
          ←
        </span>
        <span className="min-w-0">
          <span className="s-mid t-grotesk block leading-none">Back into the syrup</span>
          <span className="t-mono mt-1.5 block text-syrup-deep">
            return to the portfolio
          </span>
        </span>

        {/* drips off the bottom edge — the slab is a spill, not a toolbar */}
        <span aria-hidden className="pointer-events-none absolute inset-x-0 top-full h-6">
          <span className="absolute left-[14%] top-0 h-4 w-3 rounded-b-full bg-[#e2a339] transition-colors duration-300 group-hover:bg-neon" />
          <span className="absolute left-[38%] top-0 h-6 w-2 rounded-b-full bg-[#e2a339] transition-colors duration-300 group-hover:bg-neon" />
          <span className="absolute right-[22%] top-0 h-3 w-4 rounded-b-full bg-[#e2a339] transition-colors duration-300 group-hover:bg-neon" />
        </span>
      </Link>
    </div>
  );
}
