import { api } from "@/lib/api";
import type { TrackOrderResponse } from "@/features/orders/types/order.types";

export const ordersApi = {
  track: (id: string) => api.get<TrackOrderResponse>(`/orders/track?id=${encodeURIComponent(id)}`),
};
