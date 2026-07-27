import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zivabeauty.co.in";

const HOME_TITLE = "Beauty Products Online | Shop Skincare, Makeup & Hair Care | Ziva Beauty";
const HOME_DESCRIPTION =
  "Shop beauty products online at Ziva Beauty. Explore skincare, makeup, hair care, and beauty essentials for your everyday routine. Find products designed to help you look and feel your best every day.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: "%s — Ziva Beauty",
  },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/Logo.webp", type: "image/webp" }],
    shortcut: "/Logo.webp",
    apple: "/Logo.webp",
  },
  verification: {
    google: "bhd_G7-vh7_ZaWxpWoi70vnTGzIAN7xDX6-PlgDju9M",
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    siteName: "Ziva Beauty",
    url: "/",
    type: "website",
    locale: "en_IN",
    images: [
      { url: "/og-home.webp", width: 1200, height: 630, alt: "Ziva Beauty - Beauty Products Online" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ZivaBeauty",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/og-home.webp"],
  },
  robots: { index: true, follow: true },
};

// Site-wide structured data (Organization + WebSite for sitelinks search box).
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ziva Beauty",
  alternateName: "Ziva Beauty India",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/ziva_beauty_logo.webp`,
  description:
    "Ziva Beauty is an online beauty brand offering skincare, hair care, makeup and beauty essentials for everyday routines.",
  sameAs: [
    "https://www.instagram.com/zivabeauty__cosmetics/",
    "https://pin.it/kdY5smgIr",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ziva Beauty",
  url: `${SITE_URL}/`,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q1HW1PFBK3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-Q1HW1PFBK3');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
