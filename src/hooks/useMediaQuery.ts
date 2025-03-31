// hooks/useMediaQuery.ts
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function useMediaQueryWithSsr(query: "xs" | "sm" | "md" | "lg" | "xl") {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  const matches = useMediaQuery(theme.breakpoints.up(query), {
    noSsr: true,
    defaultMatches: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    matches,
    mounted,
  };
}
