import type { Metadata } from "next";
import { Oswald, Quicksand } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://nanaicare.example"),
  title: {
    default: "NanaiCare",
    template: "%s · NanaiCare",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${quicksand.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="font-body min-h-dvh bg-nanai-canvas text-nanai-ink antialiased">
        {children}
      </body>
    </html>
  );
}
