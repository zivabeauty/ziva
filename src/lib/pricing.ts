import type { Product } from "@/data/beautyData";

/**
 * Single source of truth for money math. Used by the cart UI and by the
 * server when it recomputes the payable amount, so the browser can never
 * dictate what gets charged.
 */

export const SHIPPING_FEE = 0;

/** Site-wide sale — applied to every product on display and at checkout. */
export const SITE_DISCOUNT_PERCENT = 15;

/** Price multipliers per size, relative to the base (30 ml) price. */
const SIZE_MULTIPLIERS: Record<string, number> = {
  "30 ml": 1,
  "50 ml": 1.4,
  "100 ml": 2.2,
  "200 ml": 3.5,
};

export const PROMO_CODES: Record<string, number> = {
  ZIVA10: 10,
  ZIVA15: 15,
  GOLD20: 20,
};

export function parsePrice(price: string | number | null | undefined): number {
  if (typeof price === "number") return price;
  if (!price) return 0;
  return parseFloat(String(price).replace(/[^0-9.]/g, "")) || 0;
}

export function formatInr(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

/** Catalog list price after the site-wide discount (before size multipliers). */
export function getDiscountedPrice(listed: string | number | null | undefined): number {
  const base = parsePrice(listed);
  if (!SITE_DISCOUNT_PERCENT) return Math.round(base);
  return Math.round(base * (1 - SITE_DISCOUNT_PERCENT / 100));
}

/** Display pair for UI: sale price + strikethrough list price + % off. */
export function getDisplayPricing(product: Pick<Product, "price" | "oldPrice">) {
  const listed = parsePrice(product.price);
  const sale = getDiscountedPrice(listed);
  if (SITE_DISCOUNT_PERCENT > 0 && listed > sale) {
    return { price: sale, oldPrice: listed, percent: SITE_DISCOUNT_PERCENT };
  }
  const was = parsePrice(product.oldPrice);
  const hasSaving = was > listed;
  return {
    price: Math.round(listed),
    oldPrice: hasSaving ? was : 0,
    percent: hasSaving ? Math.round(((was - listed) / was) * 100) : 0,
  };
}

export function getUnitPrice(product: Pick<Product, "price">, size?: string): number {
  const base = getDiscountedPrice(product.price);
  return Math.round(base * (SIZE_MULTIPLIERS[size ?? ""] ?? 1));
}

export interface PricedItem {
  unitPrice: number;
  quantity: number;
}

export function computeTotals(items: PricedItem[], promoCode?: string) {
  const subtotal = items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0);
  const discountPercent = promoCode ? PROMO_CODES[promoCode.toUpperCase()] ?? 0 : 0;
  const discount = (subtotal * discountPercent) / 100;
  const shipping = SHIPPING_FEE;
  const total = Math.max(0, subtotal + shipping - discount);
  return { subtotal, discountPercent, discount, shipping, total };
}
