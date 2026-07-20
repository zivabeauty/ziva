import "server-only";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.zivabeauty.co.in";
const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

/** Mask PII before logging: keep just enough to correlate, never the full value. */
const maskEmail = (e: string) => e.replace(/^(.).*(@.*)$/, "$1***$2");
const maskPhone = (p: string) => p.replace(/.(?=.{4})/g, "*");
const esc = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

/**
 * Provider-agnostic transactional email. Sends via Resend when RESEND_API_KEY
 * is set; otherwise logs in demo mode so the flow works without credentials.
 */
export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_EMAIL_FROM || "Ziva Beauty <onboarding@resend.dev>";

  if (!apiKey) {
    console.info("[Email demo]", maskEmail(opts.to), "—", opts.subject);
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: opts.to, subject: opts.subject, html: opts.html, reply_to: opts.replyTo }),
    });
    if (!res.ok) {
      console.error("Email send failed:", await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Email send error:", err);
    return false;
  }
}

interface OrderEmailItem {
  name: string;
  qty: number;
  size?: string;
  price?: number;
}

interface OrderEmailPayload {
  email: string;
  customerName: string;
  orderId: string;
  amount: number;
  items: OrderEmailItem[];
  address?: string;
}

/** Sends the customer their order-confirmation email. */
export async function sendOrderConfirmationEmail(payload: OrderEmailPayload): Promise<boolean> {
  const rows = payload.items
    .map(
      (it) => `<tr>
        <td style="padding:10px 0;border-bottom:1px dashed #e9e2dc;font-size:14px;color:#2a211d">
          ${esc(it.name)}${it.size ? `<span style="display:block;font-size:12px;color:#8a7f78">${esc(it.size)}</span>` : ""}
        </td>
        <td style="padding:10px 0;border-bottom:1px dashed #e9e2dc;font-size:13px;color:#6b625c;text-align:center">×${it.qty}</td>
        <td style="padding:10px 0;border-bottom:1px dashed #e9e2dc;font-size:14px;color:#2a211d;text-align:right;font-weight:600">${it.price != null ? inr(it.price * it.qty) : "—"}</td>
      </tr>`
    )
    .join("");

  const html = `<!DOCTYPE html><html><body style="margin:0;background:#faf7f2;font-family:Helvetica,Arial,sans-serif">
    <div style="max-width:560px;margin:0 auto;padding:32px 20px">
      <div style="text-align:center;padding-bottom:20px;border-bottom:2px solid #3D2412">
        <h1 style="margin:0;font-size:26px;letter-spacing:6px;color:#3D2412">ZIVA</h1>
        <p style="margin:6px 0 0;font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:#79443B">Luxury Beauty · Skincare · Makeup</p>
      </div>
      <div style="background:#fff;border-radius:14px;padding:28px;margin-top:20px">
        <h2 style="margin:0 0 6px;font-size:20px;color:#3D2412">Thank you, ${esc(payload.customerName)}! 🎉</h2>
        <p style="margin:0 0 20px;font-size:14px;color:#6b625c;line-height:1.6">Your order is confirmed and being prepared. Here are the details:</p>
        <p style="margin:0 0 4px;font-size:12px;color:#8a7f78">Order ID</p>
        <p style="margin:0 0 20px;font-size:14px;font-weight:700;color:#3D2412">${esc(payload.orderId)}</p>
        <table style="width:100%;border-collapse:collapse">
          <thead><tr>
            <th style="text-align:left;font-size:9px;letter-spacing:1px;text-transform:uppercase;color:#a39a93;padding-bottom:6px;border-bottom:1px solid #e5ded8">Item</th>
            <th style="text-align:center;font-size:9px;letter-spacing:1px;text-transform:uppercase;color:#a39a93;padding-bottom:6px;border-bottom:1px solid #e5ded8">Qty</th>
            <th style="text-align:right;font-size:9px;letter-spacing:1px;text-transform:uppercase;color:#a39a93;padding-bottom:6px;border-bottom:1px solid #e5ded8">Amount</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
        <div style="display:flex;justify-content:space-between;margin-top:16px;padding-top:14px;border-top:2px solid #3D2412">
          <span style="font-size:15px;font-weight:800;color:#3D2412">Total Paid</span>
          <span style="font-size:15px;font-weight:800;color:#3D2412">${inr(payload.amount)}</span>
        </div>
        ${payload.address ? `<p style="margin:20px 0 0;font-size:12px;color:#8a7f78">Shipping to</p><p style="margin:2px 0 0;font-size:13px;color:#2a211d;line-height:1.5">${esc(payload.address)}</p>` : ""}
      </div>
      <div style="text-align:center;margin-top:22px">
        <p style="font-size:13px;color:#6b625c;margin:0 0 12px">Changed your mind? You can request a return or exchange.</p>
        <a href="${SITE_URL}/returns" style="display:inline-block;background:#3D2412;color:#fff;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:12px 26px;border-radius:6px">Return or Exchange</a>
      </div>
      <p style="text-align:center;margin-top:24px;font-size:11px;color:#a39a93;line-height:1.6">Thank you for shopping with Ziva.<br/>Questions? Just reply to this email.</p>
    </div>
  </body></html>`;

  return sendEmail({
    to: payload.email,
    subject: `Your Ziva order is confirmed · ${payload.orderId}`,
    html,
  });
}

/** Notifies the store when a customer requests a return or exchange. */
export async function sendReturnRequestEmail(payload: {
  orderId: string;
  email: string;
  type: string;
  reason: string;
}): Promise<boolean> {
  const to = process.env.ADMIN_EMAIL;
  if (!to) {
    console.info("[Return request]", payload.type, payload.orderId, maskEmail(payload.email));
    return false;
  }
  const html = `<div style="font-family:Helvetica,Arial,sans-serif;color:#2a211d">
    <h2 style="color:#3D2412">New ${esc(payload.type)} request</h2>
    <p><strong>Order:</strong> ${esc(payload.orderId)}</p>
    <p><strong>Customer:</strong> ${esc(payload.email)}</p>
    <p><strong>Reason:</strong><br/>${esc(payload.reason) || "—"}</p>
  </div>`;
  return sendEmail({ to, subject: `Ziva ${payload.type} request · ${payload.orderId}`, html, replyTo: payload.email });
}

interface OrderSmsPayload {
  phone: string;
  orderId: string;
  amount: number;
  customerName: string;
}

/**
 * Sends an order confirmation SMS to the customer's phone.
 * Demo mode: logs when no SMS provider credentials are configured.
 */
export async function sendOrderConfirmationSms(payload: OrderSmsPayload): Promise<void> {
  const provider = process.env.SMS_PROVIDER;
  const apiKey = process.env.SMS_API_KEY;

  const message = `Hi ${payload.customerName}, your ZIVA order #${payload.orderId} for ₹${Math.round(payload.amount).toLocaleString("en-IN")} is confirmed. Track at zivabeauty.com. Thank you!`;

  if (!provider || !apiKey) {
    console.info("[SMS demo]", maskPhone(payload.phone), `order ${payload.orderId}`);
    return;
  }

  // Provider-agnostic hook — wire MSG91/Twilio/etc. when credentials are set.
  console.info(`[SMS ${provider}]`, maskPhone(payload.phone), message.slice(0, 40) + "…");
}
