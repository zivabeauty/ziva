import { checkoutApi } from "@/features/checkout/api/checkout.api";
import type { CreateOrderPayload, CheckoutItem } from "@/features/checkout/api/checkout.api";

export const checkoutService = {
  createPaymentOrder: async (items: CheckoutItem[], promoCode?: string) => {
    const { data } = await checkoutApi.createRazorpayOrder(items, promoCode);
    return data;
  },
  recordOrder: async (payload: CreateOrderPayload) => {
    const { data } = await checkoutApi.recordOrder(payload);
    return data;
  },
};
