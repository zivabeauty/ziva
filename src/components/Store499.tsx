import Link from "next/link";

/* ──────────────────────────────────────────────────────────────
   Shop by Price — price-tier cards with a product image.
   Edit the tiers / images here anytime. Each links to all products.
   Phone: horizontal slider with 3 cards visible. Desktop: 4-col grid.
   ────────────────────────────────────────────────────────────── */
const PRICE_TIERS = [
  { amount: "₹299", href: "/products", image: "/micro_ploishing.webp" },
  { amount: "₹499", href: "/products", image: "/Dtan_pack.webp" },
  { amount: "₹799", href: "/products", image: "/magic_primer.webp" },
  { amount: "₹1199", href: "/products", image: "/keratin_mask.webp" },
];

export default function Store499() {
  return (
    <section className="bg-white bg-white py-5 sm:py-5">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-ink sm:mb-10 sm:text-[40px]">
          Shop by Price <span className="align-super text-3xl text-gold-deep">*</span>
        </h2>

        <div
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0"
        >
          {PRICE_TIERS.map((tier) => (
            <Link
              key={tier.amount}
              href={tier.href}
              className="group flex w-[calc((100%-1.5rem)/3)] shrink-0 snap-start flex-col overflow-hidden rounded-[15px] bg-gradient-to-b from-[#F4E7DD] to-white py-3 text-center shadow-[0_8px_24px_rgba(61,36,18,0.06)] ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(61,36,18,0.14)] sm:w-[calc((100%-3rem)/3)] sm:py-10 lg:w-auto"
            >
              <div className="px-2 pt-1 sm:px-6">
                <span className="block text-[10px] font-bold upercase text-gold-deep sm:text-[18px]">
                  Under
                </span>
                <span className="my-1.5 block text-[1.35rem] font-extrabold leading-none tracking-tight text-ink sm:text-[3.1rem]">
                  {tier.amount}
                </span>
                <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-gold-deep sm:text-[11px] sm:tracking-[0.28em]">
                  Only
                </span>
                <span className="mt-3 block w-full rounded-lg bg-black py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-cream transition-opacity group-hover:opacity-90 sm:mt-4 sm:py-3 sm:text-[11px] sm:tracking-[0.2em]">
                  Shop
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
