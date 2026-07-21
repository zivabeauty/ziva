"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import BrandMarquee from "@/components/BrandMarquee";
import Store499 from "@/components/Store499";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import InstagramFeed from "@/components/InstagramFeed";

const categories = [
  {
    name: "Skincare",
    href: "/skincare",
    image: "/Dtan_pack.png",
    description: "Cleanse, exfoliate, and refresh everyday essentials that fit your routine.",
  },
  {
    name: "Makeup",
    href: "/makeup",
    image: "/foundation01.png",
    description: "Fresh everyday looks and evening glam, easy to wear and easy to love.",
  },
  {
    name: "Hair Care",
    href: "/hair-care",
    image: "/keratin_mask.png",
    description: "Nourish and soften with care made for healthy-looking hair.",
  },
  {
    name: "Beauty Kits",
    href: "/skincare",
    image: "/Shampoo and Mask.png",
    description: "Curated collections for everyday rituals and special occasions.",
  },
];

const favourites = [
  {
    name: "D-Tan Face Pack",
    href: "/product/4",
    image: "/Dtan_pack.png",
    description: "Bright, refreshed skin after long days in the sun.",
  },
  {
    name: "Face Exfoliator",
    href: "/product/5",
    image: "/micro_ploishing.png",
    description: "Smooth away dullness for softer, fresher skin.",
  },
  {
    name: "Makeup Primer",
    href: "/product/7",
    image: "/magic_primer.png",
    description: "Smoother makeup that lasts through the day.",
  },
  {
    name: "Liquid Foundation",
    href: "/product/8",
    image: "/foundation01.png",
    description: "Three shades. Light feel. Naturally even coverage.",
  },
  {
    name: "Keratin Shampoo",
    href: "/product/12",
    image: "/shampo .png",
    description: "Cleanse and nourish with every wash.",
  },
  {
    name: "Keratin Hair Mask",
    href: "/product/13",
    image: "/keratin_mask.png",
    description: "A weekly deep-conditioning ritual.",
  },
];

const moments = [
  { label: "After Sun Care", href: "/product/4" },
  { label: "Everyday Makeup", href: "/makeup" },
  { label: "Office Ready", href: "/makeup" },
  { label: "Weekend Self-Care", href: "/skincare" },
  { label: "Hair Wash Day", href: "/hair-care" },
  { label: "Night Routine", href: "/skincare" },
  { label: "Bridal Beauty", href: "/product/2" },
];

const routines = [
  {
    title: "Refresh & Reset",
    products: "D-Tan Face Pack + Face Exfoliator",
    description: "A simple two step reset after long days outdoors.",
    href: "/skincare",
    image: "/dtan_expoilt.png",
    hoverImage: "/dtan+exfoliant.png",
    badge: "Best Pair",
  },
  {
    title: "Healthy Hair Ritual",
    products: "Keratin Shampoo + Mask",
    description: "Soft, manageable, healthy looking hair every wash.",
    href: "/hair-care",
    image: "/Shampoo and Mask.png",
    hoverImage: "/Shampoo and Mask (2).png",
    badge: "Hair Duo",
  },
  {
    title: "Signature Kits",
    products: "Eye Maskara + Linear Maskara",
    description: "Collections for everyday care and celebrations.",
    href: "/skincare",
    image: "/eyelinear_maskara.png",
    hoverImage: "/linear+maskara.png",
    badge: "Kit Bundle",
  },
  {
    title: "Signature Kits",
    products: "primer + foundation",
    description: "Collections for everyday care and celebrations.",
    href: "/makeup",
    image: "/foundation_primer.png",
    hoverImage: "/foundation+primer.png",
    badge: "Kit Bundle",
  },
];



const faqs = [
  {
    q: "How do I choose the right beauty products?",
    a: "Browse by category, concern, or routine to discover products that suit your lifestyle and beauty goals.",
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
    <div className="mb-12 max-w-xl sm:mb-16">
      <div className="mb-4 flex items-center gap-3">
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
  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Hero />

      {/* Scrolling brand-promise band */}
      <BrandMarquee />

   

      {/* Categories — large image-led tiles */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Shop by Category"
            title="Discover Your Beauty Essentials"
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
                  Explore
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
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-12 lg:px-8">
          <p className="mb-5 text-[20px] font-semibold uppercase tracking-[0.32em] text-ink/40">
            Ziva Beauty
          </p>
          <h1 className="text-[1.65rem] font-medium leading-[1.15] tracking-[-0.025em] text-ink sm:text-4xl lg:text-[2.75rem]">
            Skincare, Makeup &amp; Hair Care
            <span className="mt-2 block font-light text-ink/70">Made for Real Life</span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-[15px] font-light leading-[1.75] text-ink/60">
            From everyday essentials to special occasions — skincare, makeup, hair care, and beauty
            kits designed to make every routine feel a little easier, and every day a little more
            beautiful.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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


      {/* Most Loved */}
      <section className="relative py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_100%_0%,rgba(245,231,220,0.9),transparent_55%)]" />
        <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Most Loved"
            title="Favourites You'll Keep Coming Back To"
            subtitle="The products our customers reach for again and again."
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 md:grid-cols-3 lg:gap-x-8">
            {favourites.map((item) => (
              <Link key={item.name} href={item.href} className="group block">
                <div className="relative mb-4 aspect-square overflow-hidden bg-porcelain">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="text-[15px] font-medium tracking-tight text-ink sm:text-base">
                  {item.name}
                </h3>
                <p className="mt-1.5 text-sm font-light leading-relaxed text-ink/55">
                  {item.description}
                </p>
                <span className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/60 transition-colors group-hover:text-ink">
                  Shop
                  <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Moments — refined text rail */}
      <section className="border-y border-ink/8 bg-white py-16 sm:py-10">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow="Shop by Moment"
              title="For Every Part of Your Day"
            />
            <Link
              href="/products"
              className="group mb-12 hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink lg:mb-16 lg:inline-flex bg-black text-white px-4 py-4 "
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
                className="group flex items-center justify-between px-3 py-5 sm:px-6 hover:bg-ink/10 sm:py-8"
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
      <section className="relative min-h-[420px] overflow-hidden sm:min-h-[520px]">
        <img
          src="/Shampoo and Mask.png"
          alt="Keratin Shampoo and Mask"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/20" />
        <div className="relative mx-auto flex min-h-[420px] max-w-8xl items-center px-4 py-16 sm:min-h-[520px] sm:px-6 lg:px-8">
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
      <section className="bg-white py-16 sm:py-8">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-center text-center sm:mb-14">
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
                    Shop Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        
        </div>
      </section>

      {/* Why */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_0%_50%,rgba(226,185,157,0.22),transparent_55%)]" />
        <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Ziva"
            title="Some products become part of your shelf. The best ones become part of your routine."
            subtitle="Every Ziva Beauty collection is created to make beauty feel simple, enjoyable, and easy to come back to."
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
      {/* <Store499 /> */}

      <ReviewsCarousel />

      {/* Instagram gallery */}
      {/* <InstagramFeed /> */}

      {/* FAQ */}
      {/* <section className="bg-white py-20 sm:py-28 hidden lg:block">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
          <SectionHeader eyebrow="FAQ" title="Frequently Asked Questions" />
          <div className="divide-y divide-ink/10 border-t border-ink/10">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-[15px] font-medium tracking-tight text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="text-ink/30 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-ink/55">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
          <Link
            href="/contact"
            className="group mt-10 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink"
          >
            Visit the Help Centre
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
          </div>
        </div>
      </section> */}

      {/* Final CTA */}
      <section className="ink-surface grain py-24 text-cream sm:py-12">
        <div className="mx-auto max-w-8xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-cream/40">
            Ziva Beauty
          </p>
          <h2 className="text-3xl font-medium leading-tight tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            Everything You Need,
           All in One Place
          </h2>
          <p className="mx-auto mt-6  text-[15px] font-light leading-relaxed text-cream/90">
            Skincare, makeup, hair care, and curated beauty kits  designed to fit naturally into
            your life.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
