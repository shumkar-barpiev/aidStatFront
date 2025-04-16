import { create } from "zustand";
import { http } from "@/utils/http.ts";

interface Contact {
  name: string;
  address: string;
  phone: string;
  fax: string;
  email: string;
  image: string;
}

const initialStore = {
  loading: false,
  error: null,
  contacts: null,
};

export const useContactsStore = create<{
  loading: boolean;
  error: string | null;
  contacts: Contact[] | null;
  fetchContacts: () => Promise<void>;
}>((set, get) => ({
  ...initialStore,
  fetchContacts: async () => {
    set(() => ({ loading: true }));
    try {
      const response = await http("/ws/public/contacts", { method: "GET", withoutAuth: true });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

      const data: Contact[] = await response.json();

      set(() => ({ error: null, contacts: data }));
    } catch (e: any) {
      set({ error: e?.message, contacts: null });
    } finally {
      set(() => ({ loading: false }));
    }
  },
}));
