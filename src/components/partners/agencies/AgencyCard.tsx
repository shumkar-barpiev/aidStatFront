"use client";

import React, { useEffect, useRef } from "react";
import { Box, Typography, Grid, IconButton, Link, CircularProgress, useTheme, useMediaQuery } from "@mui/material";
import Image from "next/image";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useAgenciesStore } from "@/stores/partners/agencies.ts";
import { formatCurrencyWithSpaces } from "@/utils/formatCurrency.ts";

const AgencyCard = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { agency, agencyLoading } = useAgenciesStore();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        spacing={isMobile ? 2 : 4}
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
          <Image
            src={`data:image/jpeg;base64,${agency.image}`}
            alt={`${agency.name} logo`}
            fill
            style={{ objectFit: "contain" }}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} sx={{ maxWidth: "230px" }}>
              <Typography variant="body1" color="text.secondary">
                Website:
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
                  "Cайт не указан"
                )}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="text.secondary">
                Тел:
              </Typography>
              <Typography variant="body2" sx={{ pt: 0.5, fontSize: "1rem" }}>
                {agency.fixedPhone}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="text.secondary">
                Мобильный тел:
              </Typography>
              <Typography variant="body2" sx={{ pt: 0.5, fontSize: "1rem" }}>
                {agency.mobilePhone || "Номер не указан"}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="text.secondary">
                Адрес:
              </Typography>
              <Typography variant="body2" sx={{ pt: 0.5, fontSize: "1rem" }}>
                {agency.address || "Адрес не указан"}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="text.secondary">
                Количество проектов:
              </Typography>
              <Typography variant="body2" sx={{ pt: 0.5, fontSize: "1rem" }}>
                {agency.projectCount}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="text.secondary">
                Общая сумма реализуемых проектов:
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
