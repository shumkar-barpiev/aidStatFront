import { z } from "zod";

type ContractModelForMapType = {
  id: number;
  locationName: string;
  totalContracts: number;
  goodsContracts: number;
  infrastructureContracts: number;
  lowBudget: number;
  mediumBudget: number;
  highBudget: number;
  includes: ContractModelForMapType[] | null;
};

const ContractModelForMap: z.ZodType<ContractModelForMapType> = z.lazy(() =>
  z.object({
    id: z.number().int(),
    locationName: z.string().trim(),
    totalContracts: z.number(),
    goodsContracts: z.number(),
    infrastructureContracts: z.number(),
    lowBudget: z.number().int(),
    mediumBudget: z.number().int(),
    highBudget: z.number().int(),
    includes: z.array(ContractModelForMap).nullable(),
  })
);

export type TContractModelForMap = z.infer<typeof ContractModelForMap>;

const DonorModel = z.object({
  id: z.number(),
  name: z.string().trim(),
  image: z.number(),
});

const ImplementerModel = z.object({
  id: z.number(),
  name: z.string().trim(),
  image: z.number(),
});

const ProjectModel = z.object({
  id: z.number(),
  name: z.string().trim(),
});

const ContractItemModel = z.object({
  id: z.number(),
  name: z.string().trim(),
  amount: z.string().trim(), // если нужно число, можешь использовать z.preprocess
  unit: z.string().trim(),
  status: z.string().trim(),
  donors: z.array(DonorModel),
  implementers: z.array(ImplementerModel),
  project: ProjectModel,
  contractType: z.string().trim(),
  address: z.string().trim(),
});

export const ContractModelForTable = z.object({
  total: z.number(),
  updateTime: z.string().trim(),
  data: z.array(ContractItemModel),
});

export type TContractModelForTable = z.infer<typeof ContractModelForTable>;
