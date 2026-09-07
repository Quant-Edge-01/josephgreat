import Link from "next/link";
import { IG_HANDLE, IG_URL } from "@/lib/site";

export default function Footer() {
  /*
    Bottom padding is larger than the top on purpose. The sound control is fixed
    to the bottom-right corner, and this footer's contact column is right-aligned
    from md up — so without clearance the control lands on top of the last link
    in that column, which is now the privacy link.
  */
  return (
    <footer
      data-nav-dark
      className="bg-void px-6 pb-24 pt-10 md:px-10 md:pb-24 md:pt-14"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <p className="t-serif text-[clamp(2rem,9vw,4.5rem)] leading-none text-cream">
          Be unique<span className="text-gold">.</span>
        </p>
        <div className="t-mono flex flex-col gap-1.5 text-cream/70 md:text-right">
          <span>Joseph The Great · Toronto, ON</span>
          <a className="underline-swipe w-fit text-cream md:ml-auto" href={IG_URL}>
            {IG_HANDLE}
          </a>
          <span>© {new Date().getFullYear()} — built solo</span>
          {/* Deliberately the quietest thing in the footer: it has to be
              findable from every page and on the lead form, without competing
              with the contact links above it. */}
          <Link
            className="underline-swipe w-fit text-cream/55 md:ml-auto"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
