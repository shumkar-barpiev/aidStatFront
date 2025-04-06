"use client";

import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ShowProject } from "@/components/projects/show/ShowProject";
import { containerWidths, containerMargins } from "@/utils/constants";
import { useProjectsViewModel } from "@/viewmodels/projects/useProjectsViewModel";

export default function ProjectsShowPage() {
  const params = useParams();
  const { project, fetchProject } = useProjectsViewModel();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const projectName = Array.isArray(params.projectName) ? params.projectName[0] : params.projectName;

    if (projectName) fetchProject(projectName);
  }, [params.projectName]);

  if (!isClient) return null;

  return (
    <Box sx={{ width: containerWidths, mx: containerMargins }}>
      <ShowProject project={project} />
    </Box>
  );
}
