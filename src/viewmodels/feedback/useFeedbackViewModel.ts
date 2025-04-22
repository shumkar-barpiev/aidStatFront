"use client";

import { useEffect } from "react";
import { useFeedbackStore } from "@/stores/feedback/feedback";

export const useFeedbackViewModel = () => {
  const { fetchRequestTypes } = useFeedbackStore();

  useEffect(() => {
    fetchRequestTypes();
  }, []);

  return {};
};
