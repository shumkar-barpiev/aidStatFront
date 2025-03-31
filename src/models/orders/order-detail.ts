import { z } from "zod";
import { ProductModel } from "../products/product";
import { OrderModel } from "./order";
import { CurrencyModel } from "../dictionaries/currency";

export const OrderDetailModel = z.object({
  id: z.number().int().positive().optional(),
  qty: z.number().int().positive().optional(),
  listPrice: z.number().positive().optional(),
  unitPrice: z.number().positive().optional(),
  description: z.string().trim().optional(),
  productName: z.string().trim(),
  status: z.string().trim().nullable().optional(),
  listPriceCur: CurrencyModel,
  saleOrder: OrderModel,
  product: ProductModel,
});

export type TOrderDetailModel = z.infer<typeof OrderDetailModel>;
