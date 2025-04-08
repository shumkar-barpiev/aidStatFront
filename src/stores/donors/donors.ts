import { create } from "zustand";
import { http } from "@/utils/http.ts";
import { TestFilterDonorOptions } from "@/shared/enums/statisticsMapIconsEnums.ts";

interface Donor {
  id: number;
  name: string;
}

interface DonorState {
  loading: boolean;
  error: string | null;
  donors: Donor[];
  fetchDonors: () => Promise<void>;
}

export const useDonorsStore = create<DonorState>((set, get) => ({
  loading: false,
  error: null,
  donors: TestFilterDonorOptions,

  fetchDonors: async () => {
    set({ loading: true });
    try {
      const response = await http("/ws/public/partners", {
        method: "GET",
      });
      if (!response.ok) throw new Error(`Ошибка ${response.status}: ${response.statusText}`);

      const data: Donor[] = await response.json();
      set({ donors: data, error: null });
    } catch (error: any) {
      set({ error: error.message, donors: [] });
    } finally {
      set({ loading: false });
    }
  },
}));
