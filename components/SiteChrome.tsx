"use client";

import { usePathname } from "next/navigation";
import DotsMenu from "./DotsMenu";
import Footer from "./Footer";

/**
 * Routes that get no site navigation and no site footer.
 *
 * /hire is a paid-traffic landing page: every link that isn't the form is a
 * way for someone who cost money to arrive to leave without converting. The
 * page keeps its own minimal footer so it still says who and where.
 *
 * The home page keeps the full menu on purpose. Its visitors are warm — bio
 * link, a share, someone who came back — and for them the gallery and the
 * price are the reason to stay.
 */
const BARE_ROUTES = new Set(["/hire"]);

function isBare(pathname: string | null) {
  if (!pathname) return false;
  // tolerate a trailing slash so /hire/ behaves like /hire
  return BARE_ROUTES.has(pathname.replace(/\/+$/, "") || "/");
}

export function SiteNav() {
  const pathname = usePathname();
  return isBare(pathname) ? null : <DotsMenu />;
}

export function SiteFooter() {
  const pathname = usePathname();
  return isBare(pathname) ? null : <Footer />;
}
