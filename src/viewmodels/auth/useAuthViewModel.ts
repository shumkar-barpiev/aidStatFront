import { useAuthStore } from "@/stores/auth/auth";

export const useAuthViewModel = () => {
  const authStore = useAuthStore();

  const authorize = (requestBody: Record<string, any>) => {
    authStore.login(requestBody, () => {
      const csrf = document.querySelector('meta[name="csrf-token"]');
      console.log(csrf);
    });
  };

  return { authorize };
};
