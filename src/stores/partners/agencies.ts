import { create } from "zustand";
import { http } from "@/utils/http";
import { TModelPublicFilters } from "@/types/model";
import { TPartnerModel } from "@/models/partner/partner";
import { replacePublicEndpointFilters } from "@/utils/axelor-api";

const initialStore = {
  loading: false,
  agencyLoading: false,
  error: null,
  total: null,
  agenciesTotal: null,
  agencies: null,
  agency: null,
  pageTotal: null,
  agenciesPageTotal: null,
};

export const useAgenciesStore = create<{
  loading: boolean;
  agencyLoading: boolean,
  error: string | null;
  total: number | null;
  agenciesTotal: number | null;
  pageTotal: number | null;
  agenciesPageTotal: number | null;
  agency: TPartnerModel | null;
  agencies: TPartnerModel[] | null;
  clearStore: () => void;
  fetchAgency: (id: number, callback?: Function) => Promise<void>;
  fetchAgencies: (filters?: TModelPublicFilters, callback?: Function) => Promise<void>;
}>((set, get) => ({
  ...initialStore,

  fetchAgencies: async (filters?: TModelPublicFilters, callback?: Function) => {
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
          const agenciesPageTotal =
            data.total != null && filters?.pageSize != null ? Math.ceil(data.total / filters?.pageSize) : 0;
          set(() => ({ error: null, total: data.total, agenciesPageTotal, agencies: data.data }));
        }
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (e: any) {
      set({ error: e?.message, total: null, agencies: null });
    } finally {
      set({ loading: false });
    }
  },

  fetchAgency: async (id: number, callback?: Function) => {
    set({ agencyLoading: true });
    try {
      const response = await http(`/ws/public/partner/${id}`, {
        method: "GET",
        withoutAuth: true,
      });

      if (response.ok) {
        const data = await response.json();
        if (callback != null) callback(data);
        else set(() => ({ error: null, agency: data }));
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (e: any) {
      set({ error: e?.message, agencies: null });
    } finally {
      set({ agencyLoading: false });
    }
  },

  clearStore: () => {
    set(initialStore);
  },
}));
