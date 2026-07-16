export const siteConfig = {
  name: "ZIVA",
  description:
    "Refined, clean-beauty skincare and makeup — crafted with premium botanicals and gold-standard actives.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  freeShippingThreshold: 0,
  shippingFee: 0,
} as const;
