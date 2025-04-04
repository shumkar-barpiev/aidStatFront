import { create } from "zustand";
import { http } from "@/utils/http";
import { TModelFilters } from "@/types/model";
import { replacePublicEndpointFilters } from "@/utils/axelor-api";
import { TProjectModel } from "@/models/project/ProjectModel";

const initialStore = {
  loading: false,
  error: null,
  total: null,
  items: null,
};

export const useProjectsStore = create<{
  loading: boolean;
  error: string | null;
  total: number | null;
  items: TProjectModel[] | null;
  getItems: (filters?: TModelFilters) => TProjectModel[] | null;
  fetchItems: (filters?: TModelFilters, callback?: Function) => Promise<void>;
  clearStore: () => void;
}>((set, get) => ({
  ...initialStore,
  getItems: (filters?: TModelFilters) => {
    if (!get().loading) get().fetchItems(filters);

    return get().items;
  },

  fetchItems: async (filters?: TModelFilters, callback?: Function) => {
    set({ loading: true });
    try {
      const _filters = replacePublicEndpointFilters(filters);
      const response = await http("/ws/public/projects", {
        method: "POST",
        withoutAuth: true,
        body: JSON.stringify(_filters),
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
