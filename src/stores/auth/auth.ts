import { create } from "zustand";
import { getCookie } from "@/utils/cookie";

interface AuthState {
  loading: boolean;
  error: string | null;
  login: (reqBody: Record<string, any>, callback: Function) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (reqBody: Record<string, any>, callback: Function) => {
    set({ loading: true, error: null });

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/aidstat/callback`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      if (response.ok) {
        callback();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (e: any) {
      set({ error: e?.message });
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
