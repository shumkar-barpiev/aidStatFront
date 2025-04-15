"use client";

import React, { useEffect, useState } from "react";
import Main from "@/components/contacts/Main.tsx";

export default function Contacts() {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <Main />;
}
