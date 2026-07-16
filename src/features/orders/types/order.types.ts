import type { OrderRecord } from "@/lib/cart-types";

export type { OrderRecord };

export interface TrackOrderResponse extends Partial<OrderRecord> {}
