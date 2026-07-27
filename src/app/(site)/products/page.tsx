import { getCatalogProducts } from "@/lib/server/products";
import { products as staticProducts } from "@/data/beautyData";
import ProductsClient from "@/components/ProductsClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.zivabeauty.co.in";

export default async function ProductsPage() {
  const dbProducts = await getCatalogProducts();
  const initialProducts = dbProducts.length > 0 ? dbProducts : staticProducts;

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: initialProducts.length,
    itemListElement: initialProducts.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: p.name,
      url: `${SITE_URL}/product/${p.id}`,
      image: p.image.startsWith("http") ? p.image : `${SITE_URL}${p.image}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <ProductsClient initialProducts={initialProducts} />
    </>
  );
}
