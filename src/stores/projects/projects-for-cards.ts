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
  loadingState: {
    topSectorsByProjectCount: false,
    topSectorsByInvestment: false,
    topDonorsByInvestment: false,
    topDonorsByProjectCount: false,
    topImplementingAgenciesByProjectCount: false,
    topExecutiveAgenciesByProjectCount: false,
    topDonorsByInvestmentBySector: false,
    topDonorsByInvestmentByRegion: false,
  },
  topSectorsByProjectCount: null,
  topSectorsByInvestment: null,
  topDonorsByInvestment: null,
  topDonorsByProjectCount: null,
  topImplementingAgenciesByProjectCount: null,
  topExecutiveAgenciesByProjectCount: null,
  topDonorsByInvestmentBySector: null,
  topDonorsByInvestmentByRegion: null,
};

const fetchData = async (
  url: string,
  setLoading: (loading: boolean) => void,
  setData: (data: ProjectChartData | CorrelationDataByRegion | CorrelationDataBySector) => void,
  setError: (error: string | null) => void // Добавляем параметр для установки ошибки
) => {
  setLoading(true);
  try {
    const response = await http(url, { method: "GET", withoutAuth: true });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const data = await response.json();
    setData(data);
  } catch (e: any) {
    setError(e?.message || "Ошибка при загрузке данных");
  } finally {
    setLoading(false);
  }
};

export const useProjectCardsStore = create<{
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
  };
  topSectorsByProjectCount: ProjectChartData | null;
  fetchTopSectorsByProjectCount: () => void;
  topSectorsByInvestment: ProjectChartData | null;
  fetchTopSectorsByInvestment: () => void;
  topDonorsByInvestment: ProjectChartData | null;
  fetchTopDonorsByInvestment: () => void;
  topDonorsByProjectCount: ProjectChartData | null;
  fetchTopDonorsByProjectCount: () => void;
  topImplementingAgenciesByProjectCount: ProjectChartData | null;
  fetchTopImplementingAgenciesByProjectCount: () => void;
  topExecutiveAgenciesByProjectCount: ProjectChartData | null;
  fetchTopExecutiveAgenciesByProjectCount: () => void;
  topDonorsByInvestmentBySector: CorrelationDataBySector | null;
  fetchTopDonorsByInvestmentBySector: (sectorId: number) => void;
  topDonorsByInvestmentByRegion: CorrelationDataByRegion | null;
  fetchTopDonorsByInvestmentByRegion: (regionId: number) => void;
  downloadDataAsFile: (response: Response) => void;
  clearStore: () => void;
}>((set, get) => ({
  ...initialStore,

  downloadDataAsFile: async (response: Response, filename = "data.csv") => {
    console.log("downloading");
  },

  fetchTopSectorsByProjectCount: async () => {
    fetchData(
      "/ws/public/stat/project/count/sector",
      (loading) => set({ loadingState: { ...get().loadingState, topSectorsByProjectCount: loading } }),
      (data) => set({ error: null, topSectorsByProjectCount: data }),
      (error) => set({ error }) // Обновляем ошибку через setError
    );
  },

  fetchTopSectorsByInvestment: async () => {
    fetchData(
      "/ws/public/stat/project/sector/sum",
      (loading) => set({ loadingState: { ...get().loadingState, topSectorsByInvestment: loading } }),
      (data) => set({ error: null, topSectorsByInvestment: data }),
      (error) => set({ error }) // Обновляем ошибку через setError
    );
  },

  fetchTopDonorsByInvestment: async () => {
    fetchData(
      "/ws/public/stat/project/donor/sum",
      (loading) => set({ loadingState: { ...get().loadingState, topDonorsByInvestment: loading } }),
      (data) => set({ error: null, topDonorsByInvestment: data }),
      (error) => set({ error }) // Обновляем ошибку через setError
    );
  },

  fetchTopDonorsByProjectCount: async () => {
    fetchData(
      "/ws/public/stat/project/count/donor",
      (loading) => set({ loadingState: { ...get().loadingState, topDonorsByProjectCount: loading } }),
      (data) => set({ error: null, topDonorsByProjectCount: data }),
      (error) => set({ error }) // Обновляем ошибку через setError
    );
  },

  fetchTopImplementingAgenciesByProjectCount: async () => {
    fetchData(
      "/ws/public/stat/project/count/implementer",
      (loading) => set({ loadingState: { ...get().loadingState, topImplementingAgenciesByProjectCount: loading } }),
      (data) => set({ error: null, topImplementingAgenciesByProjectCount: data }),
      (error) => set({ error }) // Обновляем ошибку через setError
    );
  },

  fetchTopExecutiveAgenciesByProjectCount: async () => {
    fetchData(
      "/ws/public/stat/project/count/contractor",
      (loading) => set({ loadingState: { ...get().loadingState, topExecutiveAgenciesByProjectCount: loading } }),
      (data) => set({ error: null, topExecutiveAgenciesByProjectCount: data }),
      (error) => set({ error }) // Обновляем ошибку через setError
    );
  },

  fetchTopDonorsByInvestmentBySector: async (sectorId: number) => {
    fetchData(
      `/ws/public/stat/project/sector/${sectorId}`,
      (loading) => set({ loadingState: { ...get().loadingState, topDonorsByInvestmentBySector: loading } }),
      (data) => set({ error: null, topDonorsByInvestmentBySector: data as CorrelationDataBySector }),
      (error) => set({ error }) // Обновляем ошибку через setError
    );
  },

  fetchTopDonorsByInvestmentByRegion: async (regionId: number) => {
    fetchData(
      `/ws/public/stat/project/region/${regionId}`,
      (loading) => set({ loadingState: { ...get().loadingState, topDonorsByInvestmentByRegion: loading } }),
      (data) => set({ error: null, topDonorsByInvestmentByRegion: data as CorrelationDataByRegion }),
      (error) => set({ error }) // Обновляем ошибку через setError
    );
  },

  clearStore: () => set(initialStore),
}));
