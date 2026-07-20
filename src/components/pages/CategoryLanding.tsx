"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/beautyData";
import type { CategoryPageConfig } from "@/data/pageContent";
import { useProducts } from "@/lib/useProducts";
import { useWishlist } from "@/lib/useWishlist";
import { matchesCategory, sortProducts } from "@/lib/product-utils";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductGrid from "@/components/shop/ProductGrid";
import QuickView from "@/components/QuickView";
import CtaBanner from "@/components/CtaBanner";
import Magnetic from "@/components/Magnetic";

interface CategoryLandingProps {
  config: CategoryPageConfig;
}

export default function CategoryLanding({ config }: CategoryLandingProps) {
  const { products } = useProducts();
  const { wishlistIds, toggleWishlist, isWishlisted } = useWishlist();
  const [quickView, setQuickView] = useState<Product | null>(null);

  const categoryProducts = useMemo(
    () => sortProducts(products.filter((p) => matchesCategory(p, config.category)), "featured"),
    [products, config.category]
  );

  return (
    <div className="min-h-screen bg-background font-sans text-ink">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-stone-150 bg-porcelain/60">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24 lg:px-8">
          <div className="text-center lg:text-left">
            <span className="eyebrow mb-4">{config.eyebrow}</span>
            <h1 className="display-xl text-4xl text-ink sm:text-6xl">
              {config.title}{" "}
              <span className="candy-gradient-text">{config.titleAccent}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-md text-sm font-light leading-relaxed text-stone-500 lg:mx-0">
              {config.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Magnetic>
                <a href="#products" className="btn-luxe">
                  <span>Shop {config.category}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Magnetic>
              <Link
                href={`/products?category=${encodeURIComponent(config.category)}`}
                className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:border-gold hover:text-gold-deep"
              >
                Full Catalog
              </Link>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none">
            <div className="absolute inset-4 rounded-[28px] border border-gold/20" />
            <img
              src={config.heroImage}
              alt={config.title}
              className="relative z-10 h-full w-full rounded-[28px] object-cover shadow-[0_24px_60px_rgba(10,10,10,0.12)]"
            />
          </div>
        </div>
      </header>


      <section id="products" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Shop The Collection"
          title={
            <>
              {config.category} <span className="candy-gradient-text">Products</span>
            </>
          }
          subtitle={`${categoryProducts.length} formula${categoryProducts.length === 1 ? "" : "s"} in this collection.`}
          className="mb-12"
        />
        <ProductGrid
          products={categoryProducts}
          wishlistIds={wishlistIds}
          onToggleWishlist={toggleWishlist}
          onQuickView={setQuickView}
          className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4"
        />
        {categoryProducts.length === 0 && (
          <p className="text-center text-sm text-stone-500">
            New arrivals coming soon.{" "}
            <Link href="/products" className="font-bold text-gold-deep hover:underline">
              Browse all products
            </Link>
          </p>
        )}
      </section>

      {/* Editorial */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="The Edit"
              title={config.editorialTitle}
              className="mb-0"
            />
          </div>
          <p className="text-sm font-medium leading-relaxed text-ink/60 lg:col-span-7 lg:pt-10">
            {config.editorialBody}
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-y border-stone-100 bg-white py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
          {config.highlights.map((h) => (
            <div key={h.title} className="group flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-porcelain text-gold transition-transform duration-300 group-hover:-translate-y-1">
                <h.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ink">{h.title}</h3>
              <p className="text-xs font-medium leading-relaxed text-ink/55">{h.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ritual steps */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Your Ritual"
          title={
            <>
              The 4-Step <span className="candy-gradient-text">Ceremony</span>
            </>
          }
          subtitle={`A curated routine to get the most from your ${config.category.toLowerCase()} collection.`}
          className="mb-14"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {config.ritualSteps.map((s) => (
            <div
              key={s.step}
              className="card-luxe rounded-[4px] p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="text-[10px] font-bold tracking-[0.3em] text-gold">{s.step}</span>
              <h3 className="mt-3 font-serif text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-xs font-medium leading-relaxed text-ink/55">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
    

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <CtaBanner
          eyebrow="Discover More"
          title={config.ctaTitle}
          description={config.ctaDescription}
          ctaLabel={`View All ${config.category}`}
          ctaHref={`/products?category=${encodeURIComponent(config.category)}`}
          image={config.heroImage}
          imageAlt={config.title}
        />
      </section>

      <QuickView
        product={quickView}
        onClose={() => setQuickView(null)}
        isWishlisted={quickView ? isWishlisted(quickView.id) : false}
        onToggleWishlist={toggleWishlist}
      />
    </div>
  );
}
