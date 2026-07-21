"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight, Minus, Plus, Heart } from "lucide-react";
import type { Product } from "@/data/beautyData";
import { addToCart, inStock } from "@/lib/product-utils";
import Rating from "@/components/ui/Rating";
import Price from "@/components/ui/Price";

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

/** Lightweight product preview modal with quantity and add-to-bag. */
export default function QuickView({
  product,
  onClose,
  isWishlisted = false,
  onToggleWishlist,
}: QuickViewProps) {
  const [qty, setQty] = useState(1);

  // Reset quantity when a different product opens — the React-sanctioned
  // "adjust state during render" pattern (no cascading effect render).
  const [prevProduct, setPrevProduct] = useState(product);
  if (product !== prevProduct) {
    setPrevProduct(product);
    setQty(1);
  }

  // Close on Escape
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  const available = product ? inStock(product) : false;

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", duration: 0.45 }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden bg-white shadow-2xl md:flex-row"
          >
            <button
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute right-3 top-3 z-20 rounded-full bg-white/80 p-1.5 text-stone-400 transition-colors hover:text-black"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative aspect-square w-full bg-porcelain md:w-1/2">
              <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              {product.badge && (
                <span className="absolute left-4 top-4 bg-cream/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-ink shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>

            <div className="flex w-full flex-col overflow-y-auto p-6 md:w-1/2 sm:p-8">
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-gold-deep">
                {product.category}
              </span>
              <h2 className="mt-1.5 font-serif text-xl text-ink">{product.name}</h2>
              <Rating value={product.rating} size="md" className="mt-3" />

              <div className="mt-4 border-y border-stone-100 py-4">
                <Price price={product.price} oldPrice={product.oldPrice} size="lg" />
              </div>

              <p className="mt-4 line-clamp-4 text-xs leading-relaxed text-ink/60">
                {product.description}
              </p>

              <div className="mt-5 flex items-center gap-4">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-400">
                  Qty
                </span>
                <div className="flex items-center border border-stone-200">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-2.5 py-1.5 text-stone-500 hover:text-black"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="min-w-8 text-center text-xs font-bold text-ink">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="px-2.5 py-1.5 text-stone-500 hover:text-black"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => {
                    if (!available) return;
                    addToCart(product, qty);
                    onClose();
                  }}
                  disabled={!available}
                  className="flex flex-1 items-center justify-center gap-2 bg-ink py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-gold hover:text-ink disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  {available ? "Add To Bag" : "Sold Out"}
                </button>
                <button
                  onClick={() => onToggleWishlist?.(product)}
                  aria-label="Toggle wishlist"
                  className="flex h-[46px] w-[46px] items-center justify-center border border-stone-200 text-stone-500 transition-colors hover:border-ink hover:text-ink"
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-gold text-gold" : ""}`} />
                </button>
              </div>

              <Link
                href={`/product/${product.id}`}
                onClick={onClose}
                className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ink/60 transition-colors hover:text-gold-deep"
              >
                View Full Details <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
