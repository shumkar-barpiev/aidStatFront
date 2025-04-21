import { create } from "zustand";
import { getCookie } from "@/utils/cookie";

interface AuthState {
  loading: boolean;
  error: string | null;
  getInfo: (callback: Function) => Promise<void>;
  login: (reqBody: Record<string, any>, callback: Function) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (reqBody: Record<string, any>, callback: Function) => {
    set({ loading: true, error: null });

    const apiUrl = "/sign-in/api";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      const data = await response.json();

      callback(data);
    } catch (e: any) {
      set({ error: e?.message });
    } finally {
      set({ loading: false });
    }
  },

  getInfo: async (callback: Function) => {
    set({ loading: true, error: null });

    try {
      const response = await fetch("/aidstat/ws/public/app/info", {
        method: "GET",
      });

      const data = await response.json();
      callback(data);
    } catch (e: any) {
      set({ error: e?.message });
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
