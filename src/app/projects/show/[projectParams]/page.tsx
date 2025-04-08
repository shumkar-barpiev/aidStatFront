"use client";

import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ShowProject } from "@/components/projects/show/ShowProject";
import { containerWidths, containerMargins } from "@/utils/constants";
import CustomBreadcrumbs from "@/components/breadcrumbs/CustomBreadcrumbs";
import { useProjectsViewModel } from "@/viewmodels/projects/useProjectsViewModel";

export default function ProjectsShowPage() {
  const params = useParams();
  const { fetchProject } = useProjectsViewModel();
  const [isClient, setIsClient] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fullPath = window.location.pathname;
    const decodedPath = decodeURIComponent(fullPath);
    const projectName = decodedPath.split("/projects/show/")[1];
    const hash = window.location.hash;

    if (projectName && hash) {
      setProjectName(projectName);
      const projectId = parseInt(hash.substring(1), 10);
      if (!isNaN(projectId)) fetchProject(projectId);
    }
  }, [params.projectParams]);

  if (!isClient) return null;

  return (
    <Box sx={{ width: containerWidths, mx: containerMargins, p: 3 }}>
      <CustomBreadcrumbs path={`projects/${decodeURIComponent(projectName)}`} />
      <ShowProject />
    </Box>
  );
}
