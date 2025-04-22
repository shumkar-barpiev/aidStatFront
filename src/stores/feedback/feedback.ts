import { create } from "zustand";
import { http } from "@/utils/http.ts";

export interface RequestType {
  order_seq: number;
  title: string;
  title_ru: string;
  title_en: string;
  title_kg: string;
  value: string;
}

export interface FeedbackFormData {
  name: string;
  contact: string;
  requestType: string;
  message: string;
}

const initialStore = {
  isSubmitLoading: false,
  requestTypeLoading: false,
  error: null,
  requestTypes: null,
};

export const useFeedbackStore = create<{
  isSubmitLoading: boolean,
  requestTypeLoading: boolean,
  error: string | null;
  requestTypes: RequestType[] | null;
  fetchRequestTypes: () => Promise<void>;
  createRequest: (payload: FeedbackFormData) => Promise<void>;
}>((set, get) => ({
  ...initialStore,
  fetchRequestTypes: async () => {
    const name = "feedback.request.type.selection";
    set({ requestTypeLoading: true });
    try {
      const response = await http(`/ws/public/selection/${name}`, {
        method: "POST",
        withoutAuth: true,
        body: JSON.stringify({
          name: "feedback.request.type.selection",
          translate: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      set({ requestTypes: data.data });
    } catch (e: any) {
      throw e.message;
    } finally {
      set({ requestTypeLoading: false });
    }
  },

  createRequest: async (payload: FeedbackFormData) => {
    set({ isSubmitLoading: true });
    try {
      const response = await http(`/ws/public/feedback`, {
        method: "PUT",
        withoutAuth: true,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (e) {
      console.error("Ошибка в createRequest:", e);
      throw e;
    } finally {
      set({ isSubmitLoading: false });
    }
  },
}));
