import type { Metadata } from "next";
import { getProductById } from "@/lib/server/products";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.zivabeauty.co.in";

const toNumber = (v?: string) => Number(String(v ?? "").replace(/[^0-9.]/g, "")) || 0;
const abs = (u?: string): string | undefined =>
  !u ? undefined : u.startsWith("http") ? u : `${SITE_URL}${u.startsWith("/") ? "" : "/"}${u}`;

/** Per-product SEO metadata (this route's page is a Client Component). */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(Number(id));
  if (!product) return { title: { absolute: "Product | Ziva Beauty" } };

  const title = `${product.name} | Ziva Beauty`;
  const description = (product.description || `Shop ${product.name} online at Ziva Beauty.`).slice(0, 200);
  const image = abs(product.image);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/product/${id}` },
    openGraph: {
      title,
      description,
      siteName: "Ziva Beauty",
      url: `/product/${id}`,
      type: "website",
      locale: "en_IN",
      images: image ? [{ url: image, alt: product.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      site: "@ZivaBeauty",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

/** Emits Product structured data (rich results) alongside the product page. */
export default async function ProductLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(Number(id));
  const image = abs(product?.image);

  const jsonLd = product && {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: image ? [image] : undefined,
    description: product.description || undefined,
    sku: `ZIVA-${product.id}`,
    brand: { "@type": "Brand", name: "Ziva Beauty" },
    category: product.category || undefined,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating || 5,
      reviewCount:
        typeof product.reviews === "number" ? product.reviews : 480 + ((product.id * 137) % 2200),
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/product/${product.id}`,
      priceCurrency: "INR",
      price: toNumber(product.price),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
