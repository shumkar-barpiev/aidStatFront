"use client";

import React, { useEffect, useState } from "react";
import LoginPage from "@/components/login/LoginPage";

export default function SignIn() {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <LoginPage />;
}
