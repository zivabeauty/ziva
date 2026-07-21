import "server-only";
import type { Product } from "@/data/beautyData";
import { supabaseAdmin, isSupabaseServerConfigured } from "@/lib/server/supabase-admin";

/** Server-side catalog — Supabase only (no static/dummy fallback). */
export async function getCatalogProducts(): Promise<Product[]> {
  if (!isSupabaseServerConfigured()) return [];

  try {
    const res = await supabaseAdmin("product?select=*&order=id.asc");
    if (!res.ok) return [];
    const data = (await res.json()) as Product[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  if (!isSupabaseServerConfigured()) return null;

  try {
    const res = await supabaseAdmin(`product?id=eq.${id}&select=*&limit=1`);
    if (!res.ok) return null;
    const data = (await res.json()) as Product[];
    return Array.isArray(data) && data[0] ? data[0] : null;
  } catch {
    return null;
  }
}
