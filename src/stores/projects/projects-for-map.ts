import { create } from "zustand";
import { http } from "@/utils/http";
import { ApiProjectsForMap } from "@/types/types";

export interface ProjectMapFilters {
  regionIds?: number[] | null;
  sectorIds?: number[] | null;
  partnerIds?: number[] | null;
}

interface ProjectsMapState {
  loading: boolean;
  error: string | null;
  projects: ApiProjectsForMap | null;
  mapFilters: ProjectMapFilters;
  fetchProjects: (filters?: ProjectMapFilters) => Promise<void>;
  setFilters: (filters: ProjectMapFilters) => void;
}

export const useProjectsMapStore = create<ProjectsMapState>((set, get) => ({
  loading: false,
  error: null,
  projects: null,
  mapFilters: {},

  fetchProjects: async (mapFilters = get().mapFilters) => {
    set({ loading: true });

    try {
      const response = await http("/ws/public/projects", {
        method: "POST",
        withoutAuth: true,
        body: JSON.stringify(mapFilters),
      });

      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }

      const responseData: ApiProjectsForMap = await response.json();

      set({
        projects: responseData,
        error: null,
        mapFilters,
      });
    } catch (error: any) {
      set({ error: error.message, projects: null });
    } finally {
      set({ loading: false });
    }
  },

  setFilters: (mapFilters: ProjectMapFilters) => {
    set({ mapFilters });
  },
}));
