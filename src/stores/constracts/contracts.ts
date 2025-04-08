import { create } from "zustand";
import { http } from "@/utils/http.ts";

interface Contract {
  id: number;
  name: string;
}

const initialStore = {
  loading: false,
  error: null,
  items: null,
};

interface ContractsState {
  loading: boolean;
  error: string | null;
  items: Contract[] | null;
  fetchItems: (callback: Function) => Promise<void>;
}

export const useContractsStore = create<ContractsState>((set, get) => ({
  ...initialStore,

  fetchItems: async (callback: Function) => {
    set({ loading: true });
    try {
      const response = await http("/ws/public/stat/contract/region/", {
        method: "GET",
        withoutAuth: true,
      });

      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

      const data: Contract[] = await response.json();
      if (callback != null) callback(data);
      else set(() => ({ error: null, items: data }));
    } catch (e: any) {
      set({ error: e?.message, items: null });
    } finally {
      set({ loading: false });
    }
  },
  clearStore: () => {
    set(initialStore);
  },
}));
