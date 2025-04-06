"use client";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Main from "@/components/statistics/charts/Main";
import { containerMargins, containerWidths } from "@/utils/constants";

// 👇 импорт без SSR
const ProjectsMap = dynamic(() => import("@/components/maps/ProjectsMap"), {
  ssr: false,
});

export default function StatisticsPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Box sx={{ width: containerWidths, mx: containerMargins, p: 2, minHeight: "100vh" }}>
      <ProjectsMap />
      <Main />
    </Box>
  );
}
