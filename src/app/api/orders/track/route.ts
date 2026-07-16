import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/server/supabase-admin";

/** Public order tracking — returns only the fields the tracker UI needs. */
export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id")?.trim();
  if (!id) {
    return NextResponse.json({ error: "Order id is required." }, { status: 400 });
  }

  try {
    // Only expose fields the tracker UI actually shows. Customer PII
    // (name, address, phone, email, purchased items) is intentionally
    // withheld — anyone with an order id could otherwise read it.
    const res = await supabaseAdmin(
      `order?order_id=eq.${encodeURIComponent(id)}&select=order_id,payment_status,tracking_id,time_stamp,total_amount`
    );
    if (!res.ok) {
      return NextResponse.json({ error: "Unable to look up the order." }, { status: 502 });
    }

    const rows = await res.json();
    if (!rows?.length) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error("Order tracking failed:", err);
    return NextResponse.json({ error: "Unable to look up the order." }, { status: 500 });
  }
}

