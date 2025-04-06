import { z } from "zod";

export const PartnerModel = z.object({
  id: z.number().int().positive(),
  name: z.string().trim().optional(),
  projectCount: z.number().int().positive().optional(),
});

export type TPartnerModel = z.infer<typeof PartnerModel>;

export enum EPartnerModelFilter {
  search = "search",
}
