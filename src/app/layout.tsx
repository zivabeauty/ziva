import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AppProviders } from "@/providers/AppProviders";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "ZIVA — Luxury Beauty, Skincare & Makeup",
    template: "%s — ZIVA",
  },
  description:
    "Refined, clean-beauty skincare and makeup — crafted with premium botanicals and gold-standard actives for visible, lasting radiance.",
  openGraph: {
    title: "ZIVA — Luxury Beauty, Skincare & Makeup",
    description:
      "Refined, clean-beauty skincare and makeup — crafted with premium botanicals and gold-standard actives.",
    siteName: "ZIVA",
    type: "website",
    images: [{ url: "/ziva_banner.png", width: 1200, height: 630, alt: "ZIVA Beauty" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} ${playfair.variable}`}>
      <body className="min-h-full flex flex-col font-sans">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
