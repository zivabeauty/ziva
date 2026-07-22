import { NextResponse } from "next/server";
import { getCatalogProducts } from "@/lib/server/products";

// Cache the catalog response for 5 minutes (served from the CDN/data cache).
// Admin edits appear within 5 min; the admin panel reads its own fresh route.
export const revalidate = 300;

export async function GET() {
  const products = await getCatalogProducts();
  return NextResponse.json({ data: products, total: products.length });
}
