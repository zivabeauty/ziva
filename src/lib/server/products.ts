import "server-only";
import { products as staticProducts, type Product } from "@/data/beautyData";
import { supabaseAdmin, isSupabaseServerConfigured } from "@/lib/server/supabase-admin";

/** Server-side catalog fetch — Supabase with static fallback. */
export async function getCatalogProducts(): Promise<Product[]> {
  if (!isSupabaseServerConfigured()) return staticProducts;

  try {
    const res = await supabaseAdmin("product?select=*&order=id.asc");
    if (!res.ok) return staticProducts;
    const data = (await res.json()) as Product[];
    return data.length > 0 ? data : staticProducts;
  } catch {
    return staticProducts;
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  const all = await getCatalogProducts();
  return all.find((p) => p.id === id) ?? null;
}
