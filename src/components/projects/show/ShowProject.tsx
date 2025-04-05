"use client";

import React from "react";
import { Box } from "@mui/material";
import { useProjectsViewModel } from "@/viewmodels/projects/useProjectsViewModel";

export default function ShowProject() {
  const { project } = useProjectsViewModel();

  return <Box>{project?.name}</Box>;
}
