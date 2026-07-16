import { api } from "@/lib/api";
import type { CheckoutFormValues } from "@/features/checkout/validation/checkout.schema";

export interface CheckoutItem {
  id: number;
  size: string;
  quantity: number;
}

export interface CreateOrderPayload {
  payment: {
    razorpay_order_id: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  };
  shipping: CheckoutFormValues;
  items: CheckoutItem[];
  promoCode?: string;
}

export interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  mock?: boolean;
  totals?: { total: number };
}

export interface RecordOrderResponse {
  ok: boolean;
  orderId: string;
  amount: number;
}

export const checkoutApi = {
  createRazorpayOrder: (items: CheckoutItem[], promoCode?: string) =>
    api.post<RazorpayOrderResponse>("/razorpay", { items, promoCode }),
  recordOrder: (payload: CreateOrderPayload) =>
    api.post<RecordOrderResponse>("/orders", payload),
};
