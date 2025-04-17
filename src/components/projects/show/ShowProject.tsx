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
  RequestQuoteOutlined as ProjectGrant,
  AssignmentOutlined as DescriptionIcon,
  CurrencyExchangeRounded as FundingIcon,
  AccountBalanceOutlined as ProjectCredit,
} from "@mui/icons-material";
import Colors from "@/styles/colors";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { TProjectModel } from "@/models/project/ProjectModel";
import { useProjectsStore } from "@/stores/projects/projects";
import ProjectBadges from "@/components/projects/ProjectBadges";
import { formatCurrencyWithSpaces } from "@/utils/formatCurrency";
import { getAvatarAsCardMedia } from "@/components/other/Base64Avatar";
import ProjectTimeLine from "@/components/projects/show/ProjectTimeLine";
import { plainBtnStyle } from "@/components/navigation-bar/NavigationBar";
import { Box, Typography, Grid, Divider, Card, Stack } from "@mui/material";
import AddToDriveOutlinedIcon from "@mui/icons-material/AddToDriveOutlined";
import { ProjectDocuments } from "@/components/projects/show/ProjectDocuments";
import { ProjectGrantCreditTable } from "@/components/projects/show/ProjectGrantCreditTable";

export const NotSpecifiedText = () => {
  const { t } = useTranslation();

  return (
    <Typography variant="subtitle1" color={"gray"} sx={{ flexGrow: 1 }}>
      {t("notSpecified")}
    </Typography>
  );
};

export const ShowProject = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const projectsStore = useProjectsStore();
  const [project, setProject] = useState<TProjectModel | null>(null);
  const [grantItems, setGrantItems] = useState<Record<string, any>[]>([]);
  const [creditItems, setCreditItems] = useState<Record<string, any>[]>([]);

  const renderProjectStakeholders = (stakeholders: Record<string, any>[]) => {
    if (!stakeholders || stakeholders.length === 0) return "";

    return (
      <ul style={{ paddingLeft: "1.5rem", margin: 0 }}>
        {stakeholders.map((partner, index) => (
          <Stack key={index} direction={"row"} alignItems={"center"} spacing={2}>
            {getAvatarAsCardMedia(partner.name, partner.image ?? null, 60)}

            <button
              onClick={() => {
                router.push(`/partners/show/${partner.name}#${partner.id}`);
              }}
              style={plainBtnStyle}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 550,
                  fontFamily: "sans-serif",
                  fontSize: "0.85rem",
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                  textOverflow: "ellipsis",

                  "&:hover": {
                    color: "#2E4B6D",
                    transition: "color 0.3s ease",
                  },
                }}
              >
                {partner.name}
              </Typography>
            </button>
          </Stack>
        ))}
      </ul>
    );
  };

  const renderProjectCoverage = (regions: Record<string, any>[]) => {
    if (!regions || regions.length === 0) return "";

    return (
      <ul style={{ paddingLeft: "1.5rem", margin: 0 }}>
        {regions.map((region, index) => (
          <li key={index}>
            <Typography variant="subtitle1" fontWeight={"bold"}>
              {region.region.name}
            </Typography>
          </li>
        ))}
      </ul>
    );
  };

  const renderProjectSectors = (sectors: Record<string, any>[]) => {
    if (!sectors || sectors.length === 0) return "";

    return (
      <ul style={{ paddingLeft: "1.5rem", margin: 0 }}>
        {sectors.map((sector, index) => (
          <li key={index}>
            <Typography variant="subtitle1" fontWeight={"bold"}>
              {sector.name}
            </Typography>
          </li>
        ))}
      </ul>
    );
  };

  const getConditionalDivider = () => {
    return (
      <Divider sx={{ borderColor: Colors.darkBlue, borderBottomWidth: 2, display: { xs: "block", md: "none" } }} />
    );
  };

  useEffect(() => {
    setProject(projectsStore.item);
  }, [projectsStore.item]);

  useEffect(() => {
    if (project) {
      const fundingItems = project.funding?.items;

      if (fundingItems) {
        const grant = fundingItems?.filter((item: Record<string, any>) => item.type == "Grant");
        const credit = fundingItems?.filter((item: Record<string, any>) => item.type == "Loan");

        setGrantItems(grant ?? []);
        setCreditItems(credit ?? []);
      }
    }
  }, [project]);

  return (
    <Box sx={{ py: 3 }}>
      <Box>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          >
            {project?.name}
          </Typography>
          {project?.status && (
            <ProjectBadges status={project?.status as "In progress" | "Completed" | "Not started" | "Canceled"} />
          )}
        </Stack>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <DescriptionIcon color="primary" fontSize="large" />
            <Typography variant="h6">Описание проекта</Typography>
          </Box>

          {project?.description ? (
            <Typography sx={{ mb: 1, textAlign: "justify" }} variant="subtitle1">
              {project?.description}
            </Typography>
          ) : (
            <NotSpecifiedText />
          )}
          <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
        </Box>

        <Stack spacing={4}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
            <Box flex={1}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <FundingIcon color="primary" fontSize="large" />
                <Typography variant="h6">Общая сумма финансирования</Typography>
              </Box>
              {project?.funding?.totalSum ? (
                <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
                  {formatCurrencyWithSpaces(project?.funding?.totalSum)}
                </Typography>
              ) : (
                <NotSpecifiedText />
              )}
            </Box>

            {getConditionalDivider()}

            <Box flex={1}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <PartnersIcon color="primary" fontSize="large" />
                <Typography variant="h6">Партнеры</Typography>
              </Box>
              {project?.partners?.length ? (
                <Box>{renderProjectStakeholders(project?.partners)}</Box>
              ) : (
                <NotSpecifiedText />
              )}
            </Box>
          </Stack>

          <Divider sx={{ borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />

          <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
            <Box flex={1}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <AgencyIcon color="primary" fontSize="large" />
                <Typography variant="h6">Исполнительное агентство</Typography>
              </Box>
              {project?.contractors?.length ? (
                <Box>{renderProjectStakeholders(project?.contractors)}</Box>
              ) : (
                <NotSpecifiedText />
              )}
            </Box>

            {getConditionalDivider()}

            <Box flex={1}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <ImplementingIcon color="primary" fontSize="large" />
                <Typography variant="h6">Реализующее агентство</Typography>
              </Box>
              {project?.implementors?.length ? (
                <Box>{renderProjectStakeholders(project?.implementors)}</Box>
              ) : (
                <NotSpecifiedText />
              )}
            </Box>
          </Stack>

          <Divider sx={{ borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />

          <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
            <Box flex={1}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <SectorsIcon color="primary" fontSize="large" />
                <Typography variant="h6">Секторы</Typography>
              </Box>
              {project?.sectors?.length ? renderProjectSectors(project.sectors) : <NotSpecifiedText />}
            </Box>

            {getConditionalDivider()}

            <Box flex={1}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <CoverageIcon color="primary" fontSize="large" />
                <Typography variant="h6">Географический охват</Typography>
              </Box>
              {project?.geographicalCoverage?.length ? (
                renderProjectCoverage(project.geographicalCoverage)
              ) : (
                <NotSpecifiedText />
              )}
            </Box>
          </Stack>
        </Stack>

        <Divider sx={{ my: 3, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />

        <Card sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <CoFinancingIcon color="primary" fontSize="large" />
                  <Typography variant="h6" sx={{ whiteSpace: "nowrap" }}>
                    Сумма софинансирования
                  </Typography>
                </Box>
                {project?.funding?.coFundingSum ? (
                  <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                    {formatCurrencyWithSpaces(project.funding.coFundingSum)}
                  </Typography>
                ) : (
                  <NotSpecifiedText />
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <TechAssistanceIcon color="primary" fontSize="large" />
                  <Typography variant="h6" sx={{ whiteSpace: "nowrap" }}>
                    Сумма технической помощи
                  </Typography>
                </Box>
                {project?.funding?.techAidSum ? (
                  <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                    {formatCurrencyWithSpaces(project.funding.techAidSum)}
                  </Typography>
                ) : (
                  <NotSpecifiedText />
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <DomesticFundingIcon color="primary" fontSize="large" />
                  <Typography
                    variant="h6"
                    sx={{ whiteSpace: "nowrap", width: 1, overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    Освоение внутреннего финансирования
                  </Typography>
                </Box>
                {project?.funding?.fundsSpent ? (
                  <Typography variant="h6" fontWeight={"bold"} sx={{ flexGrow: 1 }}>
                    {formatCurrencyWithSpaces(project.funding.fundsSpent)}
                  </Typography>
                ) : (
                  <NotSpecifiedText />
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <CurrentYearIcon color="primary" fontSize="large" />
                  <Typography variant="h6" sx={{ whiteSpace: "nowrap" }}>
                    Освоение за текущий год
                  </Typography>
                </Box>
                {project?.funding?.fundsSpentCurrentYear ? (
                  <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
                    {formatCurrencyWithSpaces(project.funding.fundsSpentCurrentYear)}
                  </Typography>
                ) : (
                  <NotSpecifiedText />
                )}
              </Box>
            </Grid>
          </Grid>
        </Card>

        <Box sx={{ my: 3 }}>
          <Divider sx={{ mb: 3, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
          <ProjectTimeLine project={project} />
        </Box>

        <Box flex={1}>
          <Divider sx={{ my: 3, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <ProjectCredit color="primary" fontSize="large" />
            <Typography variant="h6">Кредит</Typography>
          </Box>
          {creditItems.length ? <ProjectGrantCreditTable items={creditItems} /> : <NotSpecifiedText />}
        </Box>

        <Box flex={1}>
          <Divider sx={{ my: 3, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <ProjectGrant color="primary" fontSize="large" />
            <Typography variant="h6">Грант</Typography>
          </Box>
          {grantItems.length ? <ProjectGrantCreditTable items={grantItems} /> : <NotSpecifiedText />}
        </Box>

        <Box sx={{ my: 3 }}>
          <Divider sx={{ mb: 3, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <AddToDriveOutlinedIcon color="primary" fontSize="large" sx={{ mr: 1 }} />
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
