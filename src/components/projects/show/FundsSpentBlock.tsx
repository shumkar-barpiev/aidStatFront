"use client";

import React from "react";
import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import {
  CalendarMonth as PeriodIcon,
  DateRange as CurrentYearIcon,
  TrendingUp as DomesticFundingIcon,
} from "@mui/icons-material";
import { formatCurrencyWithSpaces } from "@/utils/formatCurrency";
import Colors from "@/styles/colors";
import { NotSpecifiedText } from "@/components/projects/show/ShowProject";
import { TProjectModel } from "@/models/project/ProjectModel";
import { useTranslation } from "react-i18next";
import { formattedUpdateTime } from "@/utils/format/formattedUpdateTime";

interface Props {
  project: TProjectModel | null;
}

const FundsSpentBlock: React.FC<Props> = ({ project }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <DomesticFundingIcon color="primary" fontSize="large" sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ whiteSpace: "nowrap", width: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
          {t("projectInfoPage.domesticFinancingAbsorption")}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <PeriodIcon color="primary" fontSize="large" sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                sx={{ whiteSpace: "nowrap", width: 1, overflow: "hidden", textOverflow: "ellipsis" }}
              >
                {t("projectInfoPage.absorption.total")}
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
              <CurrentYearIcon color="primary" fontSize="large" sx={{ mr: 1 }} />
              <Typography variant="h6" sx={{ whiteSpace: "nowrap" }}>
                {t("projectInfoPage.absorption.currentYear")}
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

      <Divider sx={{ my: 3, borderColor: Colors.textSecondary, borderBottomWidth: 2 }} />

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <DomesticFundingIcon color="primary" fontSize="large" sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ whiteSpace: "nowrap", width: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
          {t("projectInfoPage.externalFinancingAbsorption")}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <PeriodIcon color="primary" fontSize="large" sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                sx={{ whiteSpace: "nowrap", width: 1, overflow: "hidden", textOverflow: "ellipsis" }}
              >
                {t("projectInfoPage.absorption.total")}
              </Typography>
            </Box>
            {project?.funding?.fundsSpent ? (
              <Typography variant="h6" fontWeight={"bold"} sx={{ flexGrow: 1 }}>
                {formatCurrencyWithSpaces(project.funding.fundsSpentExternal)}
              </Typography>
            ) : (
              <NotSpecifiedText />
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <CurrentYearIcon color="primary" fontSize="large" sx={{ mr: 1 }} />
              <Typography variant="h6" sx={{ whiteSpace: "nowrap" }}>
                {formatCurrencyWithSpaces(project?.funding?.fundsSpentCurrentYearExternal)}
              </Typography>
            </Box>
            {project?.funding?.fundsSpentCurrentYear ? (
              <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
                {formatCurrencyWithSpaces(project.funding.fundsSpentCurrentYearExternal)}
              </Typography>
            ) : (
              <NotSpecifiedText />
            )}
          </Box>
        </Grid>
      </Grid>
      <Typography
        variant="body2"
        sx={{
          whiteSpace: "nowrap",
          color: Colors.textSecondary,
          width: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          textAlign: "end",
          mt: 4.5,
        }}
      >
        {t("common.updateTime")}
        {": "}
        {formattedUpdateTime(project?.funding?.updateTime, "30.04.2025, 18:55")}
      </Typography>
    </Card>
  );
};

export default FundsSpentBlock;
