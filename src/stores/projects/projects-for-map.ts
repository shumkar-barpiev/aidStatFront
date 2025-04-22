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
  filters: ProjectMapFilters;
  fetchProjects: (filters?: ProjectMapFilters) => Promise<void>;
  setFilters: (filters: ProjectMapFilters) => void;
}

export const useProjectsMapStore = create<ProjectsMapState>((set, get) => ({
  loading: false,
  error: null,
  projects: null,
  filters: {},

  fetchProjects: async (filters = get().filters) => {
    set({ loading: true });

    try {
      const response = await http("/ws/public/projects", {
        method: "POST",
        withoutAuth: true,
        body: JSON.stringify(filters),
      });

      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }

      const responseData: ApiProjectsForMap = await response.json();

      set({
        projects: responseData,
        error: null,
        filters,
      });
    } catch (error: any) {
      set({ error: error.message, projects: null });
    } finally {
      set({ loading: false });
    }
  },

  setFilters: (filters: ProjectMapFilters) => {
    set({ filters });
  },
}));