"use client";

import { useState } from "react";
import { useCart } from "@/features/cart/hooks/useCart";
import { useUiStore } from "@/store/ui.store";
import { checkoutService } from "@/features/checkout/services/checkout.service";
import {
  loadRazorpayScript,
  openRazorpayCheckout,
  type RazorpaySuccess,
} from "@/features/checkout/services/razorpay.service";

export type CheckoutStep = "cart" | "shipping";

export interface ShippingDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CheckoutSuccess {
  paymentId: string;
  orderId: string;
  amount: number;
  pending?: boolean;
}

const EMPTY_SHIPPING: ShippingDetails = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

/**
 * Orchestrates the cart → shipping → payment flow. Owns the multi-step state,
 * shipping validation and Razorpay handoff, delegating network calls to
 * `checkoutService` and the popup to `razorpay.service`.
 */
export function useCheckout() {
  const { items: cartItems, promoCode: appliedPromoCode, clearCart } = useCart();
  const closeDrawer = useUiStore((s) => s.closeDrawer);

  const [step, setStep] = useState<CheckoutStep>("cart");
  const [shipping, setShipping] = useState<ShippingDetails>(EMPTY_SHIPPING);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<CheckoutSuccess | null>(null);

  const updateShipping = (patch: Partial<ShippingDetails>) =>
    setShipping((prev) => ({ ...prev, ...patch }));

  const recordOrder = async (payment: {
    razorpay_order_id: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  }) =>
    checkoutService.recordOrder({
      payment,
      shipping,
      items: cartItems.map((i) => ({ id: i.id, size: i.size, quantity: i.quantity })),
      promoCode: appliedPromoCode,
    });

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setIsProcessing(true);
    setError("");

    try {
      // The server recomputes the amount from item ids + quantities.
      const order = await checkoutService.createPaymentOrder(
        cartItems.map((i) => ({ id: i.id, size: i.size, quantity: i.quantity })),
        appliedPromoCode
      );

      // Demo mode (no live Razorpay keys): record the order as pending so the
      // full flow can be exercised without a real payment.
      if (order.mock) {
        const saved = await recordOrder({ razorpay_order_id: order.id });
        setSuccess({ paymentId: "—", orderId: saved.orderId, amount: saved.amount, pending: true });
        clearCart();
        closeDrawer("cart");
        setStep("cart");
        return;
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Razorpay failed to load. Please check your internet connection.");
      }

      openRazorpayCheckout({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        prefill: { name: shipping.name, email: shipping.email, contact: shipping.phone },
        onSuccess: async (paymentResult: RazorpaySuccess) => {
          try {
            const saved = await recordOrder(paymentResult);
            setSuccess({
              paymentId: paymentResult.razorpay_payment_id,
              orderId: saved.orderId,
              amount: saved.amount,
            });
            clearCart();
            closeDrawer("cart");
            setStep("cart");
          } catch (err) {
            console.error("Order recording failed:", err);
            setError(
              `Payment succeeded (id ${paymentResult.razorpay_payment_id}) but the order could not be saved. Please contact support.`
            );
          } finally {
            setIsProcessing(false);
          }
        },
        onDismiss: () => setIsProcessing(false),
      });
      return;
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An error occurred during checkout. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const proceed = () => {
    setError("");
    if (step === "cart") {
      setStep("shipping");
      return;
    }
    if (
      !shipping.name || !shipping.email || !shipping.phone ||
      !shipping.address || !shipping.city || !shipping.state || !shipping.pincode
    ) {
      setError("Please fill in all shipping details before proceeding.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(shipping.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    handleCheckout();
  };

  return {
    step,
    shipping,
    isProcessing,
    error,
    success,
    proceed,
    updateShipping,
    backToCart: () => setStep("cart"),
    dismissSuccess: () => setSuccess(null),
  };
}
