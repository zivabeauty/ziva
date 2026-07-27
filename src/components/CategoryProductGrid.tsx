"use client";

import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/lib/useProducts";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";
import { matchesCategory } from "@/lib/product-utils";
import { products as staticProducts, type Product } from "@/data/beautyData";

/** Category products rendered with the storefront's standard ProductCard. */
export default function CategoryProductGrid({
  category,
  initialProducts,
}: {
  category: string;
  initialProducts?: Product[];
}) {
  const { products: fetchedProducts } = useProducts();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const productSource =
    fetchedProducts.length > 0
      ? fetchedProducts
      : initialProducts && initialProducts.length > 0
      ? initialProducts
      : staticProducts;

  const items = productSource.filter((p) => matchesCategory(p, category));

  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isWishlisted={isWishlisted(product.id)}
          onToggleWishlist={toggleWishlist}
        />
      ))}
    </div>
  );
}
