import type { Metadata } from "next";
import { Sparkles, Leaf, Droplets, HeartHandshake } from "lucide-react";
import CategoryProductGrid from "@/components/CategoryProductGrid";

const TITLE = "Hair Care Products Online | Shampoo & Hair Mask | Ziva Beauty";
const DESCRIPTION =
  "Shop hair care products online at Ziva Beauty. Discover shampoos, hair masks and everyday hair care essentials for smooth, healthy-looking hair.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/hair-care" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Ziva Beauty",
    url: "/hair-care",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/hair_carebanner.webp", width: 1200, height: 630, alt: "Ziva Beauty Hair Care Products" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ZivaBeauty",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/hair_carebanner.webp"],
  },
};


const highlights = [
  { icon: Leaf, title: "Simple & Enjoyable", sub: "Care that fits your day" },
  { icon: Droplets, title: "Everyday Essentials", sub: "Made for real life" },
  { icon: HeartHandshake, title: "For Everyone", sub: "Men & women welcome" },
];

const faqs = [
  {
    q: "Are Ziva Beauty hair care products suitable for both men and women?",
    a: "Yes. Our hair care collection is suitable for anyone looking to build a simple and consistent hair care routine.",
  },
  {
    q: "Can I use Keratin Shampoo every day?",
    a: "The Keratin Shampoo is suitable for regular use. Choose a routine that works best for your hair type and personal preferences.",
  },
  {
    q: "How often should I use the Keratin Hair Mask?",
    a: "Most people use a hair mask once or twice a week, depending on their hair's needs and routine.",
  },
  {
    q: "Can I use the Keratin Shampoo and Keratin Hair Mask together?",
    a: "Yes. Start with the Keratin Shampoo to cleanse your hair, then follow with the Keratin Hair Mask for added care.",
  },
  {
    q: "Who are these hair care products for?",
    a: "Our hair care products are designed for both men and women who want a simple and reliable routine for healthy-looking hair.",
  },
];

export default function HairCarePage() {
  return (
    <div className="bg-white text-ink">
      {/* ── HERO ── */}
      <section className="block w-full sm:h-[70vh] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='/hair_carebanner.webp'
          alt="Ziva hair care collection"
          className="h-full w-full object-cover object-center"
        />
      </section>

      {/* ── PRODUCTS ── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-12 text-center sm:mb-14">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-deep">
            Our Hair Care Collection
          </p>
          <h2 className="font-serif text-3xl font-medium tracking-[-0.02em] text-ink sm:text-4xl">
            Simple products. Everyday care.
          </h2>
        </div>

        <CategoryProductGrid category="Hair Care" />
      </section>

      {/* ── CONTENT ── */}
      <section className="relative overflow-hidden bg-porcelain/40">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 50% 0%, rgba(226,185,157,0.18), transparent 62%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-gold-deep ring-1 ring-ink/5 shadow-sm">
            <Droplets className="h-3.5 w-3.5" /> Ziva Hair Care
          </span>
          <h2 className="font-serif text-[1.9rem] font-medium leading-[1.14] tracking-[-0.02em] text-ink sm:text-[2.5rem]">
            Hair Care Products for Everyday{" "}
            <span className="italic text-gold-deep">Healthy-Looking</span> Hair
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[17px] font-medium text-ink/80">
            Healthy hair starts with simple, consistent care.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] font-light leading-relaxed text-ink/60">
            At Ziva Beauty, we believe hair care should feel simple and enjoyable. Whether
            you&apos;re washing your hair after a busy day or setting aside time for weekly care,
            our collection is designed to fit naturally into your routine.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] font-light leading-relaxed text-ink/60">
            Suitable for both men and women, our hair care products make everyday hair care easy
            with essentials you&apos;ll enjoy using.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-[15px] font-light leading-relaxed text-ink/60">
            Browse the collection and find the products that suit your routine.
          </p>

          <div className="mx-auto mt-11 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            {highlights.map(({ icon: Icon, title, sub }) => (
              <div
                key={title}
                className="flex flex-col items-center gap-2 rounded-2xl border border-ink/5 bg-white px-4 py-5 shadow-[0_6px_20px_rgba(61,36,18,0.05)]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-soft text-gold-deep">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink">{title}</p>
                <p className="text-[11px] font-light text-ink/50">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-deep">
            FAQ
          </p>
          <h2 className="font-serif text-3xl font-medium tracking-[-0.02em] text-ink sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="divide-y divide-ink/10 border-t border-ink/10">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-[15px] font-medium tracking-tight text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span className="text-ink/30 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-ink/55">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── CLOSING BAND ── */}
      <section className="relative overflow-hidden bg-ink py-20 sm:py-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(226,185,157,0.16), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <Sparkles className="mx-auto mb-5 h-6 w-6 text-gold" />
          <h2 className="font-serif text-3xl font-medium text-cream sm:text-4xl">
            Everyday Hair Care, Made Simple
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] font-light leading-relaxed text-cream/70">
            Healthy-looking hair starts with a routine you can stick to. A few simple steps can help
            make hair care feel effortless and enjoyable.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-[15px] font-light leading-relaxed text-cream/70">
            Choose the products that fit your routine and enjoy hair care made for everyday life.
          </p>
        </div>
      </section>
    </div>
  );
}
