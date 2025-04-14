import { create } from "zustand";
import { http } from "@/utils/http";
import { TModelFilters } from "@/types/model";
import { TProjectModel } from "@/models/project/ProjectModel";
import { replacePublicEndpointFilters } from "@/utils/axelor-api";

export type TProjectModelFilters = {
  page: number;
  pageSize: number;
  searchString?: string;
  sectorIds?: number[] | null;
  partnerIds?: number[] | null;
  districtIds?: number[] | null;
  regionIds?: number[] | null;
};

const initialStore = {
  item: null,
  items: null,
  total: null,
  error: null,
  filters: null,
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
  filters: TModelFilters | null;
  setFilters: (filters: Partial<TModelFilters>) => void;
  getItems: (filters?: TModelFilters) => TProjectModel[] | null;
  fetchItem: (id: number, callback?: Function) => Promise<void>;
  fetchDocument: (id: number, callback: Function) => Promise<void>;
  fetchProjectDocuments: (id: number, callback: Function) => Promise<void>;
  fetchItems: (filters?: TModelFilters, callback?: Function) => Promise<void>;
  clearStore: () => void;
}>((set, get) => ({
  ...initialStore,
  filters: {
    page: 1,
    pageSize: 8,
  },

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

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

  fetchProjectDocuments: async (id: number, callback: Function) => {
    set({ loading: true });

    try {
      const response = await http(`/ws/public/attachment/com.axelor.apps.aid.db.Project/${id}`, {
        method: "GET",
        withoutAuth: true,
      });

      if (response.ok) {
        const data = await response.json();
        callback(data);
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (e: any) {
      set({ error: e?.message, total: null, items: null });
    } finally {
      set({ loading: false });
    }
  },

  fetchDocument: async (id: number, callback: Function) => {
    set({ loading: true });

    try {
      const response = await http(`/ws/public/file/dms/download/${id}`, {
        method: "GET",
        withoutAuth: true,
      });

      if (response.ok) {
        const blob = await response.blob();
        callback(blob);
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
