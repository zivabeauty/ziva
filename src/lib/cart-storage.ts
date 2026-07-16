import type { CartItem, WishlistItem } from "./cart-types";

/**
 * localStorage persistence for the cart and wishlist so they survive
 * reloads and cross-page navigation. Safe to call during SSR (no-ops).
 */

const CART_KEY = "ziva_cart_v1";
const WISHLIST_KEY = "ziva_wishlist_v1";

function load<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function save<T>(key: string, items: T[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // Storage full or blocked — cart still works in memory.
  }
}

export const loadCart = () => load<CartItem>(CART_KEY);
export const saveCart = (items: CartItem[]) => save(CART_KEY, items);
export const loadWishlist = () => load<WishlistItem>(WISHLIST_KEY);
export const saveWishlist = (items: WishlistItem[]) => save(WISHLIST_KEY, items);
