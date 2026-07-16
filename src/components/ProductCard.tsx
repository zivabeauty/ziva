"use client";

import Link from "next/link";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/beautyData";
import {
  addToCart,
  discountPercent,
  reviewCount,
  inStock,
} from "@/lib/product-utils";
import Rating from "@/components/ui/Rating";
import Price from "@/components/ui/Price";

interface ProductCardProps {
  product: Product;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  /** Reveal-on-scroll index for staggered entrance (optional). */
  priority?: boolean;
}

/**
 * The storefront's premium product card — used on the home Featured rail
 * and across the /products grid. Hover swaps to a secondary image, reveals
 * quick actions, and lifts the card via the shared `.card-luxe` treatment.
 */
export default function ProductCard({
  product,
  isWishlisted = false,
  onToggleWishlist,
  onQuickView,
  priority = false,
}: ProductCardProps) {
  const pct = discountPercent(product);
  const available = inStock(product);
  const reviews = reviewCount(product);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden card-luxe rounded-[4px]">
      {/* ─── Image ─── */}
      <Link
        href={`/product/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-porcelain"
        aria-label={product.name}
      >
        <img
          src={product.image}
          alt={product.name}
          loading={priority ? "eager" : "lazy"}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
        />
        <img
          src={product.hoverImage || product.image}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 inline-flex items-center bg-cream/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-ink shadow-sm backdrop-blur-sm">
            {product.badge}
          </span>
        )}

        {/* Discount */}
        {pct > 0 && (
          <span className="absolute right-3 top-3 z-10 bg-ink px-2 py-1 text-[10px] font-bold tracking-wide text-cream shadow-sm">
            −{pct}%
          </span>
        )}

        {/* Out of stock veil */}
        {!available && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-cream/70 backdrop-blur-[1px]">
            <span className="border border-ink/20 bg-cream px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
              Sold Out
            </span>
          </div>
        )}
      </Link>

      {/* Hover quick-actions */}
      <div className="pointer-events-none absolute right-3 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2 opacity-0 transition-all duration-500 group-hover:pointer-events-auto group-hover:opacity-100">
        <button
          onClick={() => onToggleWishlist?.(product)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="flex h-9 w-9 items-center justify-center bg-cream/95 shadow-md transition-transform hover:scale-110"
        >
          <Heart className={`h-3.5 w-3.5 ${isWishlisted ? "fill-gold text-gold" : "text-stone-500"}`} />
        </button>
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            aria-label="Quick view"
            className="flex h-9 w-9 items-center justify-center bg-cream/95 shadow-md transition-transform hover:scale-110"
          >
            <Eye className="h-3.5 w-3.5 text-stone-500" />
          </button>
        )}
      </div>

      {/* ─── Details ─── */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-gold-deep">
          {product.category}
        </span>

        <Link
          href={`/product/${product.id}`}
          className="line-clamp-2 text-sm font-semibold leading-snug text-ink transition-colors hover:text-gold-deep"
        >
          {product.name}
        </Link>

        <Rating value={product.rating} reviews={reviews} className="mt-0.5" />

        <div className="mt-auto flex flex-col gap-2.5 border-t border-stone-100 pt-3">
          <Price price={product.price} oldPrice={product.oldPrice} size="md" />
          <button
            onClick={() => available && addToCart(product, product.sizes?.[0] || "Standard")}
            disabled={!available}
            className="flex w-full items-center justify-center gap-2 border border-ink bg-transparent py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-ink hover:text-cream disabled:cursor-not-allowed disabled:border-stone-200 disabled:text-stone-300 disabled:hover:bg-transparent"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            {available ? "Add To Bag" : "Sold Out"}
          </button>
        </div>
      </div>
    </div>
  );
}
