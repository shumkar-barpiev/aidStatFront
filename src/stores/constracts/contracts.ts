import { create } from "zustand";
import { http } from "@/utils/http.ts";
import contractsData from "@/components/maps/contractsData.json";

export interface ContractShort {
  title: string;
  budget: string;
  state_id: string;
  region_id: string;
  type: string;
}

export interface Contract {
  title: string;
  state_id: string;
  region_id: string;
  aa_id: string;
  village_id: string;
  city: string;
  lat: string;
  lng: string;
  id: string;
  cat_id: string;
  project_id: string;
  beg_date: string;
  end_date: string;
  budget: string;
  mark: string;
  status: string;
}

export interface BudgetStats {
  lowBudget: number;
  mediumBudget: number;
  highBudget: number;
}

export interface ByTypesStats {
  goods: number;
  infrastructure: number;
}

const initialStore = {
  loading: false,
  error: null,
  filter: null,
  chartFilter: null,
  items: contractsData,
  itemsWithBudgetByRegion: null,
};

interface ContractsState {
  loading: boolean;
  error: string | null;
  items: Contract[] | null;
  itemsWithBudgetByRegion: ContractShort[] | null;
  filter: string | null;
  chartFilter: string | null;
  setFilter: (filter: string | null) => void;
  setChartFilter: (filter: string | null) => void;
  fetchItems: (callback: Function) => Promise<void>;
}

export const useContractsStore = create<ContractsState>((set, get) => ({
  ...initialStore,

  fetchItems: async (callback: Function) => {
    set({ loading: true });
    try {
      const response = await http("/ws/public/stat/contracts", {
        method: "GET",
        withoutAuth: true,
      });

      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

      const data: Contract[] = await response.json();
      if (callback != null) callback(data);
      else set(() => ({ error: null, items: data }));
    } catch (e: any) {
      set({ error: e?.message });
    } finally {
      set({ loading: false });
    }
  },

  setFilter: (filter: string | null) => {
    set({ filter });
  },

  setChartFilter: (chartFilter: string | null) => {
    set({ chartFilter });
  },

  clearStore: () => {
    set(initialStore);
  },
}));
