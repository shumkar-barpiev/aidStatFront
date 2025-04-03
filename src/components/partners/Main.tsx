"use client";

import Image from "next/image";
import Colors from "@/styles/colors";
import { useTranslation } from "react-i18next";
import React, { useEffect, useRef, useState } from "react";
import PartnersCard from "@/components/partners/PartnersCard";
import { Grid, Box, Stack, Typography, Button } from "@mui/material";
import MoveDownOutlinedIcon from "@mui/icons-material/MoveDownOutlined";
import { containerWidths, containerMargins, NAVBAR_HEIGHT } from "@/utils/constants";

export default function Main() {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const projectsTableRef = useRef<HTMLDivElement | null>(null);

  const scrollToTableBox = () => {
    if (projectsTableRef.current) {
      const yOffset = -NAVBAR_HEIGHT;
      const y = projectsTableRef.current.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <Box sx={{ width: containerWidths, mx: containerMargins, p: 2 }}>
      <Stack
        alignItems={"center"}
        direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
        spacing={3}
        sx={{ width: "80%", mx: "auto", height: { xs: "90vh", sm: "90vh", md: "auto" } }}
        justifyContent={{ xs: "center", sm: "center", md: "space-between", lg: "space-between" }}
      >
        <Box sx={{ position: "relative", width: "65%", maxWidth: "400px", height: "auto", aspectRatio: "1" }}>
          <Image src="/assets/images/pages/partners-1.jpg" alt="Partners" fill style={{ objectFit: "contain" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", sm: "center", md: "flex-start" },
            textAlign: { xs: "center", sm: "center", md: "left" },
            width: "100%",
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
              maxWidth: { xs: "100%", md: "80%" },
            }}
          >
            {t("partnersPage")}
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            gutterBottom
            sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)", maxWidth: { xs: "100%", md: "90%" } }}
          >
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

      <Box ref={projectsTableRef} sx={{ width: 1, pt: 2, minHeight: "90vh" }}>
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
}
