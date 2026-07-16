"use client";

import { useQuery } from "@tanstack/react-query";
import { products as staticProducts } from "@/data/beautyData";
import { queryKeys } from "@/lib/query-keys";
import { productsService } from "@/features/products/services/products.service";

export function useProducts() {
  const query = useQuery({
    queryKey: queryKeys.products.lists(),
    queryFn: () => productsService.getAll(),
    placeholderData: staticProducts,
  });

  return {
    products: query.data ?? staticProducts,
    loading: query.isLoading && query.data === undefined,
  };
}

export function useProduct(id: number) {
  const fallback = staticProducts.find((p) => p.id === id);
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productsService.getById(id),
    enabled: Number.isFinite(id) && id > 0,
    placeholderData: fallback,
  });
}
