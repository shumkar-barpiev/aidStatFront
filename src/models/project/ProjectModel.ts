import { z } from "zod";

export const ProjectModel = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().trim().optional(),
  description: z.string().trim().optional(),
  totalSum: z.string().trim().optional().nullable(),
  status: z.string().trim().optional(),
  startDate: z.string().trim().optional().nullable(),
  endDate: z.string().trim().optional().nullable(),

  funding: z
    .object({
      coFundingSum: z.string().trim(),
      fundsSpent: z.string().trim(),
      fundsSpentCurrentYear: z.string().trim(),
      techAidSum: z.string().trim(),
      totalSum: z.string().trim(),
      items: z
        .array(
          z.object({
            number: z.string().trim(),
            partnerName: z.string().trim(),
            totalSum: z.string().trim(),
            totalSumForeign: z.string().trim(),
            type: z.string().trim(),
          })
        )
        .nullable(),
    })
    .optional()
    .nullable(),

  timeLine: z
    .object({
      startDate: z.string().trim(),
      endDate: z.string().trim(),
      events: z
        .array(
          z.object({
            name: z.string().trim().optional().nullable(),
            eventDate: z.string().trim().optional().nullable(),
          })
        )
        .optional()
        .nullable(),
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
  geographicalCoverage: z
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
  filterSector = "sector",
  filterPartner = "partner",
  filterCoverage = "coverage",
}
