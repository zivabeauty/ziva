"use client";

import { useQuery } from "@tanstack/react-query";
import { categories as staticCategories } from "@/data/beautyData";
import { queryKeys } from "@/lib/query-keys";
import { categoriesService } from "@/features/categories/services/categories.service";

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: () => categoriesService.getAll(),
    placeholderData: staticCategories,
  });
}
