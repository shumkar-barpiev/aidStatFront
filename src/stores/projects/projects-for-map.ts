import { create } from "zustand";
import { http } from "@/utils/http.ts";
import projectsMok from "../../components/maps/projectsLocations.json";
import { ProjectFeature, ProjectFeatureCollection } from "@/types/types";

interface ProjectState {
  loading: boolean;
  error: string | null;
  projects: ProjectFeatureCollection | null;
  filteredProjects: ProjectFeature[];
  filterByLocationName: string | null;
  filterBySector: string | null;
  filterByDonor: string | null;
  fetchProjects: () => Promise<void>;
  filterProjects: () => void;
  setFilterBySector: (sector?: string) => void;
  setFilterByLocationName: (locationName?: string) => void;
  setFilterByDonor: (donor?: string) => void;
}

export const useProjectsStore = create<ProjectState>((set, get) => ({
  loading: false,
  error: null,
  projects: projectsMok,
  filteredProjects: projectsMok.features,
  filterByLocationName: null,
  filterBySector: null,
  filterByDonor: null,

  fetchProjects: async () => {
    set({ loading: true });
    try {
      const response = await http("/ws/public/projects", {
        method: "GET",
      });
      if (!response.ok) throw new Error(`Ошибка ${response.status}: ${response.statusText}`);

      const data: ProjectFeatureCollection = await response.json();
      set({ projects: data, filteredProjects: data.features, error: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  setFilterBySector: (sector) => {
    set({
      filterBySector: sector === "all" ? null : sector,
    });
    get().filterProjects();
  },

  setFilterByLocationName: (locationName) => {
    set({
      filterByLocationName: locationName === "all" ? null : locationName,
    });
    get().filterProjects();
  },

  setFilterByDonor: (donor) => {
    set({
      filterByDonor: donor === "all" ? null : donor,
    });
    get().filterProjects();
  },

  filterProjects: () => {
    const { projects, filterBySector, filterByLocationName, filterByDonor } = get();

    if (!projects) return;

    const filtered = projects.features.filter((project: ProjectFeature) => {
      const matchesSector = filterBySector ? project.properties?.sectors.includes(filterBySector) : true;
      const matchesRegion = filterByLocationName ? project.properties?.location_name === filterByLocationName : true;
      const matchesDonor = filterByDonor ? project.properties?.donors.includes(filterByDonor) : true;

      return matchesSector && matchesRegion && matchesDonor;
    });

    set({ filteredProjects: filtered });
  },
}));
