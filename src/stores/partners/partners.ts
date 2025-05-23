import { create } from "zustand";
import { http } from "@/utils/http";
import { TModelPublicFilters } from "@/types/model";
import { TPartnerModel } from "@/models/partner/partner";
import { replacePublicEndpointFilters } from "@/utils/axelor-api";

const initialStore = {
  loading: false,
  error: null,
  total: null,
  item: null,
  items: null,
  pageTotal: null,
};

export const usePartnersStore = create<{
  loading: boolean;
  error: string | null;
  total: number | null;
  item: TPartnerModel | null;
  items: TPartnerModel[] | null;
  pageTotal: number | null;
  getItems: (callback: Function) => Promise<void>;
  fetchItems: (filters?: TModelPublicFilters, callback?: Function) => Promise<void>;
  fetchItem: (id: number, callback?: Function) => Promise<void>;
  clearStore: () => void;
}>((set, get) => ({
  ...initialStore,
  getItems: async (callback: Function) => {
    set({ loading: true });
    try {
      const response = await http("/ws/public/partners", {
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

  fetchItems: async (filters?: TModelPublicFilters, callback?: Function) => {
    set({ loading: true });
    try {
      const _filters = replacePublicEndpointFilters(filters);
      const response = await http("/ws/public/partners", {
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
      const response = await http(`/ws/public/partner/${id}`, {
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
