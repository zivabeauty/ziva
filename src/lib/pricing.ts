import type { Product } from "@/data/beautyData";

/**
 * Single source of truth for money math. Used by the cart UI and by the
 * server when it recomputes the payable amount, so the browser can never
 * dictate what gets charged.
 */

export const SHIPPING_FEE = 0;

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

export function getUnitPrice(product: Pick<Product, "price">, size?: string): number {
  const base = parsePrice(product.price);
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
