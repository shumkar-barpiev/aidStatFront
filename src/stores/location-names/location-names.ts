import { create } from "zustand";
import { http } from "@/utils/http.ts";

interface LocationName {
  id: number;
  name: string;
}

interface LocationNamesState {
  loading: boolean;
  error: string | null;
  locationNames: LocationName[];
  fetchLocationNames: () => Promise<void>;
}

export const useLocationNamesStore = create<LocationNamesState>((set, get) => ({
  loading: false,
  error: null,
  locationNames: [
    { id: 1, name: "Иссык-Кульская область" },
    { id: 2, name: "narynRegion" },
    { id: 3, name: "Джалал-Абадская Область" },
    { id: 4, name: "" },
    { id: 5, name: "" },
  ],

  fetchLocationNames: async () => {
    set({ loading: true });
    try {
      const response = await http("/ws/rest/com.axelor.team.db.TeamTask/search", {
        method: "GET",
      });
      if (!response.ok) throw new Error(`Ошибка ${response.status}: ${response.statusText}`);

      const data: LocationName[] = await response.json();
      set({ locationNames: data, error: null });
    } catch (error: any) {
      set({ error: error.message, locationNames: [] });
    } finally {
      set({ loading: false });
    }
  },
}));
