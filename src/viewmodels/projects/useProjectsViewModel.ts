"use client";

import { TModelFilters } from "@/types/model";
import { ChangeEvent, useEffect, useState } from "react";
import { useProjectsStore } from "@/stores/projects/projects";
import { EProjectModelFilter } from "@/models/project/ProjectModel";

let timer: ReturnType<typeof setTimeout> | null;

const initialFilters: () => TModelFilters = () => {
  return {
    page: 1,
    pageSize: 16,
  };
};

export const useProjectsViewModel = () => {
  const projectStore = useProjectsStore();
  const [projectsFilter, setProjectsFilter] = useState<TModelFilters>({
    ...initialFilters(),
  });

  const handleProcessItemsPageChange = (e: ChangeEvent<unknown>, page: number) => {
    setProjectsFilter((prev) => ({ ...prev, page }));
  };

  const handleFilter = (type: EProjectModelFilter, searchText?: string | number | number[] | Record<string, any>) => {
    if (timer != null) clearTimeout(timer);

    timer = setTimeout(() => {
      switch (type) {
        case EProjectModelFilter.search:
          setProjectsFilter((prev) => ({
            ...prev,
            page: 1,
            searchString: searchText ?? "",
          }));

          timer = null;
          break;
        case EProjectModelFilter.filterSector:
          setProjectsFilter((prev) => ({
            ...prev,
            page: 1,
            sectorIds: Array.isArray(searchText) && searchText?.length > 0 ? searchText : null,
          }));

          timer = null;
          break;
        case EProjectModelFilter.filterPartner:
          setProjectsFilter((prev) => ({
            ...prev,
            page: 1,
            partnerIds: Array.isArray(searchText) && searchText?.length > 0 ? searchText : null,
          }));

          timer = null;
          break;
        case EProjectModelFilter.filterCoverage:
          if (typeof searchText === "object" && !Array.isArray(searchText) && searchText !== null) {
            setProjectsFilter((prev) => ({
              ...prev,
              page: 1,
              districtIds: searchText.districtIds ?? null,
              regionIds: searchText.regionIds ?? null,
            }));
            timer = null;
            break;
          }
      }
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

  const fetchProject = (id: number) => {
    projectStore.fetchItem(id);
  };

  useEffect(() => {
    projectStore.fetchItems(projectsFilter);
  }, [projectsFilter]);

  return {
    handleFilter,
    fetchProject,
    projectsFilter,
    getProjectRegionsTitle,
    getProjectSectorsTitle,
    handleProcessItemsPageChange,
  };
};
