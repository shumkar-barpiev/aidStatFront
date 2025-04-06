import { TModelFilters, TModelPublicFilters } from "@/types/model";

export function replaceFilters(filters?: TModelFilters) {
  return {
    offset: filters?.page != null ? (filters.page - 1) * (filters.pageSize ?? 12) : 0,
    limit: filters?.pageSize ?? 12,
    translate: filters?.translate,
    sortBy: filters?.sortBy ?? ["-id"],
    fields: filters?.fields ?? null,
    data: {
      criteria: filters?.criteria ?? [],
    },
  };
}

export function replacePublicEndpointFilters(filters?: TModelPublicFilters) {
  return {
    offset: filters?.page != null ? (filters.page - 1) * (filters.pageSize ?? 12) : 0,
    limit: filters?.pageSize ?? 12,
    searchString: filters?.searchString ?? "",
    sectorIds: filters?.sectorIds ?? null,
    regionIds: filters?.regionIds ?? null,
    districtIds: filters?.districtIds ?? null,
    cityIds: filters?.cityIds ?? null,
    partnerIds: filters?.partnerIds ?? null,
  };
}
