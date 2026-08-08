import type { Metadata, Viewport } from "next";
import { Archivo, DM_Mono, Instrument_Serif } from "next/font/google";
import ContactProvider from "@/components/ContactProvider";
import DotsMenu from "@/components/DotsMenu";
import Footer from "@/components/Footer";
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

export const metadata: Metadata = {
  title: "Joseph The Great — Be unique.",
  description:
    "Marketing and social media out of Toronto. Surreal content that stops a thumb. $700–$1,000 CAD, hard ceiling.",
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
      </body>
    </html>
  );
}
