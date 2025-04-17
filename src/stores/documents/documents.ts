import { create } from "zustand";
import { http } from "@/utils/http";

const initialStore = {
  total: null,
  error: null,
  loading: false,
  pageTotal: null,
};

export const useDocumentsStore = create<{
  loading: boolean;
  error: string | null;
  total: number | null;
  pageTotal: number | null;
  getDocuments: (callback: Function) => Promise<void>;
  downloadDocument: (id: number, callback: Function) => Promise<void>;
  clearStore: () => void;
}>((set, get) => ({
  ...initialStore,

  getDocuments: async (callback: Function) => {
    set({ loading: true });
    try {
      const response = await http("/ws/public/documentation", {
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
      set({ error: e?.message, total: null });
    } finally {
      set({ loading: false });
    }
  },

  downloadDocument: async (id: number, callback: Function) => {
    set({ loading: true });

    try {
      const response = await http(`/ws/public/file/meta/download/${id}`, {
        method: "GET",
        withoutAuth: true,
      });

      if (response.ok) {
        const blob = await response.blob();
        const disposition = response.headers.get("Content-Disposition");
        const match = disposition?.match(/filename="?([^"]+)"?/);
        const filename = match?.[1] || "downloaded-file";
        callback(blob, filename);
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (e: any) {
      set({ error: e?.message, total: null });
    } finally {
      set({ loading: false });
    }
  },

  clearStore: () => {
    set(initialStore);
  },
}));
