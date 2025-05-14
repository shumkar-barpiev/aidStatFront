import { create } from "zustand";
import { TContractModelForMap, TContractModelForTable } from "@/models/contracts/ContractModel.ts";
import { http } from "@/utils/http.ts";

interface ContractFilters {
  page: number | 1;
  limit: number | 8;
  searchString: string | null;
  status: number | null;
  regionName: string | null;
  districtName: string | null;
}

interface ContractsState {
  loadingMapData: boolean;
  loadingTableData: boolean;
  error: string | null;
  totalContracts: number | null;
  contractsForTable: TContractModelForTable | null;
  contractsForMap: TContractModelForMap | null;
  pageTotal: number | null;
  filters: ContractFilters;
  setFilters: (filters: Partial<ContractFilters>) => void;
  fetchContractsForTable: () => Promise<void>;
  fetchContractsForMap: () => Promise<void>;
  clearStore: () => void;
}

const initialStore = {
  loadingMapData: false,
  loadingTableData: false,
  error: null,
  totalContracts: null,
  contractsForTable: null,
  contractsForMap: null,
  pageTotal: null,
  filters: {
    page: 1,
    limit: 8,
    searchString: null,
    status: null,
    regionName: null,
    districtName: null,
  },
};

export const useContractsStore = create<ContractsState>((set, get) => ({
  ...initialStore,

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  fetchContractsForTable: async () => {
    const { page, limit, searchString, status, regionName, districtName } = get().filters;
    set({ loadingMapData: true, error: null });
    try {
      const body = {
        offset: page != null ? (page - 1) * (limit ?? 12) : 0,
        limit,
        searchString,
        status,
        regionName,
        districtName,
      };
      const response = await http("/ws/public/contracts", {
        method: "POST",
        withoutAuth: true,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const pageTotal = data.total != null && limit != null ? Math.ceil(data.total / limit) : 0;

      set(() => ({ error: null, totalContracts: data.total, pageTotal, contractsForTable: data }));
    } catch (e: any) {
      set({ error: e?.message, pageTotal: null, totalContracts: null });
    } finally {
      set({ loadingMapData: false });
    }
  },

  fetchContractsForMap: async () => {
    set({ loadingTableData: true, error: null });
    try {
      const response = await http("/ws/public/stat/contract", {
        method: "GET",
        withoutAuth: true,
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      set(() => ({ error: null, contractsForMap: data }));
    } catch (e: any) {
      set({ error: e?.message, pageTotal: null, contractsForMap: null });
    } finally {
      set({ loadingTableData: false });
    }
  },

  clearStore: () => {
    set(initialStore);
  },
}));
