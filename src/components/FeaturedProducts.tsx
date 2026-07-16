"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/beautyData";
import { useProducts } from "@/lib/useProducts";
import { useWishlist } from "@/lib/useWishlist";
import { isFeatured } from "@/lib/product-utils";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductGrid from "@/components/shop/ProductGrid";
import QuickView from "@/components/QuickView";
import Magnetic from "@/components/Magnetic";

const MAX_FEATURED = 8;

/**
 * Home "Featured Products" rail — a curated selection (not the whole
 * catalog) with quick view + wishlist, closing with a CTA to /products.
 */
export default function FeaturedProducts() {
  const { products } = useProducts();
  const { wishlistIds, toggleWishlist, isWishlisted } = useWishlist();
  const [quickView, setQuickView] = useState<Product | null>(null);

  const featured = useMemo(() => {
    const picks = products.filter(isFeatured);
    const list = (picks.length >= 4 ? picks : products).slice(0, MAX_FEATURED);
    return list;
  }, [products]);

  return (
    <section className="fade-in-section mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
      <SectionHeading
        index="02"
        eyebrow="Curated For You"
        title={
          <>
            Featured <span className="candy-gradient-text">Products</span>
          </>
        }
        subtitle="A handpicked edit of our most-loved rituals — bestsellers and new obsessions, chosen for visible, lasting radiance."
        className="mb-16"
      />

      <ProductGrid
        products={featured}
        wishlistIds={wishlistIds}
        onToggleWishlist={toggleWishlist}
        onQuickView={setQuickView}
        className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4"
      />

      <div className="mt-16 flex justify-center">
        <Magnetic>
          <Link href="/products" className="btn-luxe">
            <span>View All Products</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Magnetic>
      </div>

      <QuickView
        product={quickView}
        onClose={() => setQuickView(null)}
        isWishlisted={quickView ? isWishlisted(quickView.id) : false}
        onToggleWishlist={toggleWishlist}
      />
    </section>
  );
}
