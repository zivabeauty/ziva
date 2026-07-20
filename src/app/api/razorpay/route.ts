import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { priceCart } from "@/lib/server/checkout";
import { throttleRequest, clientIp } from "@/lib/server/rate-limit";

function hasRealKeys(keyId?: string, keySecret?: string): boolean {
  return Boolean(
    keyId &&
      keySecret &&
      !keyId.includes("demoKeyId") &&
      !keySecret.includes("demoSecretKey")
  );
}

/**
 * Creates a Razorpay order. The amount is recomputed server-side from the
 * cart contents — the client never sends a price.
 */
export async function POST(request: Request) {
  try {
    if (throttleRequest(`razorpay:${clientIp(request)}`, 15, 60_000)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const priced = await priceCart(body.items, body.promoCode);
    if ("error" in priced) {
      return NextResponse.json({ error: priced.error }, { status: 400 });
    }

    const amountPaise = Math.round(priced.totals.total * 100);
    if (amountPaise < 100) {
      return NextResponse.json({ error: "Order total is too low." }, { status: 400 });
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!hasRealKeys(keyId, keySecret)) {
      // Demo mode without live credentials: return a mock order so the
      // flow can be exercised end-to-end in development.
      console.warn("Razorpay credentials not configured — returning mock order.");
      return NextResponse.json({
        id: `order_mock_${Math.random().toString(36).substring(2, 11)}`,
        amount: amountPaise,
        currency: "INR",
        totals: priced.totals,
        mock: true,
      });
    }

    const instance = new Razorpay({ key_id: keyId!, key_secret: keySecret! });
    const order = await instance.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json({ ...order, totals: priced.totals });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    return NextResponse.json(
      { error: "Unable to start the payment. Please try again." },
      { status: 500 }
    );
  }
}
