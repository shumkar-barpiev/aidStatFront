"use client";

import React, { useEffect, useState } from "react";
import { Main } from "@/components/documents/Main.tsx";

export default function DocumentsPage() {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <Main />;
}
