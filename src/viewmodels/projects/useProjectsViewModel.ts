"use client";

import { TModelFilters } from "@/types/model";
import { ChangeEvent, useEffect, useState } from "react";
import { useProjectsStore } from "@/stores/projects/projects";
import { TProjectModel, EProjectModelFilter } from "@/models/project/ProjectModel";

let timer: ReturnType<typeof setTimeout> | null;

const initialFilters: () => TModelFilters = () => {
  return {
    page: 1,
    pageSize: 16,
  };
};

export const useProjectsViewModel = () => {
  const projectStore = useProjectsStore();
  const [projects, setProjects] = useState<TProjectModel[]>([]);
  const [projectItemsPageTotal, setProjectItemsPageTotal] = useState(0);
  const [projectsFilter, setProjectsFilter] = useState<TModelFilters>({
    ...initialFilters(),
  });

  const handleProcessItemsPageChange = (e: ChangeEvent<unknown>, page: number) => {
    setProjectsFilter((prev) => ({ ...prev, page }));
  };

  const handleFilter = (type: EProjectModelFilter, searchText?: string | number) => {
    if (timer != null) {
      clearTimeout(timer);
    }

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
      }
    }, 500);
  };

  useEffect(() => {
    projectStore.fetchItems(projectsFilter, (data: Record<string, any>) => {
      const pageTotal =
        data.total != null && projectsFilter?.pageSize != null ? Math.ceil(data.total / projectsFilter?.pageSize) : 0;
      setProjectItemsPageTotal(pageTotal);
      if (pageTotal > 0) setProjects(data.projects);
    });
  }, [projectsFilter]);

  const getProjectSectorsTitle = (sectors: Record<string, any>[]) => {
    if (!sectors || sectors.length === 0) return "";

    return sectors.map((sector) => sector.name).join(", ");
  };

  return {
    projects,
    handleFilter,
    projectsFilter,
    projectItemsPageTotal,
    getProjectSectorsTitle,
    handleProcessItemsPageChange,
  };
};
