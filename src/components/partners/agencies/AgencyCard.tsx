"use client";

import React, { useEffect, useRef } from "react";
import { Box, CircularProgress, Grid, IconButton, Link, Typography } from "@mui/material";
import Image from "next/image";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useAgenciesStore } from "@/stores/partners/agencies";
import { formatCurrencyWithSpaces } from "@/utils/formatCurrency";
import { imageUrl } from "@/utils/constants";
import { useTranslation } from "react-i18next";

const AgencyCard = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { agency, agencyLoading } = useAgenciesStore();
  const { t } = useTranslation();
  const noData = `${t("agenciesPage.card.noData")}`;

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  if (agencyLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!agency) {
    return <Box sx={{ p: 3 }}>Нет данных по этому агентству</Box>;
  }

  return (
    <Box ref={cardRef} sx={{ mt: 2, width: "100%", overflow: "hidden" }}>
      <Grid
        container
        spacing={{ xs: 2, sm: 2, md: 4 }}
        sx={{
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 3 },
        }}
      >
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "300px",
            aspectRatio: "1",
            borderRadius: "8px",
            overflow: "hidden",
            mx: { xs: "auto", md: 0 },
          }}
        >
          <Image src={`${imageUrl}${agency.image}`} alt={`${agency.name} logo`} fill style={{ objectFit: "contain" }} />
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} sx={{ maxWidth: "230px" }}>
              <Typography variant="body1" color="text.secondary">
                {t("agenciesPage.card.website")}
                {":"}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  pt: 0.5,
                  fontSize: "1rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                }}
              >
                {agency.website ? (
                  <Link href={agency.website} target="_blank" color="primary" sx={{ pt: 0.5, fontSize: "1rem" }}>
                    {agency.website}
                  </Link>
                ) : (
                  noData
                )}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="text.secondary">
                {t("agenciesPage.card.phoneNumber")}
                {":"}
              </Typography>
              <Typography variant="body2" sx={{ pt: 0.5, fontSize: "1rem" }}>
                {agency.fixedPhone || noData}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="text.secondary">
                {t("agenciesPage.card.mobileNumber")}
                {":"}
              </Typography>
              <Typography variant="body2" sx={{ pt: 0.5, fontSize: "1rem" }}>
                {agency.mobilePhone || noData}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="text.secondary">
                {t("agenciesPage.card.address")}
                {":"}
              </Typography>
              <Typography variant="body2" sx={{ pt: 0.5, fontSize: "1rem" }}>
                {agency.address || noData}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="text.secondary">
                {t("agenciesPage.card.projectsTotal")}
                {":"}
              </Typography>
              <Typography variant="body2" sx={{ pt: 0.5, fontSize: "1rem" }}>
                {agency.projectCount}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="text.secondary">
                {t("agenciesPage.card.totalSum")}
                {":"}
              </Typography>
              <Typography variant="body2" sx={{ pt: 0.5, fontSize: "1rem" }}>
                {formatCurrencyWithSpaces(agency.grant, agency.credit) || "ERROR"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <IconButton color="primary" sx={{ borderRadius: "50%" }}>
          <ArrowDropUpIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AgencyCard;
