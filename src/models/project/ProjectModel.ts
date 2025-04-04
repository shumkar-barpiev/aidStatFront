import { z } from "zod";

export const ProjectModel = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().trim().optional(),
  description: z.string().trim().optional(),
  funding: z.string().trim().optional().nullable(),
  totalSum: z.string().trim().optional().nullable(),
  status: z.string().trim().optional(),
  startDate: z.string().trim().optional().nullable(),
  endDate: z.string().trim().optional().nullable(),

  geographicalCoverage: z
    .object({
      id: z.number().int().positive(),
      name: z.string().trim(),
    })
    .optional()
    .nullable(),

  timeLine: z
    .object({
      startDate: z.string().trim(),
      endDate: z.string().trim(),
    })
    .optional()
    .nullable(),

  partners: z
    .array(
      z.object({
        id: z.number().int().positive(),
        name: z.string().trim().optional().nullable(),
        image: z.string().trim().optional().nullable(),
      })
    )
    .optional()
    .nullable(),
  sectors: z
    .array(
      z.object({
        id: z.number().int().positive(),
        name: z.string().trim().optional(),
        type: z.string().trim().optional(),
        projectCount: z.number().int().positive(),
      })
    )
    .optional()
    .nullable(),

  contractors: z
    .array(
      z.object({
        id: z.number().int().positive(),
        name: z.string().trim(),
      })
    )
    .optional()
    .nullable(),

  implementors: z
    .array(
      z.object({
        id: z.number().int().positive(),
        name: z.string().trim(),
      })
    )
    .optional()
    .nullable(),
});

export type TProjectModel = z.infer<typeof ProjectModel>;

export enum EProjectModelFilter {
  search = "search",
}
