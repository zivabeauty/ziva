import type { Metadata } from "next";

const TITLE = "Beauty Products Online | Shop Skincare, Makeup & Hair Care | Ziva Beauty";
const DESCRIPTION =
  "Shop beauty products online at Ziva Beauty. Browse skincare, makeup, hair care and beauty essentials designed for your everyday routine.";

// Metadata lives in this server layout because the /products page is a Client Component.
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
    images: [{ url: "/ziva5.webp", width: 1200, height: 630, alt: "Shop Beauty Products at Ziva Beauty" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ZivaBeauty",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/ziva5.webp"],
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
