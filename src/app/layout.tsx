import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  Instrument_Serif,
  Josefin_Sans,
  Lora,
  Nunito,
  Oswald,
  Playfair_Display,
  Quicksand,
} from "next/font/google";
import Script from "next/script";
import { themeInitScript } from "@/lib/theme-script";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600"],
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  display: "swap",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: ["400"],
  display: "swap",
});

const fontVars = [
  oswald.variable,
  quicksand.variable,
  cormorant.variable,
  josefin.variable,
  nunito.variable,
  playfair.variable,
  lora.variable,
  dmSans.variable,
  instrument.variable,
].join(" ");

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nanaicare.com"),
  title: {
    default: "NanaiCare | Beauty Salon & Facial Wellness in Amsterdam",
    template: "%s · NanaiCare",
  },
  authors: [{ name: "Daniel Garcia Rojas (dgrcodex)", url: "https://dgrcodex.me" }],
  creator: "Sambalab (sambalab.pro)",
  publisher: "NanaiCare",
  keywords: [
    "NanaiCare", 
    "beauty salon amsterdam", 
    "facial wellness", 
    "skincare amsterdam", 
    "masaje facial amsterdam", 
    "skincare studio", 
    "sambalab", 
    "sambalab.pro"
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVars} h-full scroll-smooth`} suppressHydrationWarning>
      <head>
        <Script id="nanaicare-theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body className="font-body min-h-dvh bg-nanai-canvas text-nanai-ink antialiased">{children}</body>
    </html>
  );
}
