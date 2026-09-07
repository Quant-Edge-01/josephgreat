import Link from "next/link";
import { IG_HANDLE, IG_URL } from "@/lib/site";

export default function Footer() {
  return (
    <footer data-nav-dark className="bg-void px-6 py-10 md:px-10 md:py-14">
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
