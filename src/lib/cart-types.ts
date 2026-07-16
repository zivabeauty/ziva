export interface CartItem {
  id: number;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

export interface WishlistItem {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

export interface OrderRecord {
  order_id: string;
  payment_id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  /** JSON string of { name, qty, size, price }[] */
  products: string;
  total_amount: number;
  payment_status: "pending" | "paid" | "dispatched" | "delivered" | "cancelled";
  payment_method?: string;
  order_source?: string;
  tracking_id?: string;
  time_stamp: string;
}
