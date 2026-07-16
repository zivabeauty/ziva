import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/session";

export async function GET() {
  return NextResponse.json({ authenticated: await requireAdmin() });
}
