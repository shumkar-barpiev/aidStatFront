"use client";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Main from "@/components/statistics/Main";
import { containerMargins, containerWidths } from "@/utils/constants";

export default function StatisticsPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Box sx={{ width: containerWidths, mx: containerMargins, p: { xs: 0, md: 2 }, minHeight: "100dvh" }}>
      <Main />
    </Box>
  );
}
