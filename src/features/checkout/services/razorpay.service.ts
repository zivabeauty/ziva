/**
 * Razorpay integration — framework-agnostic. No React here: this owns the
 * checkout.js script injection and the checkout popup lifecycle. Bind it to
 * component state through the `useCheckout` hook.
 */

export interface RazorpaySuccess {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key?: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image: string;
  order_id: string;
  handler: (result: RazorpaySuccess) => void;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  modal: { ondismiss: () => void };
}

type RazorpayCtor = new (options: RazorpayOptions) => { open: () => void };

declare global {
  interface Window {
    Razorpay?: RazorpayCtor;
  }
}

/** Injects the Razorpay checkout script once; resolves false if it can't load. */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export interface OpenRazorpayCheckoutArgs {
  orderId: string;
  amount: number;
  currency?: string;
  prefill: { name: string; email: string; contact: string };
  onSuccess: (result: RazorpaySuccess) => void;
  onDismiss: () => void;
}

/** Opens the hosted Razorpay popup for an already-created order. */
export function openRazorpayCheckout({
  orderId,
  amount,
  currency = "INR",
  prefill,
  onSuccess,
  onDismiss,
}: OpenRazorpayCheckoutArgs): void {
  if (typeof window === "undefined" || !window.Razorpay) return;

  const rzp = new window.Razorpay({
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount,
    currency,
    name: "ZIVA",
    description: "Luxury Skincare & Makeup",
    image: "/Logo.webp",
    order_id: orderId,
    handler: onSuccess,
    prefill,
    theme: { color: "#C9A961" },
    modal: { ondismiss: onDismiss },
  });
  rzp.open();
}
