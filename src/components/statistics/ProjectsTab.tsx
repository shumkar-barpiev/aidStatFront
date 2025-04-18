import React from "react";
import { Box, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ProjectsMapFilter from "@/components/statistics/maps/ProjectsMapFilter";
import dynamic from "next/dynamic";
import { useProjectsMapStore } from "@/stores/projects/projects-for-map.ts";
import ChartsMainBlock from "@/components/statistics/charts/ChartsMainBlock.tsx";

const ProjectsMap = dynamic(() => import("@/components/statistics/maps/ProjectsMap"), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <CircularProgress size={80} />
    </Box>
  ),
});

const ProjectsTab = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" sx={{ my: 3, textAlign: "left" }}>
        Тепловая карта по распределению проектов
      </Typography>
      <Divider sx={{ mb: 2, borderColor: "darkblue", borderBottomWidth: 2 }} />
      <Box sx={{ width: "100%", height: "100%", mb: 6 }}>
        <ProjectsMapFilter />
        <Box sx={{ width: "100%", height: { xs: "400px", sm: "650px" }, margin: "auto" }}>
          <Paper sx={{ display: "flex", width: "100%", height: "100%", border: "1px solid black" }} elevation={3}>
            <ProjectsMap />
          </Paper>
        </Box>
      </Box>
      <Typography variant="h4" fontWeight="bold" sx={{ my: 3, textAlign: "left" }}>
        {t("statisticsTitle")}
      </Typography>
      <Divider sx={{ mb: 6, borderColor: "darkblue", borderBottomWidth: 2 }} />
      <ChartsMainBlock />
    </Box>
  );
};

export default ProjectsTab;
