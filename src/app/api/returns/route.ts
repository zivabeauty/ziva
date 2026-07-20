import { NextResponse } from "next/server";
import { isSupabaseServerConfigured, supabaseAdmin } from "@/lib/server/supabase-admin";
import { sendReturnRequestEmail } from "@/lib/server/notifications";
import { throttleRequest, clientIp } from "@/lib/server/rate-limit";

/**
 * Records a customer return / exchange request. Stores it in Supabase (when
 * configured) and notifies the store by email. Degrades to a logged no-op so
 * the flow works before credentials / the table are set up.
 */
export async function POST(request: Request) {
  try {
    // Each request emails the store — throttle to blunt spam/abuse.
    if (throttleRequest(`returns:${clientIp(request)}`, 5, 60_000)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));

    const orderId = String(body.order_id ?? "").trim().replace(/^#/, "").replace(/^ZIVA-/i, "");
    const email = String(body.email ?? "").trim();
    const type = body.type === "exchange" ? "exchange" : "return";
    const reason = String(body.reason ?? "").trim().slice(0, 1000);

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required." }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    // Persist when possible. A DB failure (e.g. the table hasn't been created
    // yet) must not lose the request — we still notify the store by email.
    if (isSupabaseServerConfigured()) {
      try {
        const res = await supabaseAdmin("return_request", {
          method: "POST",
          body: JSON.stringify({ order_id: orderId, email, type, reason }),
        });
        if (!res.ok) console.error("Return request insert failed:", await res.text());
      } catch (err) {
        console.error("Return request insert error:", err);
      }
    }

    // Notify the store (fire-and-forget).
    sendReturnRequestEmail({ orderId, email, type, reason }).catch((err) =>
      console.error("Return notification failed:", err)
    );

    return NextResponse.json({ ok: true, type });
  } catch (err) {
    console.error("Return request failed:", err);
    return NextResponse.json({ error: "Failed to submit your request." }, { status: 500 });
  }
}
