"use client";

import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PartnerShow from "@/components/partners/partners/show/ShowPartner";
import { containerMargins, containerWidths } from "@/utils/constants";
import CustomBreadcrumbs from "@/components/breadcrumbs/CustomBreadcrumbs";
import { usePartnersViewModel } from "@/viewmodels/partners/usePartnersViewModel";
import { usePartnersStore } from "@/stores/partners/partners.ts";

export default function PartnerShowPage() {
  const params = useParams();
  const { fetchPartner } = usePartnersViewModel();
  const [isClient, setIsClient] = useState<boolean>(false);
  const partnerStore = usePartnersStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const partnerId = parseInt(hash.substring(1), 10);
      if (!isNaN(partnerId)) fetchPartner(partnerId);
    }
  }, [params.projectParams]);

  if (!isClient) return null;

  return (
    <Box sx={{ width: containerWidths, mx: containerMargins, p: 3 }}>
      <CustomBreadcrumbs path={`partners/${partnerStore.item?.name}`} />
      <PartnerShow partner={partnerStore.item} />
    </Box>
  );
}
