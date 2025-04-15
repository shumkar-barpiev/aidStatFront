import { create } from "zustand";
import { http } from "@/utils/http.ts";

export interface ChartDataSum {
  name: string;
  grantAmounts: string;
  creditAmounts: string;
}

export interface ChartDataCount {
  name: string;
  projectCount: string;
}

export interface ProjectChartData {
  title: string;
  total: string;
  unit: string;
  data: ChartDataSum[] | ChartDataCount[];
}

export interface CorrelationDataByRegion extends ProjectChartData {
  regionName: string;
}

export interface CorrelationDataBySector extends ProjectChartData {
  sectorName: string;
}

const initialStore = {
  loading: false,
  error: null,
  topSectorsByProjectCount: null,
  topSectorsByInvestment: null,
  topDonorsByInvestment: null,
  topDonorsByProjectCount: null,
  topImplementingAgenciesByProjectCount: null,
  topExecutiveAgenciesByProjectCount: null,
  topDonorsByInvestmentBySector: null,
  topDonorsByInvestmentByRegion: null,
};

export const useProjectCardsStore = create<{
  loading: boolean;
  error: string | null;
  topSectorsByProjectCount: ProjectChartData | null;
  fetchTopSectorsByProjectCount: (params?: { download?: boolean }) => void;
  topSectorsByInvestment: ProjectChartData | null;
  fetchTopSectorsByInvestment: (params?: { download?: boolean }) => Promise<void>;
  topDonorsByInvestment: ProjectChartData | null;
  fetchTopDonorsByInvestment: (params?: { download?: boolean }) => Promise<void>;
  topDonorsByProjectCount: ProjectChartData | null;
  fetchTopDonorsByProjectCount: (params?: { download?: boolean }) => Promise<void>;
  topImplementingAgenciesByProjectCount: ProjectChartData | null;
  fetchTopImplementingAgenciesByProjectCount: (params?: { download?: boolean }) => Promise<void>;
  topExecutiveAgenciesByProjectCount: ProjectChartData | null;
  fetchTopExecutiveAgenciesByProjectCount: (params?: { download?: boolean }) => Promise<void>;
  topDonorsByInvestmentBySector: CorrelationDataBySector | null;
  fetchTopDonorsByInvestmentBySector: (sectorId: string, params?: { download?: boolean }) => Promise<void>;
  topDonorsByInvestmentByRegion: CorrelationDataByRegion | null;
  fetchTopDonorsByInvestmentByRegion: (regionId: string, params?: { download?: boolean }) => Promise<void>;
  downloadDataAsFile: (response: Response) => void;
  clearStore: () => void;
}>((set, get) => ({
  ...initialStore,

  downloadDataAsFile: async (response: Response, filename = "data.csv") => {
    console.log("downloading");
  },

  fetchTopSectorsByProjectCount: async (params?: { download?: boolean }) => {
    try {
      const response = await http("/ws/public/stat/project/count/sector", { method: "GET", withoutAuth: true });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

      const topSectorsByProjectCount: ProjectChartData = await response.json();

      set(() => ({ error: null, topSectorsByProjectCount }));
    } catch (e: any) {
      set({ error: e?.message });
    }
  },

  fetchTopSectorsByInvestment: async (params?: { download?: boolean }) => {
    try {
      const response = await http("/ws/public/stat/project/sector/sum", { method: "GET", withoutAuth: true });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

      const topSectorsByInvestment: ProjectChartData = await response.json();

      set(() => ({ error: null, topSectorsByInvestment }));
    } catch (e: any) {
      set({ error: e?.message });
    }
  },

  fetchTopDonorsByInvestment: async (params?: { download?: boolean }) => {
    try {
      const response = await http("/ws/public/stat/project/donor/sum", { method: "GET", withoutAuth: true });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

      const topDonorsByInvestment: ProjectChartData = await response.json();

      set(() => ({ error: null, topDonorsByInvestment }));
    } catch (e: any) {
      set({ error: e?.message });
    }
  },

  fetchTopDonorsByProjectCount: async (params?: { download?: boolean }) => {
    try {
      const response = await http("/ws/public/stat/project/count/donor", { method: "GET", withoutAuth: true });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

      const topDonorsByProjectCount: ProjectChartData = await response.json();

      set(() => ({ error: null, topDonorsByProjectCount }));
    } catch (e: any) {
      set({ error: e?.message });
    }
  },

  fetchTopImplementingAgenciesByProjectCount: async (params?: { download?: boolean }) => {
    try {
      const response = await http("/ws/public/stat/project/count/implementer", { method: "GET", withoutAuth: true });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

      const topImplementingAgenciesByProjectCount: ProjectChartData = await response.json();

      set(() => ({ error: null, topImplementingAgenciesByProjectCount }));
    } catch (e: any) {
      set({ error: e?.message });
    }
  },

  fetchTopExecutiveAgenciesByProjectCount: async (params?: { download?: boolean }) => {
    try {
      const response = await http("/ws/public/stat/project/count/contractor", { method: "GET", withoutAuth: true });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

      const topExecutiveAgenciesByProjectCount: ProjectChartData = await response.json();

      set(() => ({ error: null, topExecutiveAgenciesByProjectCount }));
    } catch (e: any) {
      set({ error: e?.message });
    }
  },

  fetchTopDonorsByInvestmentBySector: async (sectorId: string, params?: { download?: boolean }) => {
    try {
      const response = await http(`/ws/public/stat/project/sector/${sectorId}`, { method: "GET", withoutAuth: true });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

      const topDonorsByInvestmentBySector = await response.json();
      set(() => ({ error: null, topDonorsByInvestmentBySector }));
    } catch (e: any) {
      set({ error: e?.message });
    }
  },

  fetchTopDonorsByInvestmentByRegion: async (regionId: string, params?: { download?: boolean }) => {
    try {
      const response = await http(`/ws/public/stat/project/region/${regionId}`, { method: "GET", withoutAuth: true });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

      const topDonorsByInvestmentByRegion = await response.json();
      set(() => ({ error: null, topDonorsByInvestmentByRegion }));
    } catch (e: any) {
      set({ error: e?.message });
    }
  },
  clearStore: () => {
    set(initialStore);
  },
}));
