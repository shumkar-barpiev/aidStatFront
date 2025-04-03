import { z } from "zod";

export const ProjectModel = z.object({
  id: z.number().int().positive().optional(),
  title: z.string().trim().optional(),
  sector: z.string().trim().optional(),
  endDate: z.string().trim().optional(),
  description: z.string().trim().optional(),
  partners: z.string().trim().optional(),
  startDate: z.string().trim().optional(),
  budget: z.string().trim().optional(),
  status: z.string().trim().optional(),
});

export type TProjectModel = z.infer<typeof ProjectModel>;
