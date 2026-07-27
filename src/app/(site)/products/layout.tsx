import type { Metadata } from "next";

const TITLE = "Shop Beauty Products Online | Skincare, Makeup & Hair Care | Ziva Beauty";
const DESCRIPTION =
  "Explore the full collection of Ziva Beauty products online. High-performance skincare, hair care, makeup, and beauty essentials formulated for glowing, healthy skin.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/products" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Ziva Beauty",
    url: "/products",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-home.webp", width: 1200, height: 630, alt: "Ziva Beauty Products Catalog" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ZivaBeauty",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-home.webp"],
  },
  robots: { index: true, follow: true },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
