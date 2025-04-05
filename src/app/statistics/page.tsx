"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Divider, Grid, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { containerMargins, containerWidths } from "@/utils/constants";
import CardComponent from "./CardComponent";
import { cardsData } from "./devData";

export default function StatisticsPage() {
  const { t } = useTranslation();
  const boxRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;
  return (
    <Box ref={boxRef} sx={{ width: containerWidths, mx: containerMargins, p: 2, minHeight: "100vh" }}>
      <Box sx={{ width: 1, p: 2 }}>map component with features should be here</Box>
      <Box
        sx={{
          mt: "-10px",
          position: "relative",
          width: "100%",
          height: "95vh",
          backgroundImage: `url(https://help.revealbi.io/assets/images/presidential-election-2016-map-example-a1210abf62e47cbce757f047e04a0a84.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
        }}
      />
      <Typography variant="h4" fontWeight="bold" sx={{ my: 3, textAlign: "left" }}>
        {t("statisticsTitle")}
      </Typography>
      <Divider sx={{ mb: 6, borderColor: "darkblue", borderBottomWidth: 2 }} />
      <Grid container spacing={3}>
        {cardsData.map((card) => (
          <Grid item xs={12} sm={6} key={card.id}>
            <CardComponent card={card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
