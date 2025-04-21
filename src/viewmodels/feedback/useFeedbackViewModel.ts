"use client";

import { useEffect, useState } from "react";
import { http } from "@/utils/http";
import FeedbackForm from "@/components/feedback/FeedbackForm";

export interface RequestType {
  order_seq: number;
  title: string;
  title_ru: string;
  title_en: string;
  title_kg: string;
  value: string;
}

export const useFeedbackViewModel = () => {
  const [requestTypes, setRequestTypes] = useState<RequestType[]>([]);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [requestTypeLoading, setRequestTypeLoading] = useState<boolean>(false);

  const fetchRequestTypes = async () => {
    const name = "feedback.request.type.selection";
    setRequestTypeLoading(true);
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
      setRequestTypes(data.data as RequestType[]);
    } catch (e: any) {
      throw e.message;
    } finally {
      setRequestTypeLoading(false);
    }
  };

  const createRequest = async (payload: FeedbackForm) => {
    setIsSubmitLoading(true);
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
      setIsSubmitLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestTypes();
  }, []);

  return {
    requestTypes,
    createRequest,
    isSubmitLoading,
    requestTypeLoading,
  };
};
