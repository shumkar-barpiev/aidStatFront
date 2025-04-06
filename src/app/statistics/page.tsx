"use client";

import React from "react";
import { Box } from "@mui/material";
import ProjectsMap from "@/components/maps/ProjectsMap.tsx";

const Page = () => {
  return (
    <Box display="flex" flexDirection="column">
      <ProjectsMap />
    </Box>
  );
};

export default Page;
