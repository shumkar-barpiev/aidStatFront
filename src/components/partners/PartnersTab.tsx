'use client'

import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Colors from "@/styles/colors.ts";
import Image from "next/image";
import MoveDownOutlinedIcon from "@mui/icons-material/MoveDownOutlined";
import PartnersCard from "@/components/partners/partners/PartnersCard.tsx";
import { NAVBAR_HEIGHT } from "@/utils/constants.ts";

const PartnersTab = () => {
  const { t } = useTranslation();
  const partnersBoxRef = useRef<HTMLDivElement | null>(null);

  const scrollToTableBox = () => {
    if (partnersBoxRef.current) {
      const yOffset = -NAVBAR_HEIGHT;
      const y = partnersBoxRef.current.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <Box>
      <Stack
        alignItems={"center"}
        direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
        spacing={3}
        sx={{ width: "80%", mx: "auto", height: { xs: "50vh", sm: "50vh", md: "auto" }, color: Colors.darkBlue, mb: 3 }}
        justifyContent={{ xs: "center", sm: "center", md: "space-between", lg: "space-between" }}
      >
        <Box sx={{ position: "relative", width: "100%", maxWidth: "300px", height: "auto", aspectRatio: "1" }}>
          <Image
            fill
            alt="Project1"
            style={{ objectFit: "cover" }}
            src="/assets/images/pages/partners-1.png"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
            priority
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", sm: "center", md: "flex-start" },
            textAlign: { xs: "center", sm: "center", md: "left" },
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,

              maxWidth: { xs: "100%", md: "90%" },
            }}
          >
            {t("partners")}
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ maxWidth: "100%" }}>
            {t("partnersPageDescription")}
          </Typography>
          <Button
            variant="contained"
            onClick={scrollToTableBox}
            sx={{ marginBottom: 2, bgcolor: Colors.darkBlue }}
            startIcon={<MoveDownOutlinedIcon />}
          >
            {t("goToPartnersBox")}
          </Button>
        </Box>
      </Stack>

      <Box ref={partnersBoxRef} sx={{ width: 1, pt: 2, minHeight: "90vh" }}>
        <Grid container spacing={1} sx={{ flex: 1, height: "100%" }}>
          <Grid item xs={12} sx={{ flex: 1, height: "100%", minHeight: "100%" }}>
            <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "4px" }}>
              <PartnersCard />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PartnersTab;