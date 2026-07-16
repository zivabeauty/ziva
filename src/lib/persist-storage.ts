import type { StateStorage } from "zustand/middleware";

/** Migrates legacy localStorage arrays (pre-Zustand) into persist format. */
export function createLegacyArrayStorage(): StateStorage {
  return {
    getItem: (name) => {
      if (typeof window === "undefined") return null;
      try {
        const raw = window.localStorage.getItem(name);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return JSON.stringify({
            state: name.includes("cart")
              ? { items: parsed, promoCode: "" }
              : { items: parsed },
            version: 0,
          });
        }
        return raw;
      } catch {
        return null;
      }
    },
    setItem: (name, value) => {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(name, value);
    },
    removeItem: (name) => {
      if (typeof window === "undefined") return;
      window.localStorage.removeItem(name);
    },
  };
}
