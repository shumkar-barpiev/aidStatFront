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
      const response = await http("/ws/rest/com.axelor.team.db.TeamTask/search", {
        method: "GET",
      });
      if (!response.ok) throw new Error(`Ошибка ${response.status}: ${response.statusText}`);

      const data: ProjectFeatureCollection = await response.json();
      set({ projects: data, filteredProjects: data.features, error: null });
    } catch (error: any) {
      set({ error: error.message, projects: null, filteredProjects: [] });
    } finally {
      set({ loading: false });
    }
  },

  setFilterBySector: (sector) => {
    set({ filterBySector: sector ?? null });
    get().filterProjects();
  },

  setFilterByLocationName: (locationName) => {
    set({ filterByLocationName: locationName ?? null });
    get().filterProjects();
  },

  setFilterByDonor: (donor) => {
    set({ filterByDonor: donor ?? null });
    get().filterProjects();
  },

  filterProjects: () => {
    const { projects, filterBySector, filterByLocationName, filterByDonor } = get();
    console.log("WE ARE IN FILTER PROJECT", projects);

    if (!projects) return;

    const filtered = projects.features.filter((project: ProjectFeature) => {
      const matchesSector = filterBySector ? project.properties?.sectors.includes(filterBySector) : true;
      const matchesRegion = filterByLocationName ? project.properties?.location_name === filterByLocationName : true;
      const matchesDonor = filterByDonor ? project.properties?.donors.includes(filterByDonor) : true;

      console.log("WE ARE IN FILTER PROJECT STEP 2");
      return matchesSector && matchesRegion && matchesDonor;
    });

    set({ filteredProjects: filtered });
  },
}));
