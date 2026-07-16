import { ordersApi } from "@/features/orders/api/orders.api";

export const ordersService = {
  track: async (id: string) => {
    const { data } = await ordersApi.track(id);
    return data;
  },
};
