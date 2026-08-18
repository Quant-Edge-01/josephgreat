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
const BLURB = `Reels, the ads behind them and the website they land on, for Toronto and GTA local businesses — built to start conversations rather than collect views. ${PRICE}, and $${PRICE_CEILING.toLocaleString()} is a hard ceiling.`;

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>
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
        <div className="grain" aria-hidden />
        <Analytics />
      </body>
    </html>
  );
}
