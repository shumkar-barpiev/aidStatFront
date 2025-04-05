"use client";

import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import { safeDecrypt } from "@/utils/crypto-utils";
import React, { useEffect, useState } from "react";
import ShowProject from "@/components/projects/show/ShowProject";
import { containerWidths, containerMargins } from "@/utils/constants";
import { useProjectsViewModel } from "@/viewmodels/projects/useProjectsViewModel";

export default function ProjectsShowPage() {
  const params = useParams();
  const { project, fetchProject } = useProjectsViewModel();
  const [isClient, setIsClient] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const encryptedProjectName = Array.isArray(params.encryptedProjectName)
      ? params.encryptedProjectName[0]
      : params.encryptedProjectName;

    if (encryptedProjectName) {
      try {
        const decryptedName = safeDecrypt(encryptedProjectName);
        setProjectName(decryptedName);
      } catch (e) {
        console.error("Invalid encryption string", e);
      }
    }
  }, [params.encryptedProjectName]);

  useEffect(() => {
    if (projectName) fetchProject(projectName);
  }, [projectName]);

  if (!isClient) return null;

  return (
    <Box sx={{ width: containerWidths, mx: containerMargins }}>
      <ShowProject />
    </Box>
  );
}
