import { api } from "@/lib/api";
import type { CategoriesResponse } from "@/features/categories/types/category.types";

export const categoriesApi = {
  list: () => api.get<CategoriesResponse>("/categories"),
};
