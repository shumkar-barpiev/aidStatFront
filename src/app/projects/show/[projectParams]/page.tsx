"use client";

import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ShowProject } from "@/components/projects/show/ShowProject";
import { containerMargins, containerWidths } from "@/utils/constants";
import CustomBreadcrumbs from "@/components/breadcrumbs/CustomBreadcrumbs";
import { useProjectsViewModel } from "@/viewmodels/projects/useProjectsViewModel";
import { useProjectsStore } from "@/stores/projects/projects.ts";
import { ShareButtons } from "@/components/share-buttons/ShareButtons.tsx";

export default function ProjectsShowPage() {
  const [isClient, setIsClient] = useState<boolean>(false);
  const params = useParams();
  const { fetchProject } = useProjectsViewModel();
  const projectsStore = useProjectsStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const projectId = parseInt(hash.substring(1), 10);
      if (!isNaN(projectId)) {
        fetchProject(projectId);
      }
    }
  }, [params.projectParams]);

  if (!isClient) return null;

  return (
    <Box sx={{ width: containerWidths, mx: containerMargins, p: 3 }}>
      <CustomBreadcrumbs path={`projects/${projectsStore.item?.name || ""}`} />
      <ShowProject project={projectsStore.item} />
      <ShareButtons />
    </Box>
  );
}
