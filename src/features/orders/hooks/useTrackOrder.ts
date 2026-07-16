"use client";

import { useMutation } from "@tanstack/react-query";
import { ordersService } from "@/features/orders/services/orders.service";

export function useTrackOrderMutation() {
  return useMutation({
    mutationFn: (orderId: string) => ordersService.track(orderId),
  });
}
