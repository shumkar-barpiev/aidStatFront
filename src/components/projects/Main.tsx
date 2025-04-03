"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Box, Stack, Typography } from "@mui/material";
import { containerWidths, containerMargins } from "@/utils/constants";

export default function Main() {
  const { t } = useTranslation();

  return (
    <Box sx={{ width: containerWidths, mx: containerMargins, p: 2 }}>
      <Stack
        alignItems={"center"}
        direction={{ xs: "column-reverse", sm: "column-reverse", md: "row", lg: "row", xl: "row" }}
        spacing={3}
        sx={{ width: "80%", mx: "auto" }}
        justifyContent={"space-between"}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", sm: "center", md: "flex-end" },
            textAlign: { xs: "center", sm: "center", md: "right" },
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
            {t("projectsPage")}
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            gutterBottom
            sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)", maxWidth: { xs: "100%", md: "90%" } }}
          >
            {t("projectsPageDescription")}
          </Typography>
        </Box>

        <Box sx={{ position: "relative", width: "65%", maxWidth: "450px", height: "auto", aspectRatio: "1" }}>
          <Image src="/assets/images/projects/projects-1.png" alt="Project1" fill style={{ objectFit: "contain" }} />
        </Box>
      </Stack>
    </Box>
  );
}
