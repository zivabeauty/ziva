import Link from "next/link";

/* ──────────────────────────────────────────────────────────────
   Shop by Price — price-tier cards with a product image.
   Edit the tiers / images here anytime. Each links to all products.
   ────────────────────────────────────────────────────────────── */
const PRICE_TIERS = [
  { amount: "₹299", href: "/products", image: "/micro_ploishing.png" },
  { amount: "₹499", href: "/products", image: "/Dtan_pack.png" },
  { amount: "₹899", href: "/products", image: "/magic_primer.png" },
  { amount: "₹1299", href: "/products", image: "/keratin_mask.png" },
];

export default function Store499() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-ink sm:mb-10 sm:text-[28px]">
          Shop by Price <span className="align-super text-base text-gold-deep">*</span>
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {PRICE_TIERS.map((tier) => (
            <Link
              key={tier.amount}
              href={tier.href}
              className="group flex flex-col overflow-hidden rounded-[24px] bg-gradient-to-b from-[#F4E7DD] to-white text-center shadow-[0_8px_24px_rgba(61,36,18,0.06)] ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(61,36,18,0.14)]"
            >
              {/* Product image */}
              <div className="relative flex aspect-[5/4] items-center justify-center px-6 pt-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tier.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="px-5 pb-6 pt-1 sm:px-6">
                <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-gold-deep sm:text-[11px]">
                  Under
                </span>
                <span className="my-1.5 block text-[1.9rem] font-extrabold leading-none tracking-tight text-ink sm:text-[2.4rem]">
                  {tier.amount}
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-gold-deep sm:text-[11px]">
                  Only
                </span>
                <span className="mt-4 block w-full rounded-lg bg-gradient-to-r from-gold-deep to-ink py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-cream transition-opacity group-hover:opacity-90">
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
