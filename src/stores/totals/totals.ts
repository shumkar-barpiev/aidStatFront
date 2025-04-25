import { create } from "zustand";
import { http } from "@/utils/http.ts";

interface Totals {
  projectCount: number;
  donorCount: number;
  totalAmount: number;
}

const initialStore = {
  loading: false,
  error: null,
  projectCount: null,
  donorCount: null,
  totalAmount: null,
};

export const useTotalsStore = create<{
  loading: boolean;
  error: string | null;
  projectCount: number | null;
  donorCount: number | null;
  totalAmount: number | null;
  fetchTotals: () => Promise<void>;
}>((set, get) => ({
  ...initialStore,
  fetchTotals: async () => {
    set(() => ({ loading: true }));
    try {
      const response = await http("/ws/public/totals", { method: "GET", withoutAuth: true });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

      const { projectCount, donorCount, totalAmount }: Totals = await response.json();

      set(() => ({ error: null, projectCount, donorCount, totalAmount }));
    } catch (e: any) {
      set({ error: e?.message });
    } finally {
      set(() => ({ loading: false }));
    }
  },
}));
