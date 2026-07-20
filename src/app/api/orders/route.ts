import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { priceCart } from "@/lib/server/checkout";
import { supabaseAdmin } from "@/lib/server/supabase-admin";
import { sendOrderConfirmationSms, sendOrderConfirmationEmail } from "@/lib/server/notifications";
import { throttleRequest, clientIp } from "@/lib/server/rate-limit";

interface PaymentProof {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
}

const SHIPPING_FIELDS = ["name", "email", "phone", "address", "city", "state", "pincode"] as const;

function verifySignature(payment: PaymentProof, secret: string): boolean {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = payment;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) return false;

  const expected = createHmac("sha256", secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const a = Buffer.from(razorpay_signature);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Records a paid order. The Razorpay signature is verified and the total is
 * recomputed server-side, so neither the amount nor the "paid" status can be
 * forged from the browser.
 */
export async function POST(request: Request) {
  try {
    if (throttleRequest(`orders:${clientIp(request)}`, 10, 60_000)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const payment: PaymentProof = body.payment ?? {};
    const shipping: Record<string, string> = body.shipping ?? {};

    for (const field of SHIPPING_FIELDS) {
      if (!String(shipping[field] ?? "").trim()) {
        return NextResponse.json({ error: `Missing shipping field: ${field}.` }, { status: 400 });
      }
    }
    if (!/^\S+@\S+\.\S+$/.test(shipping.email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const priced = await priceCart(body.items, body.promoCode);
    if ("error" in priced) {
      return NextResponse.json({ error: priced.error }, { status: 400 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const isMockOrder = payment.razorpay_order_id?.startsWith("order_mock_");
    const liveMode = Boolean(keySecret && !keySecret.includes("demoSecretKey"));

    if (liveMode) {
      if (!verifySignature(payment, keySecret!)) {
        return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
      }
    } else if (!isMockOrder) {
      return NextResponse.json({ error: "Payment gateway is not configured." }, { status: 503 });
    }

    const order = {
      order_id: payment.razorpay_order_id,
      payment_id: payment.razorpay_payment_id ?? null,
      name: shipping.name.trim(),
      email: shipping.email.trim(),
      phone: shipping.phone.trim(),
      address: shipping.address.trim(),
      city: shipping.city.trim(),
      state: shipping.state.trim(),
      pincode: shipping.pincode.trim(),
      products: JSON.stringify(
        priced.items.map((i) => ({
          name: i.product.name,
          qty: i.quantity,
          size: i.size,
          price: i.unitPrice,
        }))
      ),
      total_amount: priced.totals.total,
      payment_status: liveMode ? "paid" : "pending",
      payment_method: "Card/UPI",
      order_source: "Website",
      time_stamp: new Date().toISOString(),
    };

    const res = await supabaseAdmin("order", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(order),
    });

    if (!res.ok) {
      // 409 = this order_id already exists (double-submit / replay of an
      // already-verified payment). Treat as idempotent success — the order
      // is recorded; don't alarm the customer or send duplicate notifications.
      if (res.status === 409) {
        return NextResponse.json({
          ok: true,
          orderId: order.order_id,
          amount: priced.totals.total,
          duplicate: true,
        });
      }
      console.error("Order insert failed:", await res.text());
      return NextResponse.json(
        { error: "Payment received but the order could not be saved. Please contact support with your payment id." },
        { status: 500 }
      );
    }

    sendOrderConfirmationSms({
      phone: order.phone,
      orderId: order.order_id!,
      amount: priced.totals.total,
      customerName: order.name,
    }).catch((err) => console.error("SMS notification failed:", err));

    sendOrderConfirmationEmail({
      email: order.email,
      customerName: order.name,
      orderId: order.order_id!,
      amount: priced.totals.total,
      address: `${order.address}, ${order.city}, ${order.state} — ${order.pincode}`,
      items: priced.items.map((i) => ({
        name: i.product.name,
        qty: i.quantity,
        size: i.size,
        price: i.unitPrice,
      })),
    }).catch((err) => console.error("Email notification failed:", err));

    return NextResponse.json({
      ok: true,
      orderId: order.order_id,
      amount: priced.totals.total,
    });
  } catch (err) {
    console.error("Order creation failed:", err);
    return NextResponse.json({ error: "Failed to record the order." }, { status: 500 });
  }
}
