"use client";

import Image from "next/image";
import Colors from "@/styles/colors";
import { useTranslation } from "react-i18next";
import React, { useEffect, useRef, useState } from "react";
import ProjectsTable from "@/components/projects/ProjectsTable";
import ProjectsFilter from "@/components/projects/ProjectsFilter";
import { Grid, Box, Stack, Typography, Button } from "@mui/material";
import MoveDownOutlinedIcon from "@mui/icons-material/MoveDownOutlined";
import { ProjectSearchField } from "@/components/projects/ProjectSearch";
import { containerWidths, containerMargins, NAVBAR_HEIGHT } from "@/utils/constants";

export default function Main() {
  const { t } = useTranslation();
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
        sx={{ width: "90%", mx: "auto", height: { xs: "90vh", sm: "90vh", md: "45vh" } }}
        justifyContent={{ xs: "center", sm: "center", md: "space-between", lg: "space-between" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", sm: "center", md: "flex-end" },
            textAlign: { xs: "center", sm: "center", md: "right" },
            color: Colors.darkBlue,
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              maxWidth: "100%",
            }}
          >
            {t("projectsPage.title")}
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ maxWidth: "100%" }}>
            {t("projectsPage.description")}
          </Typography>
          <Button
            variant="contained"
            onClick={scrollToTableBox}
            sx={{ marginBottom: 2, bgcolor: Colors.darkBlue }}
            startIcon={<MoveDownOutlinedIcon />}
          >
            {t("projectsPage.goToProjectsTableBox")}
          </Button>
        </Box>

        <Box sx={{ position: "relative", width: "100%", maxWidth: "800px", height: "auto", aspectRatio: "1" }}>
          <Image
            fill
            alt="Project1"
            style={{ objectFit: "cover" }}
            src="/assets/images/pages/projects-1.png"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            priority
          />
        </Box>
      </Stack>

      <Box ref={projectsTableRef} sx={{ width: 1, pt: 2, minHeight: "90vh" }}>
        <Grid container spacing={1} sx={{ flex: 1, height: "100%" }}>
          <Grid item xs={12} sm={12} md={3}>
            <ProjectsFilter />
          </Grid>

          <Grid item xs={12} sm={12} md={9} sx={{ flex: 1, height: "100%", minHeight: "100%" }}>
            <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "4px", width: "100%" }}>
              <ProjectSearchField />
              <ProjectsTable />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
