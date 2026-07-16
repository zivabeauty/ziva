import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { WishlistItem } from "@/lib/cart-types";
import { createLegacyArrayStorage } from "@/lib/persist-storage";

interface WishlistState {
  items: WishlistItem[];
  toggle: (item: WishlistItem) => void;
  remove: (id: number) => void;
  has: (id: number) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (item) => {
        const exists = get().items.some((w) => w.id === item.id);
        set({
          items: exists
            ? get().items.filter((w) => w.id !== item.id)
            : [...get().items, item],
        });
      },
      remove: (id) => set((s) => ({ items: s.items.filter((w) => w.id !== id) })),
      has: (id) => get().items.some((w) => w.id === id),
    }),
    {
      name: "ziva_wishlist_v1",
      storage: createJSONStorage(() => createLegacyArrayStorage()),
    }
  )
);
