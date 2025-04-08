"use client";

import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { containerWidths, containerMargins } from "@/utils/constants";
import CustomBreadcrumbs from "@/components/breadcrumbs/CustomBreadcrumbs";
import { usePartnersViewModel } from "@/viewmodels/partners/usePartnersViewModel";

export default function PartnerShowPage() {
  const params = useParams();
  const { fetchPartner } = usePartnersViewModel();
  const [isClient, setIsClient] = useState<boolean>(false);
  const [partnerName, setPartnerName] = useState<string>("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fullPath = window.location.pathname;
    const decodedPath = decodeURIComponent(fullPath);
    const partnerName = decodedPath.split("/partners/show/")[1];
    const hash = window.location.hash;

    if (partnerName && hash) {
      setPartnerName(partnerName);
      const partnerId = parseInt(hash.substring(1), 10);
      if (!isNaN(partnerId)) fetchPartner(partnerId);
    }
  }, [params.projectParams]);

  if (!isClient) return null;

  return (
    <Box sx={{ width: containerWidths, mx: containerMargins, p: 3 }}>
      <CustomBreadcrumbs path={`partners/${decodeURIComponent(partnerName)}`} />
      {partnerName}
    </Box>
  );
}
