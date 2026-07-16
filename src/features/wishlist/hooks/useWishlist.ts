"use client";

import { useWishlistStore } from "@/features/wishlist/store/wishlist.store";
import type { Product } from "@/data/beautyData";

export function useWishlist() {
  const items = useWishlistStore((s) => s.items);
  const toggle = useWishlistStore((s) => s.toggle);
  const remove = useWishlistStore((s) => s.remove);
  const has = useWishlistStore((s) => s.has);

  const toggleProduct = (product: Product) =>
    toggle({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
    });

  const wishlistIds = new Set(items.map((i) => i.id));

  const toggleWishlist = toggleProduct;
  const isWishlisted = (id: number) => wishlistIds.has(id);

  return {
    items,
    wishlistIds,
    toggleProduct,
    toggleWishlist,
    remove,
    isWishlisted,
    has,
  };
}
