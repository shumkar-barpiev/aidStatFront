"use client";

import { ChangeEvent, useEffect } from "react";
import { TProjectModelFilters, useProjectsStore } from "@/stores/projects/projects";
import { EProjectModelFilter } from "@/models/project/ProjectModel";

let timer: ReturnType<typeof setTimeout> | null;

export const useProjectsViewModel = () => {
  const { filters: projectsFilter, setFilters, fetchItems, fetchItem } = useProjectsStore();

  const handleProjectsPageChange = (e: ChangeEvent<unknown>, page: number) => {
    setFilters({ page });
  };

  const handleFilter = (type: EProjectModelFilter, searchText?: string | number | number[] | Record<string, any>) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      const update: Partial<TProjectModelFilters> = { page: 1 };

      switch (type) {
        case EProjectModelFilter.search:
          update.searchString = (searchText as string) ?? "";
          break;
        case EProjectModelFilter.filterSector:
          update.sectorIds = Array.isArray(searchText) && searchText.length > 0 ? (searchText as number[]) : null;
          break;
        case EProjectModelFilter.filterPartner:
          update.partnerIds = Array.isArray(searchText) && searchText.length > 0 ? (searchText as number[]) : null;
          break;
        case EProjectModelFilter.filterCoverage:
          if (typeof searchText === "object" && !Array.isArray(searchText)) {
            update.districtIds = searchText.districtIds ?? null;
            update.regionIds = searchText.regionIds ?? null;
          }
          break;
      }

      setFilters(update);
      timer = null;
    }, 500);
  };

  const getProjectSectorsTitle = (sectors: Record<string, any>[]) => {
    if (!sectors || sectors.length === 0) return "";

    return sectors.map((sector) => sector.name).join(", ");
  };

  const getProjectRegionsTitle = (regions: Record<string, any>[]) => {
    if (!regions || regions.length === 0) return "";

    return regions.map((region) => region?.region?.name).join(", ");
  };

  const getProjectPartnersTitle = (partners: Record<string, any>[]) => {
    if (!partners || partners.length === 0) return "";

    return partners.map((partner) => partner?.name).join(", ");
  };

  const fetchProject = (id: number) => {
    fetchItem(id);
  };

  useEffect(() => {
    fetchItems(projectsFilter);
  }, [projectsFilter]);

  return {
    handleFilter,
    fetchProject,
    projectsFilter,
    getProjectRegionsTitle,
    getProjectSectorsTitle,
    getProjectPartnersTitle,
    handleProjectsPageChange,
  };
};
