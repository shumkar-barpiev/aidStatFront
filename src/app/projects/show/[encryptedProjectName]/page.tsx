"use client";

import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import { safeDecrypt } from "@/utils/crypto-utils";
import React, { useEffect, useState } from "react";

export default function ProjectsShowPage() {
  const params = useParams();
  const [isClient, setIsClient] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");

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
    console.log(projectName);
  }, [projectName]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <Box>{projectName ? `Project Name: ${projectName}` : "Loading..."}</Box>;
}
