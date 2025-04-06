import { create } from "zustand";
import { http } from "@/utils/http.ts";
import { TestFilterSectorOptions } from "@/shared/enums/statisticsMapIconsEnums.ts";

interface Sector {
  id: number;
  name: string;
}

interface SectorsState {
  loading: boolean;
  error: string | null;
  sectors: Sector[];
  fetchSectors: () => Promise<void>;
}

export const useSectorsStore = create<SectorsState>((set, get) => ({
  loading: false,
  error: null,
  sectors: TestFilterSectorOptions,

  fetchSectors: async () => {
    set({ loading: true });
    try {
      const response = await http("/ws/public/sectors", {
        method: "GET",
      });
      if (!response.ok) throw new Error(`Ошибка ${response.status}: ${response.statusText}`);

      const data: Sector[] = await response.json();
      set({ sectors: data, error: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));
