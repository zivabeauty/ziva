import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "@/lib/cart-types";
import { computeTotals } from "@/lib/pricing";
import { createLegacyArrayStorage } from "@/lib/persist-storage";

interface CartState {
  items: CartItem[];
  promoCode: string;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  updateQuantity: (id: number, size: string, delta: number) => void;
  removeItem: (id: number, size: string) => void;
  clearCart: () => void;
  setPromoCode: (code: string) => void;
  clearPromoCode: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: "",
      addItem: (item) => {
        const qty = item.quantity ?? 1;
        set((s) => {
          const exists = s.items.find((i) => i.id === item.id && i.size === item.size);
          if (exists) {
            return {
              items: s.items.map((i) =>
                i.id === item.id && i.size === item.size
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              ),
            };
          }
          return { items: [...s.items, { ...item, quantity: qty }] };
        });
      },
      updateQuantity: (id, size, delta) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.id === id && i.size === size
              ? { ...i, quantity: Math.max(1, i.quantity + delta) }
              : i
          ),
        })),
      removeItem: (id, size) =>
        set((s) => ({ items: s.items.filter((i) => !(i.id === id && i.size === size)) })),
      clearCart: () => set({ items: [], promoCode: "" }),
      setPromoCode: (code) => set({ promoCode: code }),
      clearPromoCode: () => set({ promoCode: "" }),
    }),
    {
      name: "ziva_cart_v2",
      storage: createJSONStorage(() => createLegacyArrayStorage()),
    }
  )
);

export function selectCartCount(items: CartItem[]) {
  return items.reduce((acc, i) => acc + i.quantity, 0);
}

export function selectCartTotals(items: CartItem[], promoCode: string) {
  return computeTotals(
    items.map((i) => ({ unitPrice: i.price, quantity: i.quantity })),
    promoCode
  );
}
