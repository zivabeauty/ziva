"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import type { Product } from "@/data/beautyData";
import ProductCard from "@/components/ProductCard";

interface ProductGridProps {
  products: Product[];
  wishlistIds: Set<number>;
  onToggleWishlist: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onReset?: () => void;
  className?: string;
}

/** Responsive product grid (2 → 3 → 4 columns) with a soft entrance and empty state. */
export default function ProductGrid({
  products,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onReset,
  className = "grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-3 xl:grid-cols-4",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-2xl border border-dashed border-stone-200 bg-cream py-20 text-center">
        <SlidersHorizontal className="h-8 w-8 text-stone-400" />
        <h3 className="text-base font-bold text-ink">No Matching Products</h3>
        <p className="max-w-xs text-xs font-medium leading-relaxed text-stone-500">
          We couldn&apos;t find anything for those filters. Try broadening your selection.
        </p>
        {onReset && (
          <button
            onClick={onReset}
            className="mt-1 rounded-full bg-ink px-6 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-gold hover:text-ink"
          >
            Reset Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.04, ease: [0.16, 1, 0.3, 1] }}
        >
          <ProductCard
            product={product}
            isWishlisted={wishlistIds.has(product.id)}
            onToggleWishlist={onToggleWishlist}
            onQuickView={onQuickView}
            priority={i < 4}
          />
        </motion.div>
      ))}
    </div>
  );
}
