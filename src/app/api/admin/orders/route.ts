import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/session";
import { supabaseAdmin } from "@/lib/server/supabase-admin";

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await supabaseAdmin("order?select=*&order=time_stamp.desc");
    if (!res.ok) {
      return NextResponse.json({ error: await res.text() }, { status: res.status });
    }
    return NextResponse.json(await res.json());
  } catch (err) {
    console.error("Admin orders fetch failed:", err);
    return NextResponse.json({ error: "Failed to load orders." }, { status: 500 });
  }
}

/** Update an order's status and/or tracking id. */
export async function PATCH(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const orderId = body?.order_id;
  if (!orderId) {
    return NextResponse.json({ error: "order_id is required." }, { status: 400 });
  }

  const updates: Record<string, string> = {};
  if (typeof body.payment_status === "string") updates.payment_status = body.payment_status;
  if (typeof body.tracking_id === "string") updates.tracking_id = body.tracking_id;
  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  try {
    const res = await supabaseAdmin(`order?order_id=eq.${encodeURIComponent(orderId)}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
    if (!res.ok) {
      return NextResponse.json({ error: await res.text() }, { status: res.status });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Admin order update failed:", err);
    return NextResponse.json({ error: "Failed to update order." }, { status: 500 });
  }
}
