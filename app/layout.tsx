import type { Metadata, Viewport } from "next";
import { Archivo, DM_Mono, Instrument_Serif } from "next/font/google";
import Analytics from "@/components/Analytics";
import ContactProvider from "@/components/ContactProvider";
import DotsMenu from "@/components/DotsMenu";
import Footer from "@/components/Footer";
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
const BLURB = `Short-form marketing video for Toronto and GTA businesses. ${PRICE}, and $${PRICE_CEILING.toLocaleString()} is a hard ceiling.`;

export const metadata: Metadata = {
  // the title has to survive as a search result and a DM link preview, where
  // "Be unique." alone says nothing about what is being sold or where
  title: {
    default: `Joseph The Great — short-form video, Toronto · ${PRICE}`,
    template: "%s",
  },
  description: BLURB,
  metadataBase: new URL("https://josephthegreat.art"),
  openGraph: {
    title: `Joseph The Great — short-form video, Toronto`,
    description: BLURB,
    url: "/",
    siteName: "Joseph The Great",
    locale: "en_CA",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Joseph The Great — short-form video, Toronto", description: BLURB },
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
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>
        {/* provider lives here, not on the home page: the project routes need
            the same pricing modal behind their DM / Email buttons */}
        <ContactProvider>
          <DotsMenu />
          {children}
          <Footer />
        </ContactProvider>
        <div className="grain" aria-hidden />
        <Analytics />
      </body>
    </html>
  );
}
