"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, Divider, Grid } from "@mui/material";
import CardComponent from "@/components/statistics/charts/ChartCard";
import { useStatisticsChartsViewModel } from "@/viewmodels/statistics/charts/useStatisticChartsViewModel";

export default function Main() {
  const { t } = useTranslation();
  const { cardsData } = useStatisticsChartsViewModel();

  return (
    <Box sx={{ width: 1 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ my: 3, textAlign: "left" }}>
        {t("statisticsTitle")}
      </Typography>
      <Divider sx={{ mb: 6, borderColor: "darkblue", borderBottomWidth: 2 }} />
      <Grid container spacing={3}>
        {cardsData.map((card) => (
          <Grid item xs={12} sm={12} lg={6} key={card.id}>
            <CardComponent card={card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
