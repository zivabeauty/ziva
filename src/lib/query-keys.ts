/** Central TanStack Query key factory — server state only. */
export const queryKeys = {
  products: {
    all: ["products"] as const,
    lists: () => [...queryKeys.products.all, "list"] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.products.lists(), filters ?? {}] as const,
    details: () => [...queryKeys.products.all, "detail"] as const,
    detail: (id: number | string) => [...queryKeys.products.details(), id] as const,
  },
  categories: {
    all: ["categories"] as const,
    list: () => [...queryKeys.categories.all, "list"] as const,
  },
  orders: {
    all: ["orders"] as const,
    lists: () => [...queryKeys.orders.all, "list"] as const,
    detail: (id: string) => [...queryKeys.orders.all, "detail", id] as const,
    track: (id: string) => [...queryKeys.orders.all, "track", id] as const,
  },
  admin: {
    session: ["admin", "session"] as const,
    orders: ["admin", "orders"] as const,
    products: ["admin", "products"] as const,
  },
} as const;
