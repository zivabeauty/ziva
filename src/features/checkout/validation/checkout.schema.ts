import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(2, "Full name is required."),
  email: z.string().email("Enter a valid email address."),
  phone: z
    .string()
    .min(10, "Enter a valid phone number.")
    .regex(/^[+\d\s-]{10,15}$/, "Enter a valid phone number."),
  address: z.string().min(5, "Delivery address is required."),
  city: z.string().min(2, "City is required."),
  state: z.string().min(2, "State is required."),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode."),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
