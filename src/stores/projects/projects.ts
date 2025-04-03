import { create } from "zustand";
import { http } from "@/utils/http.ts";

interface ProjectProperties {
  id: number;
  name: string;
  totalFinancingUsd: number;
  financingPerLocation: number;
  endDate: string;
  donors: string[];
  sectors: string[];
  location_name: string;
}

interface ProjectGeometry {
  type: "Point";
  coordinates: [number, number]; // [долгота, широта]
}

interface Project {
  type: "Feature";
  properties: ProjectProperties;
  geometry: ProjectGeometry;
}

interface ApiProjectData {
  type: "FeatureCollection";
  features: Project[];
}

interface ProjectState {
  loading: boolean;
  error: string | null;
  projects: ApiProjectData | null;
  filteredProjects: Project[];
  region: string | null;
  sector: string | null;
  donor: string | null;
  fetchProjects: () => Promise<void>;
  filterProjects: () => void;
  setFilters: (region?: string, sector?: string, donor?: string) => void;
}

export const useProjectsStore = create<ProjectState>((set, get) => ({
  loading: false,
  error: null,
  projects: null,
  filteredProjects: [],
  region: null,
  sector: null,
  donor: null,

  fetchProjects: async () => {
    set({ loading: true });
    try {
      const response = await http("/ws/rest/com.axelor.team.db.TeamTask/search", {
        method: "GET",
      });
      if (!response.ok) throw new Error(`Ошибка ${response.status}: ${response.statusText}`);

      const data: ApiProjectData = await response.json();
      set({ projects: data, filteredProjects: data.features, error: null });
    } catch (error: any) {
      set({ error: error.message, projects: null, filteredProjects: [] });
    } finally {
      set({ loading: false });
    }
  },

  setFilters: (region, sector, donor) => {
    set({ region: region ?? null, sector: sector ?? null, donor: donor ?? null });
    get().filterProjects();
  },

  filterProjects: () => {
    const { projects, region, sector, donor } = get();

    if (!projects) return;

    const filtered = projects.features.filter((project) => {
      return (
        (!region || project.properties.location_name === region) &&
        (!sector || project.properties.sectors.includes(sector)) &&
        (!donor || project.properties.donors.includes(donor))
      );
    });

    set({ filteredProjects: filtered });
  },
}));
