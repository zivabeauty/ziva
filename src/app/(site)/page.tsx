"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Hero from "@/components/Hero";
import BrandMarquee from "@/components/BrandMarquee";
import Store499 from "@/components/Store499";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import InstagramFeed from "@/components/InstagramFeed";
import { useProducts } from "@/lib/useProducts";
import { formatInr, parsePrice } from "@/lib/pricing";

const categories = [
  {
    name: "Skincare",
    href: "/skincare",
    image: "/Dtan_pack.webp",
    description:
      "Keep your skin feeling clean, fresh, and healthy with skincare products made for your everyday routine.",
    cta: "Explore Skincare",
  },
  {
    name: "Makeup",
    href: "/makeup",
    image: "/foundation01.webp",
    description:
      "Whether you love a no-makeup look or enjoy getting glam, our makeup products are made to help you feel confident every time you wear them.",
    cta: "Shop Makeup",
  },
  {
    name: "Hair Care",
    href: "/hair-care",
    image: "/keratin_mask.webp",
    description:
      "Healthy, soft hair starts with simple care. Our hair care products help keep your hair smooth, fresh, and easy to manage.",
    cta: "Explore Hair Care",
  },
  {
    name: "Beauty Kits",
    href: "/skincare",
    image: "/Shampoo and Mask.webp",
    description:
      "Your favourite beauty essentials, all in one place. Perfect for gifting, travelling, or making your everyday routine a little easier.",
    cta: "Shop Beauty Kits",
  },
];

const favourites = [
  { id: 4, name: "D-Tan Face Pack", href: "/product/4", image: "/Dtan_pack.webp" },
  { id: 6, name: "Micro Polishing Exfoliant", href: "/product/6", image: "/micro_ploishing.webp" },
  { id: 7, name: "Makeup Primer", href: "/product/7", image: "/magic_primer.webp" },
  { id: 8, name: "Liquid Foundation", href: "/product/8", image: "/foundation01.webp" },
  { id: 12, name: "Keratin Shampoo", href: "/product/12", image: "/shampo .webp" },
  { id: 13, name: "Keratin Hair Mask", href: "/product/13", image: "/keratin_mask.webp" },
];

const moments = [
  { label: "☀ After Sun Care", href: "/product/4" },
  { label: "✨ Everyday Makeup", href: "/makeup" },
  { label: "💼 Office Ready", href: "/makeup" },
  { label: "🌿 Weekend Self-Care", href: "/skincare" },
  { label: "💇 Hair Wash Day", href: "/hair-care" },
  { label: "🌙 Night Routine", href: "/skincare" },
  { label: "💍 Bridal Beauty", href: "/product/2" },
];

const routines = [
  {
    title: "Refresh & Reset",
    products: "D-Tan Face Pack + Face Exfoliator",
    description: "Refresh your skin after long days outdoors with a simple two-step routine.",
    href: "/skincare",
    image: "/dtan_expoilt.webp",
    hoverImage: "/dtan+exfoliant.webp",
    badge: "Best Pair",
    cta: "Shop the Routine",
  },
  {
    title: "Everyday Makeup",
    products: "Makeup Primer + Liquid Foundation + Waterproof Mascara",
    description:
      "Three simple products that work together for a makeup routine you'll keep reaching for.",
    href: "/makeup",
    image: "/foundation_primer.webp",
    hoverImage: "/foundation+primer.webp",
    badge: "Daily Edit",
    cta: "Build My Routine",
  },
  {
    title: "Healthy Hair Ritual",
    products: "Keratin Shampoo + Keratin Hair Mask",
    description:
      "Everything you need for softer, smoother, healthier-looking hair in one simple routine.",
    href: "/hair-care",
    image: "/Shampoo and Mask.webp",
    hoverImage: "/Shampoo and Mask (2).webp",
    badge: "Hair Duo",
    cta: "Explore the Routine",
  },
  {
    title: "Signature Beauty Kits",
    products: "Korean Glow Kit + Bridal Glow Kit",
    description: "Two beauty kits made for everyday glow and life's biggest celebrations.",
    href: "/skincare",
    image: "/eyelinear_maskara.webp",
    hoverImage: "/linear+maskara.webp",
    badge: "Kit Bundle",
    cta: "Explore the Kits",
  },
];



const journal = [
  {
    title: "How to Build a Simple Skincare Routine",
    tag: "Skincare",
    href: "/skincare",
    image: "/skin_carebanner.webp",
  },
  {
    title: "Find Your Perfect Liquid Foundation Shade",
    tag: "Makeup",
    href: "/makeup",
    image: "/foundation01.webp",
  },
  {
    title: "Everyday Makeup in Five Minutes",
    tag: "Makeup",
    href: "/makeup",
    image: "/makeup_banner.webp",
  },
  {
    title: "Hair Care Habits Worth Keeping",
    tag: "Hair Care",
    href: "/hair-care",
    image: "/hair_carebanner.webp",
  },
  {
    title: "Self-Care Routines That Fit Busy Days",
    tag: "Rituals",
    href: "/skincare",
    image: "/skincare.webp",
  },
];

const faqs = [
  {
    q: "How do I choose the right beauty products?",
    a: "Not sure where to start? Browse by category, skin concern, or routine to find products that suit your needs.",
  },
  {
    q: "Do you deliver across India?",
    a: "Yes, we deliver beauty products across India with secure packaging and fast shipping.",
  },
  {
    q: "Can I build a complete beauty routine?",
    a: "Absolutely. Combine skincare, makeup, hair care, and beauty kits to create a routine that works for you.",
  },
  {
    q: "Which beauty kit should I choose?",
    a: "Choose the Korean Glow Kit for everyday skincare or the Bridal Glow Kit for wedding preparation and celebrations.",
  },
  {
    q: "How do I choose my Liquid Foundation shade?",
    a: "Use our shade guide to compare undertones and coverage before placing your order.",
  },
];

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  light = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-6 max-w-xl sm:mb-8">
      <div className="mb-3 flex items-center gap-3">
        <span
          className={`h-px w-8 ${light ? "bg-cream/40" : "bg-ink/25"}`}
        />
        <p
          className={`text-[20px] text-center font-semibold uppercase tracking-[0.28em] ${
            light ? "text-cream/55" : "text-ink/45"
          }`}
        >
          {eyebrow}
        </p>
      </div>
      <h2
        className={`text-[1.75rem] font-medium leading-[1.15] tracking-[-0.02em] sm:text-4xl ${
          light ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-[15px] font-light leading-relaxed ${
            light ? "text-cream/65" : "text-ink/55"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const favouritesTrackRef = useRef<HTMLDivElement>(null);
  const { products } = useProducts();

  const favouriteCards = useMemo(
    () =>
      favourites.map((item) => {
        // IDs from Supabase can arrive as strings — coerce before match.
        const live = products.find((p) => Number(p.id) === item.id);
        return {
          ...item,
          name: live?.name ?? item.name,
          image: live?.image || item.image,
          price: live?.price != null && live.price !== "" ? formatInr(parsePrice(live.price)) : undefined,
          oldPrice:
            live?.oldPrice != null && live.oldPrice !== ""
              ? formatInr(parsePrice(live.oldPrice))
              : undefined,
          category: live?.category,
        };
      }),
    [products]
  );

  const slideFavourites = (dir: number) => {
    const track = favouritesTrackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-favourite-card]");
    if (!card) return;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "12") || 12;
    track.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Hero />

      {/* Scrolling brand-promise band */}
      <BrandMarquee />

   

      {/* Categories — large image-led tiles */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Shop by Category"
            title="Find Your Beauty Essentials"
            subtitle="Four collections. Everything you need for a complete beauty routine."
          />
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {categories.map((cat) => (
              <Link key={cat.name} href={cat.href} className="group block">
                <div className="relative mb-3 aspect-[3/4] overflow-hidden bg-porcelain sm:mb-5">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <h3 className="text-sm font-medium tracking-tight text-ink sm:text-lg">{cat.name}</h3>
                <p className="mt-1.5 hidden text-sm font-light leading-relaxed text-ink/55 sm:mt-2 sm:block">
                  {cat.description}
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 border px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/70 transition-colors hover:bg-black hover:text-white group-hover:text-ink sm:mt-3 sm:px-3 sm:py-2 sm:text-[11px]">
                  {cat.cta}
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

   {/* Intro — editorial, quiet luxury */}
   <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(226,185,157,0.28),transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
          <p className="mb-4 text-[20px] font-semibold uppercase tracking-[0.32em] text-ink/40">
            Ziva Beauty
          </p>
          <h1 className="text-[1.65rem] font-medium leading-[1.15] tracking-[-0.025em] text-ink sm:text-4xl lg:text-[2.75rem]">
            Premium Beauty Products for
            <span className="mt-2 block font-light text-ink/70">Skincare, Makeup &amp; Hair Care</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] font-light leading-[1.75] text-ink/60">
            Great skincare, makeup, and hair care should feel easy, not complicated. Whether you&apos;re
            getting ready for work, heading to college, meeting friends, or taking a little time for
            yourself, Ziva Beauty brings together everything you need in one place.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-ink px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-ink/90"
            >
              Explore the Collection
            </Link>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 px-2 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink"
            >
              Shop Best Sellers
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>


      {/* Most Loved — quieter, more premium product rail */}
      <section className="relative py-12 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_100%_0%,rgba(245,231,220,0.55),transparent_55%)]" />
        <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Most Loved"
            title="Customer Favourites You'll Keep Coming Back To"
            subtitle="The products our customers reach for again and again."
          />
          <div className="relative px-2 sm:px-3">
            <button
              type="button"
              onClick={() => slideFavourites(-1)}
              aria-label="Previous favourites"
              className="absolute left-0 top-[38%] z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-cream/95 text-ink backdrop-blur-sm transition-all hover:border-gold hover:text-gold-deep sm:h-11 sm:w-11"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => slideFavourites(1)}
              aria-label="Next favourites"
              className="absolute right-0 top-[38%] z-20 flex h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-cream/95 text-ink backdrop-blur-sm transition-all hover:border-gold hover:text-gold-deep sm:h-11 sm:w-11"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
            </button>

            <div
              ref={favouritesTrackRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden lg:gap-6"
            >
              {favouriteCards.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  data-favourite-card
                  className="group w-[calc((100%-3rem)/4.15)] shrink-0 snap-start sm:w-[calc((100%-3.75rem)/4.15)] lg:w-[calc((100%-4.5rem)/4.15)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#F3EEE7] transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/6 transition-colors duration-500 group-hover:ring-gold/35" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  <div className="pt-4 text-center sm:pt-5">
                    {item.category ? (
                      <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.24em] text-gold-deep">
                        {item.category}
                      </p>
                    ) : null}
                    <h3 className="font-serif text-[15px] font-normal leading-snug tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-ink/75 sm:text-[17px]">
                      <span className="line-clamp-2">{item.name}</span>
                    </h3>
                    {item.price ? (
                      <div className="mt-2 flex items-baseline justify-center gap-2">
                        <span className="text-[13px] font-medium tracking-wide text-ink sm:text-[14px]">
                          {item.price}
                        </span>
                        {item.oldPrice ? (
                          <span className="text-[11px] font-light tracking-wide text-ink/35 line-through">
                            {item.oldPrice}
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-ink/40 transition-colors duration-300 group-hover:text-gold-deep">
                      View
                      <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Ziva Beauty — brand paragraph */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/45">
            Why Choose Ziva Beauty
          </p>
          <p className="text-[16px] font-light leading-[1.8] text-ink/70 sm:text-[18px]">
            We know beauty looks different for everyone. That&apos;s why we make skincare, makeup, hair
            care, and beauty kits that are easy to use and easy to love. Whether you&apos;re building your
            first routine or adding new favourites, we&apos;re here to make self-care feel simple.
          </p>
        </div>
      </section>

      {/* Moments — refined text rail */}
      <section className="border-y border-ink/8 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow="Shop by Moment"
              title="Find Products for Every Part of Your Day"
            />
            <Link
              href="/products"
              className="group mb-8 hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink lg:mb-10 lg:inline-flex bg-black text-white px-4 py-4 "
            >
              Find Your Routine
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 divide-x divide-y divide-ink/8 border-t border-b border-ink/8 lg:grid-cols-4 lg:divide-y-0">
            {moments.map((m) => (
              <Link
                key={m.label}
                href={m.href}
                className="group flex items-center justify-between px-3 py-4 sm:px-6 hover:bg-ink/10 sm:py-5"
              >
                <span className="text-[15px] font-medium tracking-tight text-ink transition-colors group-hover:text-ink/70">
                  {m.label}
                </span>
                <ArrowRight className="h-4 w-4 text-ink/25 transition-all group-hover:translate-x-1 group-hover:text-ink" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hair ritual feature band */}
      <section className="relative min-h-[320px] overflow-hidden sm:min-h-[400px]">
        <img
          src="/Shampoo and Mask.webp"
          alt="Keratin Shampoo and Mask"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/20" />
        <div className="relative mx-auto flex min-h-[320px] max-w-8xl items-center px-4 py-10 sm:min-h-[400px] sm:px-6 lg:px-8">
          <div className="max-w-md">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-cream/50">
              Healthy Hair Ritual
            </p>
            <h2 className="text-3xl font-medium leading-tight tracking-[-0.02em] text-cream sm:text-4xl">
              Soft. Manageable. Radiant.
            </h2>
            <p className="mt-4 text-[15px] font-light leading-relaxed text-cream/70">
              Pair Keratin Shampoo with Keratin Hair Mask for a complete wash-day ritual your hair
              will thank you for.
            </p>
            <Link
              href="/hair-care"
              className="mt-8 inline-flex items-center gap-2 border border-cream/40 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-cream hover:text-ink"
            >
              Explore Hair Care
            </Link>
          </div>
        </div>
      </section>

      {/* Routines — 4 cards in a row */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col items-center text-center sm:mb-10">
            <p className="mb-3 text-[20px] font-semibold uppercase tracking-[0.12em] text-ink/45">
              Complete Your Routine
            </p>
            <h2 className="text-[1.45rem] font-medium tracking-[-0.02em] text-ink sm:text-4xl">
              Products That Work Better Together
            </h2>
           
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {routines.map((r) => (
              <div
                key={r.title}
                className="group flex flex-col overflow-hidden rounded-xl"
              >
                <Link href={r.href} className="relative block aspect-square overflow-hidden bg-porcelain">
                  {r.badge && (
                    <span className="absolute left-3 top-3 z-10 bg-ink px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-cream">
                      {r.badge}
                    </span>
                  )}
                  <img
                    src={r.image}
                    alt={r.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
                  />
                  <img
                    src={r.hoverImage}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-100"
                  />
                </Link>

                <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
                  <Link href={r.href}>
                    <h3 className="text-[13px] font-bold uppercase tracking-[0.06em] text-ink">
                      {r.title}
                    </h3>
                  </Link>
                  <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                    {r.products}
                  </p>
                  <p className="mt-2.5 flex-1 text-[13px] font-light leading-relaxed text-ink/55">
                    {r.description}
                  </p>
                  <Link
                    href={r.href}
                    className="mt-4 block w-full bg-ink py-3  text-center px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-ink/90"
                  >
                    {r.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        
        </div>
      </section>

      {/* Why */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_0%_50%,rgba(226,185,157,0.22),transparent_55%)]" />
        <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why You'll Love Coming Back"
            title="Some products become part of your shelf. The best ones become part of your routine."
            subtitle="That's why our products become part of your routine  not just something you buy once."
          />
          <ul className="grid grid-cols-2 gap-3 sm:gap-4">
            
              <li
              
                className="flex items-start gap-4 border-t  border-ink/10 pt-4 text-[15px] font-light leading-relaxed text-ink/70"
              >
                <span className="mt-2 h-px w-5 shrink-0 bg-ink/30" />
                <p>Premium beauty essentials for everyday use</p>
              </li>
              <li
              
                className="flex items-start gap-4 border-t  border-ink/10 pt-4 text-[15px] font-light leading-relaxed text-ink/70"
              >
                <span className="mt-2 h-px w-5 shrink-0 bg-ink/30" />
                <p>Skincare, makeup, and hair care in one place</p>
              </li>
              <li
              
                className="flex items-start gap-4 border-t  border-ink/10 pt-4 text-[15px] font-light leading-relaxed text-ink/70"
              >
                <span className="mt-2 h-px w-5 shrink-0 bg-ink/30" />
                <p>Curated beauty kits for every occasion.</p>
              </li>
              <li
              
                className="flex items-start gap-4 border-t  border-ink/10 pt-4 text-[15px] font-light leading-relaxed text-ink/70"
              >
                <span className="mt-2 h-px w-5 shrink-0 bg-ink/30" />
                <p>Easy-to-build routines.</p>
              </li>
              <li
              
                className="flex items-start gap-4 border-t border-b  border-ink/10 pt-4 text-[15px] font-light leading-relaxed text-ink/70"
              >
                <span className="mt--to-build routin2 h-px w-5 shrink-0 bg-ink/30" />
                <p>Secure shopping and fast delivery across India</p>
              </li>
          
          </ul>
        </div>
      </section>

      {/* ₹499 Store — slideable product carousel */}
      <Store499 />

      <ReviewsCarousel />

      {/* Instagram gallery */}
      {/* <InstagramFeed /> */}

      {/* Beauty Journal — full-bleed image cards, no empty white space */}
      {/* <section className="border-t border-ink/8 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Beauty Journal"
            title="Beauty Tips, Guides & Inspiration"
            subtitle="Skincare tips, makeup ideas, hair care advice, and simple guides to get the best from your products."
          />

          <div className="grid grid-cols-2 gap-0 overflow-hidden rounded-2xl sm:grid-cols-3 lg:grid-cols-5">
            {journal.map((article) => (
              <Link
                key={article.title}
                href={article.href}
                className="group relative block aspect-[3/4] overflow-hidden bg-ink"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-3 sm:p-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-cream/70">
                    {article.tag}
                  </span>
                  <h3 className="text-[13px] font-medium leading-snug tracking-tight text-cream sm:text-[14px]">
                    {article.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/80 transition-colors group-hover:text-cream">
                    Read
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/products"
            className="group mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink"
          >
            Read the Journal
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section> */}

      {/* FAQ — tight card grid, no empty white list spacing */}
      <section className="border-t border-ink/8 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            subtitle="Quick answers about shopping, shipping, routines, and finding the right Ziva products."
          />

          <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-ink/10 sm:grid-cols-2">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group border-b border-ink/10 bg-porcelain/40 open:bg-ink sm:odd:border-r sm:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 text-left marker:content-none sm:p-6 [&::-webkit-details-marker]:hidden">
                  <span className="text-[14px] font-medium leading-snug tracking-tight text-ink group-open:text-cream sm:text-[15px]">
                    {faq.q}
                  </span>
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink/15 text-sm leading-none text-ink/40 transition-all group-open:border-cream/30 group-open:text-cream group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm font-light leading-relaxed text-ink/60 group-open:text-cream/70 sm:px-6 sm:pb-6">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink"
          >
            Visit the Help Centre
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="ink-surface grain py-12 text-cream sm:py-16">
        <div className="mx-auto max-w-8xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-cream/40">
            Ziva Beauty
          </p>
          <h2 className="text-3xl font-medium leading-tight tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            Everything You Need,
           All in One Place
          </h2>
          <p className="mx-auto mt-4  text-[15px] font-light leading-relaxed text-cream/90">
            Looking for skincare, makeup, hair care, or beauty kits? You&apos;ll find them all at Ziva
            Beauty. From our D-Tan Face Pack and Face Exfoliator to Keratin Shampoo, Hair Mask, Makeup
            Primer, Liquid Foundation, and Waterproof Mascara, every product is made to fit easily into
            your daily routine.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex bg-cream sm:px-12 px-4 py-4  text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-opacity hover:opacity-90"
            >
              Explore All Products
            </Link>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 border border-cream/30 sm:px-12 px-4 py-4 text-[11px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-cream transition-colors hover:border-cream"
            >
              Shop Best Sellers
            </Link>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
}
