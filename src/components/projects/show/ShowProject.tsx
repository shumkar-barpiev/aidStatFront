"use client";

import {
  Map as CoverageIcon,
  Business as AgencyIcon,
  Category as SectorsIcon,
  AttachMoney as CoFinancingIcon,
  Engineering as ImplementingIcon,
  Assistant as TechAssistanceIcon,
  CalendarToday as CurrentYearIcon,
  TrendingUp as DomesticFundingIcon,
  Diversity3Outlined as PartnersIcon,
  AssignmentOutlined as DescriptionIcon,
  CurrencyExchangeRounded as FundingIcon,
} from "@mui/icons-material";
import Colors from "@/styles/colors";
import React, { useEffect, useState } from "react";
import { TProjectModel } from "@/models/project/ProjectModel";
import { useProjectsStore } from "@/stores/projects/projects";
import { Box, Typography, Grid, Divider, Card } from "@mui/material";
import ProjectTimeLine from "@/components/projects/show/ProjectTimeLine";
import AddToDriveOutlinedIcon from "@mui/icons-material/AddToDriveOutlined";
import { ProjectDocuments } from "@/components/projects/show/ProjectDocuments";
import { useProjectsViewModel } from "@/viewmodels/projects/useProjectsViewModel";

export const ShowProject = () => {
  const projectsStore = useProjectsStore();
  const [project, setProject] = useState<TProjectModel | null>(null);
  const { getProjectSectorsTitle, getProjectRegionsTitle, getProjectPartnersTitle } = useProjectsViewModel();

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
                  <Typography sx={{ mb: 1 }}>
                    {project?.contractors && getProjectPartnersTitle(project?.contractors)}
                  </Typography>
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
                <Divider
                  sx={{
                    mb: 2,
                    borderColor: Colors.darkBlue,
                    borderBottomWidth: 2,
                    display: { xs: "block", sm: "block", md: "none" },
                  }}
                />
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
                    <strong>Наименование: </strong>
                    {project?.partners && getProjectPartnersTitle(project?.partners)}
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ height: "120px" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <ImplementingIcon color="primary" fontSize="large" />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Реализующее агентство
                    </Typography>
                  </Box>
                  <Typography sx={{ mb: 1 }}>
                    {project?.implementors && getProjectPartnersTitle(project?.implementors)}
                  </Typography>
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
        <Divider sx={{ my: 3, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />

        <Card sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <CoFinancingIcon color="primary" sx={{ mr: 1, fontSize: 32 }} />
                  <Typography variant="h6" fontWeight="bold" sx={{ whiteSpace: "nowrap" }}>
                    Сумма софинансирования
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {project?.funding?.coFundingSum || "Н/Д"}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <TechAssistanceIcon color="primary" sx={{ mr: 1, fontSize: 32 }} />
                  <Typography variant="h6" fontWeight="bold" sx={{ whiteSpace: "nowrap" }}>
                    Сумма технической помощи
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {project?.funding?.techAidSum || "Н/Д"}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <DomesticFundingIcon color="primary" sx={{ mr: 1, fontSize: 32 }} />
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ whiteSpace: "nowrap", width: 1, overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    Освоение внутреннего финансирования
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {project?.funding?.fundsSpent || "Н/Д"}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <CurrentYearIcon color="primary" sx={{ mr: 1, fontSize: 32 }} />
                  <Typography variant="h6" fontWeight="bold" sx={{ whiteSpace: "nowrap" }}>
                    Освоение за текущий год
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {project?.funding?.fundsSpentCurrentYear || "Н/Д"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
        <Box sx={{ mb: 3 }}>
          <Divider sx={{ mb: 3, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
          <ProjectTimeLine />
        </Box>

        <Box sx={{ my: 3 }}>
          <Divider sx={{ mb: 3, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <AddToDriveOutlinedIcon color="primary" sx={{ mr: 1, fontSize: 32 }} />
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ whiteSpace: "nowrap", width: 1, overflow: "hidden", textOverflow: "ellipsis" }}
            >
              Документы
            </Typography>
          </Box>

          <ProjectDocuments />
        </Box>
      </Box>
    </Box>
  );
};
