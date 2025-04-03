import { z } from "zod";

export const PartnerModel = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().trim().optional(),
  description: z.string().trim().optional(),
});

export type TPartnerModel = z.infer<typeof PartnerModel>;
