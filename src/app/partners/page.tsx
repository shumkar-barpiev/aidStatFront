"use client";

import Main from "@/components/partners/Main";
import React, { useEffect, useState } from "react";

export default function Partners() {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <Main />;
}
