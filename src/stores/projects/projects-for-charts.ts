import { create } from "zustand";
import { http } from "@/utils/http.ts";
import { exportToExcel } from "@/utils/files/exportToExcel.ts";

export interface ChartDataSum {
  name: string;
  grantAmounts: string;
  creditAmounts: string;
  totalSum: string;
}

export interface ChartDataCount {
  name: string;
  projectCount: number;
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

export interface CorrelationDataByRegionAndSector extends ProjectChartData {
  regionName: string;
  sectorName: string;
}

const initialStore = {
  loading: false,
  error: null,
  loadingState: {
    topSectorsByProjectCount: false,
    topSectorsByInvestment: false,
    topDonorsByInvestment: false,
    topDonorsByProjectCount: false,
    topImplementingAgenciesByProjectCount: false,
    topExecutiveAgenciesByProjectCount: false,
    topDonorsByInvestmentBySector: false,
    topDonorsByInvestmentByRegion: false,
    topDonorsByInvestmentByRegionAndSector: false,
  },
  topSectorsByProjectCount: null,
  topSectorsByInvestment: null,
  topDonorsByInvestment: null,
  topDonorsByProjectCount: null,
  topImplementingAgenciesByProjectCount: null,
  topExecutiveAgenciesByProjectCount: null,
  topDonorsByInvestmentBySector: null,
  topDonorsByInvestmentByRegion: null,
  topDonorsByInvestmentByRegionAndSector: null,
};

const fetchData = async (
  url: string,
  setLoading: (loading: boolean) => void,
  setData: (data: ProjectChartData | CorrelationDataByRegion | CorrelationDataBySector) => void,
  setError: (error: string | null) => void,
  download?: boolean
) => {
  setLoading(true);
  try {
    const api = `${url}`;
    if (download) {
      const url = `${api}?download=${download}`;
      const response = await http(url, { method: "GET", withoutAuth: true });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      const data = await response.json();
      exportToExcel(data.data, "Statistics", data.title);
      return;
    } else {
      const response = await http(api, { method: "GET", withoutAuth: true });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      const data = await response.json();
      setData(data);
    }
  } catch (e: any) {
    setError(e?.message || "Ошибка при загрузке данных");
  } finally {
    setLoading(false);
  }
};

export const useProjectChartsStore = create<{
  loading: boolean;
  error: string | null;
  loadingState: {
    topSectorsByProjectCount: boolean;
    topSectorsByInvestment: boolean;
    topDonorsByInvestment: boolean;
    topDonorsByProjectCount: boolean;
    topImplementingAgenciesByProjectCount: boolean;
    topExecutiveAgenciesByProjectCount: boolean;
    topDonorsByInvestmentBySector: boolean;
    topDonorsByInvestmentByRegion: boolean;
    topDonorsByInvestmentByRegionAndSector: boolean;
  };
  topSectorsByProjectCount: ProjectChartData | null;
  fetchTopSectorsByProjectCount: (download?: boolean) => void;
  topSectorsByInvestment: ProjectChartData | null;
  fetchTopSectorsByInvestment: (download?: boolean) => void;
  topDonorsByInvestment: ProjectChartData | null;
  fetchTopDonorsByInvestment: (download?: boolean) => void;
  topDonorsByProjectCount: ProjectChartData | null;
  fetchTopDonorsByProjectCount: (download?: boolean) => void;
  topImplementingAgenciesByProjectCount: ProjectChartData | null;
  fetchTopImplementingAgenciesByProjectCount: (download?: boolean) => void;
  topExecutiveAgenciesByProjectCount: ProjectChartData | null;
  fetchTopExecutiveAgenciesByProjectCount: (download?: boolean) => void;
  topDonorsByInvestmentBySector: CorrelationDataBySector | null;
  fetchTopDonorsByInvestmentBySector: (sectorId: number, download?: boolean) => void;
  topDonorsByInvestmentByRegion: CorrelationDataByRegion | null;
  fetchTopDonorsByInvestmentByRegion: (regionId: number, download?: boolean) => void;
  topDonorsByInvestmentByRegionAndSector: CorrelationDataByRegionAndSector | null;
  fetchTopDonorsByInvestmentByRegionAndSector: (regionId: number, sectorId: number, download?: boolean) => void;
  clearStore: () => void;
}>((set, get) => ({
  ...initialStore,

  fetchTopSectorsByProjectCount: async (download?: boolean) => {
    fetchData(
      "/ws/public/stat/project/count/sector",
      (loading) => set({ loadingState: { ...get().loadingState, topSectorsByProjectCount: loading } }),
      (data) => set({ error: null, topSectorsByProjectCount: data }),
      (error) => set({ error, topSectorsByProjectCount: null }),
      download
    );
  },

  fetchTopSectorsByInvestment: async (download?: boolean) => {
    fetchData(
      "/ws/public/stat/project/sector/sum",
      (loading) => set({ loadingState: { ...get().loadingState, topSectorsByInvestment: loading } }),
      (data) => set({ error: null, topSectorsByInvestment: data }),
      (error) => set({ error, topSectorsByInvestment: null }),
      download
    );
  },

  fetchTopDonorsByInvestment: async (download?: boolean) => {
    fetchData(
      "/ws/public/stat/project/donor/sum",
      (loading) => set({ loadingState: { ...get().loadingState, topDonorsByInvestment: loading } }),
      (data) => set({ error: null, topDonorsByInvestment: data }),
      (error) => set({ error, topDonorsByInvestment: null }),
      download
    );
  },

  fetchTopDonorsByProjectCount: async (download?: boolean) => {
    fetchData(
      "/ws/public/stat/project/count/donor",
      (loading) => set({ loadingState: { ...get().loadingState, topDonorsByProjectCount: loading } }),
      (data) => set({ error: null, topDonorsByProjectCount: data }),
      (error) => set({ error, topDonorsByProjectCount: null }),
      download
    );
  },

  fetchTopImplementingAgenciesByProjectCount: async (download?: boolean) => {
    fetchData(
      "/ws/public/stat/project/count/implementer",
      (loading) => set({ loadingState: { ...get().loadingState, topImplementingAgenciesByProjectCount: loading } }),
      (data) => set({ error: null, topImplementingAgenciesByProjectCount: data }),
      (error) => set({ error, topImplementingAgenciesByProjectCount: null }),
      download
    );
  },

  fetchTopExecutiveAgenciesByProjectCount: async (download?: boolean) => {
    fetchData(
      "/ws/public/stat/project/count/contractor",
      (loading) => set({ loadingState: { ...get().loadingState, topExecutiveAgenciesByProjectCount: loading } }),
      (data) => set({ error: null, topExecutiveAgenciesByProjectCount: data }),
      (error) => set({ error, topExecutiveAgenciesByProjectCount: null }),
      download
    );
  },

  fetchTopDonorsByInvestmentBySector: async (sectorId: number, download?: boolean) => {
    fetchData(
      `/ws/public/stat/project/sector/${sectorId}`,
      (loading) => set({ loadingState: { ...get().loadingState, topDonorsByInvestmentBySector: loading } }),
      (data) => set({ error: null, topDonorsByInvestmentBySector: data as CorrelationDataBySector }),
      (error) => set({ error, topDonorsByInvestmentBySector: null }),
      download
    );
  },

  fetchTopDonorsByInvestmentByRegion: async (regionId: number, download?: boolean) => {
    fetchData(
      `/ws/public/stat/project/region/${regionId}`,
      (loading) => set({ loadingState: { ...get().loadingState, topDonorsByInvestmentByRegion: loading } }),
      (data) => set({ error: null, topDonorsByInvestmentByRegion: data as CorrelationDataByRegion }),
      (error) => set({ error, topDonorsByInvestmentByRegion: null }),
      download
    );
  },

  fetchTopDonorsByInvestmentByRegionAndSector: async (regionId: number, sectorId: number, download?: boolean) => {
    fetchData(
      `/ws/public/stat/project/correlation/${regionId}/${sectorId}`,
      (loading) => set({ loadingState: { ...get().loadingState, topDonorsByInvestmentByRegionAndSector: loading } }),
      (data) => set({ error: null, topDonorsByInvestmentByRegionAndSector: data as CorrelationDataByRegionAndSector }),
      (error) => set({ error, topDonorsByInvestmentByRegionAndSector: null }),
      download
    );
  },

  clearStore: () => set(initialStore),
}));
