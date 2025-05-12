"use client";

import {
  AccountBalanceOutlined as ProjectCredit,
  AssignmentOutlined as DescriptionIcon,
  Assistant as TechAssistanceIcon,
  AttachMoney as CoFinancingIcon,
  Business as AgencyIcon,
  Category as SectorsIcon,
  CurrencyExchangeRounded as FundingIcon,
  Diversity3Outlined as PartnersIcon,
  Engineering as ImplementingIcon,
  Map as CoverageIcon,
  RequestQuoteOutlined as ProjectGrant,
} from "@mui/icons-material";
import Colors from "@/styles/colors";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { TProjectModel } from "@/models/project/ProjectModel";
import ProjectBadges from "@/components/projects/ProjectBadges";
import { formatCurrencyWithSpaces } from "@/utils/formatCurrency";
import ProjectTimeLine from "@/components/projects/show/ProjectTimeLine";
import { plainBtnStyle } from "@/components/navigation-bar/NavigationBar";
import { Box, Card, CardMedia, Divider, Grid, Stack, SxProps, Tooltip, Typography } from "@mui/material";
import AddToDriveOutlinedIcon from "@mui/icons-material/AddToDriveOutlined";
import { ProjectDocuments } from "@/components/projects/show/ProjectDocuments";
import { ProjectGrantCreditTable } from "@/components/projects/show/ProjectGrantCreditTable";
import FundsSpentBlock from "@/components/projects/show/FundsSpentBlock";
import { transliterate } from "@/utils/format/transliterate";
import { imageUrl } from "@/utils/constants";

interface NotSpecifiedTextProps {
  sx?: SxProps;
}

export const NotSpecifiedText: React.FC<NotSpecifiedTextProps> = ({ sx }) => {
  const { t } = useTranslation();

  return (
    <Typography variant="subtitle1" color={"gray"} sx={{ flexGrow: 1, ...sx }}>
      {t("notSpecified")}
    </Typography>
  );
};

interface Props {
  project: TProjectModel | null;
}

export const ShowProject: React.FC<Props> = ({ project }) => {
  const router = useRouter();
  const [grantItems, setGrantItems] = useState<Record<string, any>[]>([]);
  const [creditItems, setCreditItems] = useState<Record<string, any>[]>([]);

  let grantSum = 0;
  let creditSum = 0;

  project &&
    project.funding &&
    project.funding.items &&
    project.funding.items.forEach((item) => {
      const amount = parseFloat(item.totalSum.replace(" KGS", "").replace(" ", ""));
      if (item.type === "Grant") {
        grantSum += amount;
      } else if (item.type === "Loan") {
        creditSum += amount;
      }
    });

  const total = grantSum + creditSum;

  let grantPercent = "0%";
  let creditPercent = "0%";

  if (total > 0) {
    grantPercent = `${Math.round((grantSum / total) * 100)}%`;
    creditPercent = `${Math.round((creditSum / total) * 100)}%`;
  }

  const renderProjectStakeholders = (stakeholders: Record<string, any>[]) => {
    if (!stakeholders || stakeholders.length === 0) return "";

    return (
      <ul style={{ paddingLeft: "1.5rem", margin: 0 }}>
        {stakeholders.map((partner, index) => (
          <Stack key={index} direction={"row"} alignItems={"center"} spacing={2}>
            <Tooltip title={partner.name}>
              <CardMedia
                component="img"
                image={`${imageUrl}${partner.image}`}
                alt={partner.name}
                sx={{
                  width: 60,
                  height: 60,
                  objectFit: "contain",
                }}
              />
            </Tooltip>

            <button
              onClick={() => {
                router.push(`/partners/show/${transliterate(partner.name)}#${partner.id}`);
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
    if (!project?.funding?.items) {
      setGrantItems([]);
      setCreditItems([]);
      return;
    }

    const grant: Record<string, any>[] = [];
    const credit: Record<string, any>[] = [];

    project.funding.items.forEach((item) => {
      if (item.type === "Grant") grant.push(item);
      else if (item.type === "Loan") credit.push(item);
    });

    setGrantItems(grant);
    setCreditItems(credit);
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
          </Grid>
        </Card>

        <Divider sx={{ my: 3, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />

        <FundsSpentBlock project={project} />

        <Box sx={{ my: 3 }}>
          <Divider sx={{ mb: 3, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
          <ProjectTimeLine project={project} />
        </Box>

        <Box flex={1}>
          <Divider sx={{ my: 3, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <ProjectCredit color="primary" fontSize="large" />
            <Typography variant="h6">Кредит {creditPercent}</Typography>
          </Box>
          {creditItems.length ? <ProjectGrantCreditTable items={creditItems} /> : <NotSpecifiedText />}
        </Box>

        <Box flex={1}>
          <Divider sx={{ my: 3, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <ProjectGrant color="primary" fontSize="large" />
            <Typography variant="h6">Грант {grantPercent}</Typography>
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
