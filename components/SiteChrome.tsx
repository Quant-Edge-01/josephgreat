"use client";

import dynamic from "next/dynamic";
import Footer from "./Footer";

/**
 * Site navigation and footer.
 *
 * This used to suppress both on /hire, a stripped landing page for paid
 * traffic. That page is gone — once the offer grew to include the website, the
 * strongest thing on the site became "you're reading one of the websites", and
 * /hire was the plainest page on the domain. Paid clicks now land on the full
 * home page, where the design is itself part of the argument, and the menu and
 * footer are no longer distractions to hide: the gallery and the price are the
 * evidence.
 *
 * The menu is still loaded on demand rather than imported statically. It pulls
 * in Framer Motion, and deferring it is most of why the shared bundle dropped
 * from 183 kB to 131 kB. `ssr: false` costs a beat before the button appears,
 * which is fine for a fixed control that needs hydration to do anything.
 */
const DotsMenu = dynamic(() => import("./DotsMenu"), { ssr: false });

export function SiteNav() {
  return <DotsMenu />;
}

export function SiteFooter() {
  return <Footer />;
}
