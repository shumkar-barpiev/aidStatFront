"use client";

import { useAuthStore } from "@/stores/auth/auth";
import React, { useEffect, useState } from "react";
import Snackbar from "@/components/other/Snackbar";
import LoginPage from "@/components/login/LoginPage";
import { apiUrl } from "@/utils/constants.ts";

export default function SignIn() {
  const authStore = useAuthStore();
  const [isClient, setIsClient] = useState<boolean>(false);
  const [renderSignInForm, setRenderSignInForm] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    authStore.getInfo((data: Record<string, any>) => {
      if (data.user) window.location.href = `${apiUrl}/aidstat/`;
      else setRenderSignInForm(true);
    });
  }, []);

  if (!isClient) return null;

  return (
    renderSignInForm && (
      <div>
        <LoginPage />
        <Snackbar />
      </div>
    )
  );
}
