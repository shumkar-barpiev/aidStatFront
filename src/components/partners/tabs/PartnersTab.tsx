"use client";

import Image from "next/image";
import Colors from "@/styles/colors";
import { useTranslation } from "react-i18next";
import React, { useEffect, useRef } from "react";
import { NAVBAR_HEIGHT } from "@/utils/constants";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import MoveDownOutlinedIcon from "@mui/icons-material/MoveDownOutlined";
import PartnersCard from "@/components/partners/partners/PartnersCard";

const TABS_HEIGHT = 48;
const MOBILE_OFFSET = NAVBAR_HEIGHT + TABS_HEIGHT;

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
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        sx={{
          width: "80%",
          mx: "auto",
          height: {
            xs: `calc(100dvh - ${MOBILE_OFFSET}px)`,
            md: "auto",
          },
          color: Colors.darkBlue,
        }}
        justifyContent={{ xs: "start", md: "space-between" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "500px",
            maxWidth: "300px",
            height: "auto",
          }}
        >
          <Image
            alt="Project1"
            src="/assets/images/pages/partners-1.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
            priority
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
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
            {t("partnersPage.title")}
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ maxWidth: "100%" }}>
            {t("partnersPage.description")}
          </Typography>
          <Button
            variant="contained"
            onClick={scrollToTableBox}
            sx={{ my: 2, bgcolor: Colors.darkBlue }}
            startIcon={<MoveDownOutlinedIcon />}
          >
            {t("partnersPage.goToPartnersBox")}
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
