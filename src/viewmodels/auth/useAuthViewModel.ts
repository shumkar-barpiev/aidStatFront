import { useState } from "react";
import { useAuthStore } from "@/stores/auth/auth";
import { apiUrl } from "@/utils/constants.ts";

export const useAuthViewModel = () => {
  const authStore = useAuthStore();
  const [authMessage, setAuthMessage] = useState<Record<string, any> | null>(null);

  const authorize = (requestBody: Record<string, any>) => {
    authStore.login(requestBody, (data: Record<string, any>) => {
      if (data.status == -1) {
        setAuthMessage({
          variant: "error",
          message: "Неверное имя пользователя или пароль.",
        });
      } else {
        window.location.href = `${apiUrl}/aidstat/`;
      }
    });
  };

  return { authorize, authMessage, setAuthMessage };
};
