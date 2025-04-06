import { create } from "zustand";
import { http } from "@/utils/http";

const initialStore = {
  loading: false,
  error: null,
  total: null,
  items: null,
};

export const useAidStatSectorsStore = create<{
  loading: boolean;
  error: string | null;
  total: number | null;
  items: Record<string, any>[] | null;
  fetchItems: (callback: Function) => Promise<void>;
  clearStore: () => void;
}>((set, get) => ({
  ...initialStore,

  fetchItems: async (callback: Function) => {
    set({ loading: true });
    try {
      const response = await http("/ws/public/sectors", {
        method: "GET",
        withoutAuth: true,
      });

      if (response.ok) {
        const data = await response.json();
        if (callback != null) callback(data);
        else set(() => ({ error: null, total: data.total, items: data.data }));
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (e: any) {
      set({ error: e?.message, total: null, items: null });
    } finally {
      set({ loading: false });
    }
  },
  clearStore: () => {
    set(initialStore);
  },
}));
