"use client";

import Nav from "./Nav";
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
 * The bar is loaded on demand rather than imported statically — it needs
 * hydration to do anything anyway, and keeping it out of the initial chunk is
 * part of why the shared bundle sits at 131 kB rather than 183 kB.
 */


export function SiteNav() {
  return <Nav />;
}

export function SiteFooter() {
  return <Footer />;
}
