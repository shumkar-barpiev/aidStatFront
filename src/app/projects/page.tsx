"use client";

import Main from "@/components/projects/Main";
import React, { useEffect, useState } from "react";

export default function Projects() {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <Main />;
}
