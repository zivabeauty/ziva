import type { Metadata } from "next";
import { getProductById } from "@/lib/server/products";
import { products as staticProducts, type Product } from "@/data/beautyData";
import ProductDetailClient from "@/components/ProductDetailClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.zivabeauty.co.in";

interface Props {
  params: Promise<{ id: string }>;
}

async function getServerProduct(id: number): Promise<Product | null> {
  try {
    const dbProd = await getProductById(id);
    if (dbProd) return dbProd;
  } catch {
    // Ignore error and try fallback
  }
  return staticProducts.find((p) => p.id === id) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const productId = parseInt(id, 10) || 0;
  const product = await getServerProduct(productId);

  if (!product) {
    return {
      title: "Product Not Found | Ziva Beauty",
      description: "The requested beauty product could not be found.",
      robots: { index: false },
    };
  }

  const title = `${product.name} | Ziva Beauty`;
  const description =
    product.description ||
    `Shop ${product.name} online at Ziva Beauty. High quality skincare and beauty essentials.`;
  const canonicalUrl = `${SITE_URL}/product/${product.id}`;
  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `${SITE_URL}${product.image}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Ziva Beauty",
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: imageUrl,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ZivaBeauty",
      title,
      description,
      images: [imageUrl],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const productId = parseInt(id, 10) || 0;
  const product = await getServerProduct(productId);

  // Parse numeric price for schema.org
  const numericPrice = product
    ? parseFloat(product.price.replace(/[^0-9.]/g, "")) || 0
    : 0;

  const productJsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.image.startsWith("http") ? product.image : `${SITE_URL}${product.image}`,
        description: product.description,
        brand: {
          "@type": "Brand",
          name: "Ziva Beauty",
        },
        category: product.category,
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: numericPrice,
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/product/${product.id}`,
        },
        ...(product.rating
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: product.rating,
                reviewCount: product.reviews || 152,
              },
            }
          : {}),
      }
    : null;

  const breadcrumbsJsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Shop",
            item: `${SITE_URL}/products`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.category,
            item: `${SITE_URL}/products?category=${encodeURIComponent(product.category)}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: product.name,
            item: `${SITE_URL}/product/${product.id}`,
          },
        ],
      }
    : null;

  return (
    <>
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      {breadcrumbsJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
        />
      )}
      <ProductDetailClient initialProduct={product} productId={productId} />
    </>
  );
}
