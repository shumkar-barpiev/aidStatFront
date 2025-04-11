"use client";

import {
  Map as CoverageIcon,
  Business as AgencyIcon,
  Category as SectorsIcon,
  Engineering as ImplementingIcon,
  Diversity3Outlined as PartnersIcon,
  AssignmentOutlined as DescriptionIcon,
  CurrencyExchangeRounded as FundingIcon,
} from "@mui/icons-material";
import Colors from "@/styles/colors";
import React, { useEffect, useState } from "react";
import { TProjectModel } from "@/models/project/ProjectModel";
import { useProjectsStore } from "@/stores/projects/projects";
import { Box, Typography, Grid, Divider } from "@mui/material";
import ProjectTimeLine from "@/components/projects/show/ProjectTimeLine";
import { useProjectsViewModel } from "@/viewmodels/projects/useProjectsViewModel";

export const ShowProject = () => {
  const projectsStore = useProjectsStore();
  const [project, setProject] = useState<TProjectModel | null>(null);
  const { getProjectSectorsTitle, getProjectRegionsTitle } = useProjectsViewModel();

  useEffect(() => {
    setProject(projectsStore.item);
  }, [projectsStore.item]);

  return (
    <Box sx={{ py: 3 }}>
      <Box>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            mb: 4,
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        >
          {project?.name}
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <DescriptionIcon color="primary" fontSize="large" />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Описание проекта
            </Typography>
          </Box>
          <Box component="ul" sx={{ pl: 2.5, listStyleType: "none" }}>
            <Box component="li" sx={{ mb: 1, display: "flex", alignItems: "flex-start" }}>
              <Typography sx={{ mb: 1 }} variant="subtitle1">
                {project?.description}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ height: "120px" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <FundingIcon color="primary" fontSize="large" />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Общая сумма финансирования
                    </Typography>
                  </Box>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Общий бюджет:</strong> 5 000 000,00 USD
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Фактически освоено:</strong> 3 750 000,00 USD (75%)
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ height: "120px" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <AgencyIcon color="primary" fontSize="large" />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Исполнительное агентство
                    </Typography>
                  </Box>
                  <Typography sx={{ mb: 1 }}>Министерство Энергетики Кыргызской Республики</Typography>
                </Box>
                <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ height: "100px" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <SectorsIcon color="primary" fontSize="large" />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Секторы
                    </Typography>
                  </Box>

                  <Typography sx={{ mb: 1 }}>{getProjectSectorsTitle(project?.sectors ?? [])}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ height: "120px" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <PartnersIcon color="primary" fontSize="large" />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Партнеры
                    </Typography>
                  </Box>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Наименование:</strong> Международная ассоциация развития (MAP)
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ height: "120px" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <ImplementingIcon color="primary" fontSize="large" />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Реализующее агентство:
                    </Typography>
                  </Box>
                  <Typography sx={{ mb: 1 }}>ТОО &quot;КыргызГидроСтрой&quot;</Typography>
                </Box>
                <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ height: "100px" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <CoverageIcon color="primary" fontSize="large" />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Географический охват
                    </Typography>
                  </Box>
                  <Typography sx={{ mb: 1 }}>{getProjectRegionsTitle(project?.geographicalCoverage ?? [])}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 6 }}>
        <Divider sx={{ mb: 8, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
        <ProjectTimeLine />
      </Box>
    </Box>
  );
};
