import { NextResponse } from "next/server";
import { getCatalogProducts } from "@/lib/server/products";

export async function GET() {
  const products = await getCatalogProducts();
  return NextResponse.json({ data: products, total: products.length });
}
