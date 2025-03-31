import { z } from "zod";

export const UserModel = z.object({
  id: z.number().int().positive(),
  version: z.number().int().positive().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  mobilePhone: z.string().optional(),
  dateOfBirth: z.string().optional(),
});

export type TUserModel = z.infer<typeof UserModel>;
