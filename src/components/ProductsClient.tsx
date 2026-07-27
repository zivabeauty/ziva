"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ChevronDown, X } from "lucide-react";
import type { Product } from "@/data/beautyData";
import { useProducts } from "@/lib/useProducts";
import { useWishlist } from "@/lib/useWishlist";
import {
  buildFacets,
  defaultFilters,
  filterProducts,
  sortProducts,
  countActiveFilters,
  matchesCategory,
  SORT_LABELS,
  type ProductFilters,
  type SortOption,
} from "@/lib/product-utils";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductGrid from "@/components/shop/ProductGrid";
import QuickView from "@/components/QuickView";

const SORT_OPTIONS = Object.keys(SORT_LABELS) as SortOption[];

interface Props {
  initialProducts: Product[];
}

export default function ProductsClient({ initialProducts }: Props) {
  const { products: fetchedProducts, loading: listLoading } = useProducts();
  const { wishlistIds, toggleWishlist, isWishlisted } = useWishlist();

  const products = fetchedProducts.length > 0 ? fetchedProducts : initialProducts;
  const loading = listLoading && products.length === 0;

  const facets = useMemo(() => buildFacets(products), [products]);

  const [filters, setFilters] = useState<ProductFilters>(() =>
    defaultFilters(buildFacets(initialProducts))
  );
  const [sort, setSort] = useState<SortOption>("featured");
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const priceTouched = useRef(false);
  const prevBounds = useRef<[number, number]>([facets.priceMin, facets.priceMax]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    const q = params.get("q");
    setFilters((f) => {
      const next = { ...f };
      if (cat && cat.toLowerCase() !== "all") {
        const matched = facets.categories.find((c) => matchesCategory({ category: c }, cat));
        if (matched) next.categories = [matched];
      }
      if (q) next.search = q;
      return next;
    });
  }, [facets.categories]);

  useEffect(() => {
    const [pMin, pMax] = prevBounds.current;
    if ((facets.priceMin !== pMin || facets.priceMax !== pMax) && !priceTouched.current) {
      setFilters((f) => ({ ...f, priceRange: [facets.priceMin, facets.priceMax] }));
      prevBounds.current = [facets.priceMin, facets.priceMax];
    }
  }, [facets]);

  const results = useMemo(
    () => sortProducts(filterProducts(products, filters), sort),
    [products, filters, sort]
  );

  const activeCount = countActiveFilters(filters, facets);

  const patch = (p: Partial<ProductFilters>) => {
    if (p.priceRange) priceTouched.current = true;
    setFilters((f) => ({ ...f, ...p }));
  };
  const clearAll = () => {
    priceTouched.current = false;
    setFilters(defaultFilters(facets));
  };

  return (
    <div className="min-h-screen bg-background font-sans text-ink">
      <header className="border-b border-stone-150 bg-porcelain/60">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8 lg:py-16">
          <span className="eyebrow eyebrow-center mb-4">The Full Maison</span>
          <h1 className="display-xl text-4xl text-ink sm:text-6xl">
            All <span className="candy-gradient-text">Products</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-stone-500">
            Explore the complete Ziva collection — dermatologist-tested rituals crafted with
            botanically active, gold-standard formulas.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => patch({ search: e.target.value })}
              placeholder="Search products, ingredients, concerns…"
              className="w-full rounded-full border border-stone-200 bg-white py-3 pl-11 pr-10 text-xs font-medium text-ink shadow-inner transition-colors focus:border-gold focus:outline-none"
            />
            {filters.search && (
              <button
                onClick={() => patch({ search: "" })}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-stone-500">
              <span className="text-ink">{results.length}</span> item{results.length === 1 ? "" : "s"}
            </span>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 text-[9px] font-bold uppercase tracking-widest text-stone-400 sm:block">
                Sort
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="cursor-pointer appearance-none rounded-full border border-stone-200 bg-white py-2.5 pl-4 pr-9 text-xs font-bold text-ink focus:border-gold focus:outline-none sm:pl-12"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {SORT_LABELS[o]}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-500" />
            </div>
          </div>
        </div>

        <div className="flex items-start gap-10">
          <aside className="sticky top-[150px] hidden w-[248px] shrink-0 lg:block">
            <FilterSidebar
              facets={facets}
              filters={filters}
              onChange={patch}
              onClear={clearAll}
              activeCount={activeCount}
            />
          </aside>

          <div className="flex-1">
            {loading ? (
              <div className="flex min-h-[40vh] items-center justify-center text-xs uppercase tracking-widest text-stone-400">
                Loading products…
              </div>
            ) : (
              <ProductGrid
                products={results}
                wishlistIds={wishlistIds}
                onToggleWishlist={toggleWishlist}
                onQuickView={setQuickView}
                onReset={clearAll}
              />
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-stone-200 bg-white px-7 py-3.5 text-[11px] font-bold uppercase tracking-wider text-ink shadow-xl lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4 text-gold-deep" />
        Filters
        {activeCount > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[9px] text-cream">
            {activeCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 bg-ink"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.45 }}
              className="absolute inset-y-0 left-0 flex w-[86%] max-w-[340px] flex-col bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-ink">Filters</h3>
                <button onClick={() => setDrawerOpen(false)} className="text-stone-400 hover:text-black">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6">
                <FilterSidebar
                  facets={facets}
                  filters={filters}
                  onChange={patch}
                  onClear={clearAll}
                  activeCount={activeCount}
                />
              </div>
              <div className="border-t border-stone-100 p-4">
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-full rounded-full bg-ink py-3.5 text-[11px] font-bold uppercase tracking-widest text-cream transition-colors hover:bg-gold hover:text-ink"
                >
                  Show {results.length} Result{results.length === 1 ? "" : "s"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <QuickView
        product={quickView}
        onClose={() => setQuickView(null)}
        isWishlisted={quickView ? isWishlisted(quickView.id) : false}
        onToggleWishlist={toggleWishlist}
      />
    </div>
  );
}
