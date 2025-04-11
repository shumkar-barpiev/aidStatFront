import { z } from "zod";

export const PartnerModel = z.object({
  id: z.number().int().positive(),
  name: z.string().trim().optional(),
  image: z.string().trim().optional(),
  grant: z.string().trim().optional(),
  credit: z.string().trim().optional(),
  address: z.string().trim().optional(),
  website: z.string().trim().optional(),
  fixedPhone: z.string().trim().optional(),
  mobilePhone: z.string().trim().optional(),
  description: z.string().trim().optional(),
  identificationNumber: z.string().trim().optional(),
  projectCount: z.number().int().positive().optional(),
});

export type TPartnerModel = z.infer<typeof PartnerModel>;

export enum EPartnerModelFilter {
  search = "search",
}
