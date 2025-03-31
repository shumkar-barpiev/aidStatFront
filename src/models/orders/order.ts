import { z } from "zod";

export const OrderModel = z.object({
  id: z.number().int().positive().optional(),
});

export type TOrderModel = z.infer<typeof OrderModel>;
