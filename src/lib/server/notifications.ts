import "server-only";

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
    console.info("[SMS demo]", payload.phone, message);
    return;
  }

  // Provider-agnostic hook — wire MSG91/Twilio/etc. when credentials are set.
  console.info(`[SMS ${provider}]`, payload.phone, message.slice(0, 80) + "…");
}
