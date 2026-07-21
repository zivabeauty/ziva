import "server-only";
import type { Product } from "@/data/beautyData";
import { computeTotals, getUnitPrice } from "@/lib/pricing";
import { isSupabaseServerConfigured, supabaseAdmin } from "./supabase-admin";

/**
 * Server-side cart pricing. The browser only sends product ids, sizes and
 * quantities — prices always come from the product table, so a tampered
 * client can't change what is charged.
 */

export interface CheckoutItemInput {
  id: number;
  size?: string;
  quantity: number;
}

export interface PricedCartItem {
  product: Product;
  size: string;
  quantity: number;
  unitPrice: number;
}

const MAX_QTY_PER_ITEM = 50;

async function loadCatalog(): Promise<Product[]> {
  if (!isSupabaseServerConfigured()) return [];

  try {
    const res = await supabaseAdmin("product?select=*");
    if (res.ok) {
      const data = (await res.json()) as Product[];
      if (Array.isArray(data)) return data;
    }
  } catch (err) {
    console.error("Failed to load catalog for checkout:", err);
  }
  return [];
}

export async function priceCart(
  rawItems: unknown,
  promoCode?: string
): Promise<
  | { error: string }
  | { items: PricedCartItem[]; totals: ReturnType<typeof computeTotals> }
> {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    return { error: "Your bag is empty." };
  }

  const catalog = await loadCatalog();
  const items: PricedCartItem[] = [];

  for (const raw of rawItems as CheckoutItemInput[]) {
    const product = catalog.find((p) => p.id === Number(raw?.id));
    if (!product) return { error: `Unknown product (id ${raw?.id}).` };

    const quantity = Math.floor(Number(raw.quantity) || 0);
    if (quantity < 1 || quantity > MAX_QTY_PER_ITEM) {
      return { error: `Invalid quantity for ${product.name}.` };
    }

    const size = typeof raw.size === "string" ? raw.size : "Standard";
    items.push({ product, size, quantity, unitPrice: getUnitPrice(product, size) });
  }

  return { items, totals: computeTotals(items, promoCode) };
}
