import { create } from "zustand";
import { http } from "@/utils/http";

type TOrderDetailsInvoiceStoreModel = {
  loading: boolean;
  error: string | null;
  fetchInvoiceId: ({
    saleOrderId,
    currencyId,
    languageCode,
  }: {
    saleOrderId: number;
    currencyId: number;
    languageCode: string;
  }) => Promise<number | null>;
};

export const useOrderDetailsInvoiceStore = create<TOrderDetailsInvoiceStoreModel>((set) => ({
  loading: false,
  error: null,
  fetchInvoiceId: async ({ saleOrderId, currencyId, languageCode }) => {
    try {
      set({ loading: true });

      const response = await http(`/ws/export/tmp-doc/${saleOrderId}`, {
        method: "POST",
        body: JSON.stringify({
          currId: currencyId,
          lang: languageCode,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 0) {
          set(() => ({ error: null, loading: false }));
          return data.data?.id;
        } else throw new Error(data.data?.message ?? data.data);
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (e: any) {
      set({ error: e?.message });
    } finally {
      set({ loading: false });
    }

    return null;
  },
}));
