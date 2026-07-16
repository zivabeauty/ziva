"use client";

import { useMemo } from "react";
import {
  useCartStore,
  selectCartCount,
  selectCartTotals,
} from "@/features/cart/store/cart.store";

export function useCart() {
  const items = useCartStore((s) => s.items);
  const promoCode = useCartStore((s) => s.promoCode);
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const setPromoCode = useCartStore((s) => s.setPromoCode);
  const clearPromoCode = useCartStore((s) => s.clearPromoCode);

  const count = useMemo(() => selectCartCount(items), [items]);
  const totals = useMemo(() => selectCartTotals(items, promoCode), [items, promoCode]);

  return {
    items,
    promoCode,
    count,
    totals,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    setPromoCode,
    clearPromoCode,
  };
}
