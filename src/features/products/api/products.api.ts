import { api } from "@/lib/api";
import type { ProductResponse, ProductsResponse } from "@/features/products/types/product.types";

export const productsApi = {
  list: () => api.get<ProductsResponse>("/products"),
  byId: (id: number) => api.get<ProductResponse>(`/products/${id}`),
};
