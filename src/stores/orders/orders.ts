import { create } from "zustand";
import { TModelFilters } from "@/types/model";
import { replaceFilters } from "@/utils/axelor-api";
import { http } from "@/utils/http";
import { TOrderModel } from "@/models/orders/order";

const initialStore = {
  loading: false,
  error: null,
  total: null,
  item: null,
  items: null,
  sum: null,
};

export const useOrderStore = create<{
  loading: boolean;
  error: string | null;
  total: number | null;
  item: TOrderModel | null;
  items: TOrderModel[] | null;
  sum: number | null;
  getItems: (filters?: TModelFilters) => TOrderModel[] | null;
  fetchItems: (filters?: TModelFilters) => Promise<void>;
  fetchItem: (id: number, signal?: AbortSignal) => Promise<TOrderModel | null>;
  fetchSum: (orderId: TOrderModel["id"]) => Promise<void>;
  saveItem: (item: TOrderModel) => Promise<TOrderModel>;
  clearStore: () => void;
}>((set, get) => ({
  ...initialStore,
  getItems: (filters?: TModelFilters) => {
    if (!get().loading) get().fetchItems(filters);
    return get().items;
  },
  fetchItems: async (filters?: TModelFilters) => {
    set({ loading: true });
    try {
      const _filters = replaceFilters(filters);
      const response = await http("/ws/rest/com.axelor.apps.sale.db.SaleOrder/search", {
        method: "POST",
        body: JSON.stringify(_filters),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 0) set(() => ({ error: null, total: data.total, items: data.data }));
        else throw new Error(data.data?.message ?? data.data);
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (e: any) {
      set({ error: e?.message, total: null, items: null });
    } finally {
      set({ loading: false });
    }
  },
  fetchItem: async (id: number, signal?: AbortSignal) => {
    try {
      set({ loading: true });

      const response = await http(`/ws/rest/com.axelor.apps.sale.db.SaleOrder/${id}`, { signal });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 0 && data.hasOwnProperty("data")) {
          set({ item: data.data[0], error: null });
          return data.data[0];
        } else {
          throw new Error(data.data?.message ?? "No data");
        }
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (e: any) {
      set({ error: e?.message });
    } finally {
      set({ loading: false });
    }
  },
  fetchSum: async (orderId) => {
    set({ loading: true });

    try {
      const response = await http(`/ws/order/${orderId}`, { method: "POST" });

      if (response.ok) {
        const data = await response.json();
        set({ sum: parseFloat(data) || 0 });
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (e: any) {
      set({ sum: 0 });
    } finally {
      set({ loading: false });
    }
  },
  saveItem: async (item: TOrderModel) => {
    set({ loading: true });
    try {
      const response = await http("/ws/v2/rest/com.axelor.apps.sale.db.SaleOrder", {
        method: "POST",
        body: JSON.stringify({
          data: item,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 0) return data.data;
        else throw new Error(data.data?.message ?? data.data);
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
