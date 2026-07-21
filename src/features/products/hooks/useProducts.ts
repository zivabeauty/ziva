"use client";

import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/data/beautyData";
import { queryKeys } from "@/lib/query-keys";
import { productsService } from "@/features/products/services/products.service";

export function useProducts() {
  const query = useQuery({
    queryKey: queryKeys.products.lists(),
    queryFn: () => productsService.getAll(),
  });

  return {
    products: (query.data ?? []) as Product[],
    loading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productsService.getById(id),
    enabled: Number.isFinite(id) && id > 0,
  });
}
