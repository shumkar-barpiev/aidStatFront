import { create } from "zustand";
import { http } from "@/utils/http";
import { TModelFilters } from "@/types/model";
import { TProjectModel } from "@/models/project/ProjectModel";
import { replacePublicEndpointFilters } from "@/utils/axelor-api";

const PAGE_SIZE = 16;

const initialStore = {
  item: null,
  items: null,
  total: null,
  error: null,
  loading: false,
  pageTotal: null,
};

export const useProjectsStore = create<{
  loading: boolean;
  error: string | null;
  total: number | null;
  pageTotal: number | null;
  item: TProjectModel | null;
  items: TProjectModel[] | null;
  getItems: (filters?: TModelFilters) => TProjectModel[] | null;
  fetchItem: (id: number, callback?: Function) => Promise<void>;
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
        else {
          const pageTotal =
            data.total != null && filters?.pageSize != null ? Math.ceil(data.total / filters?.pageSize) : 0;

          set(() => ({ error: null, total: data.total, pageTotal: pageTotal, items: data.data }));
        }
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (e: any) {
      set({ error: e?.message, total: null, items: null });
    } finally {
      set({ loading: false });
    }
  },

  fetchItem: async (id: number, callback?: Function) => {
    set({ loading: true });
    try {
      const response = await http(`/ws/public/project/${id}`, {
        method: "GET",
        withoutAuth: true,
      });

      if (response.ok) {
        const data = await response.json();
        if (callback != null) callback(data);
        else set(() => ({ error: null, total: data.total, item: data }));
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
