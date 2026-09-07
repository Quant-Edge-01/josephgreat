"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { track } from "@/lib/track";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * Pixel + page analytics.
 *
 * PageView is the fiddly one. The inline snippet fires it once per *document*
 * load. App Router navigations never re-run that script, so without help every
 * route after the first is invisible; with naive help, the landing route gets
 * counted twice. The fix is to seed the last-seen path from the first render
 * and only fire on an actual change of path.
 *
 * The delegated click listener stays delegated on purpose: the mailto and
 * Instagram links are scattered across Pricing, ContactProvider, WorkCta,
 * DotsMenu, Footer and the form's failure state, and there is no single link
 * component to hook.
 */
export default function Analytics() {
  const pathname = usePathname();
  /**
   * Seeded, not empty. On first render this is the path the snippet already
   * reported, so the effect below correctly does nothing for it.
   */
  const lastPath = useRef<string | null>(pathname);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    track("PageView");
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const a = el?.closest?.("a");
      const href = a?.getAttribute("href");
      if (!href) return;
      // No personal data in the params — only which door they took. Instagram
      // and email are reported separately so the two can be compared.
      if (href.startsWith("mailto:")) track("Contact", { method: "email" });
      else if (href.includes("instagram.com")) track("Contact", { method: "instagram" });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return (
    <>
      <VercelAnalytics />

      {/* absent pixel id renders nothing at all, rather than a broken snippet */}
      {PIXEL_ID && /^(?!0+$)\d+$/.test(PIXEL_ID) && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
