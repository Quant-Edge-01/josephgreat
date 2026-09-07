import type { Metadata, Viewport } from "next";
import { Archivo, DM_Mono, Instrument_Serif } from "next/font/google";
import Analytics from "@/components/Analytics";
import ContactProvider from "@/components/ContactProvider";

import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { PRICE_CEILING, PRICE_FLOOR } from "@/lib/site";
import "./globals.css";

const sans = Archivo({
  subsets: ["latin"],
  variable: "--ff-sans",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--ff-display",
  display: "swap",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--ff-mono",
  display: "swap",
});

const PRICE = `$${PRICE_FLOOR}–$${PRICE_CEILING.toLocaleString()} CAD`;
const BLURB = `Creative marketing in Toronto. Reels, ads and websites to make your business memorable and help attract customers. ${PRICE}/month depending on scope. Get 3 free creative ideas.`;

export const metadata: Metadata = {
  // the title has to survive as a search result and a DM link preview, where
  // "Be unique." alone says nothing about what is being sold or where
  title: {
    default: `Joseph The Great — reels, ads and websites for Toronto businesses · ${PRICE}`,
    template: "%s",
  },
  description: BLURB,
  metadataBase: new URL("https://josephthegreat.art"),
  openGraph: {
    title: "Joseph The Great — reels, ads and websites, Toronto",
    description: BLURB,
    url: "/",
    siteName: "Joseph The Great",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joseph The Great — reels, ads and websites, Toronto",
    description: BLURB,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /*
    suppressHydrationWarning sits on <html> only, and only because the inline
    script below deliberately sets data-gate on it before React hydrates. React
    compares its server markup against the live DOM and flags the attribute it
    did not write. The alternative — rendering the gate after mount — means a
    visible flash of the page the gate exists to cover. The suppression is one
    element deep and does not extend to any child.
  */
  return (
    <html
      lang="en-CA"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <body>
        {/*
          Runs during parse, before anything paints, so the gate is up on the
          first frame rather than appearing over a page the visitor has already
          started reading. It is also the entire no-JavaScript story: if this
          never executes the attribute is never set, the gate stays
          display:none, and the site behind it is simply readable.
        */}

        {/* first tab stop: the fixed dots menu is otherwise the only way past
            a full screen of poster for a keyboard user */}
        <a href="#main" className="skip-link t-mono">
          Skip to content
        </a>

        {/* provider lives here, not on the home page: the project routes need
            the same pricing modal behind their contact buttons */}
        <ContactProvider>
          <SiteNav />
          {children}
          <SiteFooter />
        </ContactProvider>
        {/* The tap that opens this is also the user gesture the browser
            requires before any audio can start — see EnterGate.tsx. */}

        <div className="grain" aria-hidden />
        <Analytics />
      </body>
    </html>
  );
}
