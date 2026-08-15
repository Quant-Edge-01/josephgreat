"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import Script from "next/script";
import { useEffect } from "react";
import { track } from "@/lib/track";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * Pixel + page analytics, plus one delegated listener that reports outbound
 * contact clicks. Delegation rather than a wrapper component so the existing
 * mailto/Instagram links in Pricing, ContactProvider, WorkCta, DotsMenu and
 * Footer keep working untouched — there is no single link component to hook.
 */
export default function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const a = el?.closest?.("a");
      const href = a?.getAttribute("href");
      if (!href) return;
      // no personal data in the params — just which door they took
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
      {PIXEL_ID && (
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
