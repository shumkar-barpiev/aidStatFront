"use client";

import React from "react";
import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import {
  CalendarMonth as PeriodIcon,
  DateRange as CurrentYearIcon,
  TrendingUp as DomesticFundingIcon,
} from "@mui/icons-material";
import { formatCurrencyWithSpaces } from "@/utils/formatCurrency.ts";
import Colors from "@/styles/colors.ts";
import { NotSpecifiedText } from "@/components/projects/show/ShowProject.tsx";
import { TProjectModel } from "@/models/project/ProjectModel.ts";
import { useTranslation } from "react-i18next";

interface Props {
  project: TProjectModel | null;
}

const FundsSpentBlock: React.FC<Props> = ({ project }) => {
  const { t } = useTranslation();
  const date = new Date(project?.funding?.updateTime as string);
  const formattedUpdateTime = date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <DomesticFundingIcon color="primary" fontSize="large" sx={{ mr: 1 }} />
        <Typography variant="h6" sx={{ whiteSpace: "nowrap", width: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
          Освоение внутреннего финансирования
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
                За весь период
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
                За текущий год
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
          Освоение внешнего финансирования
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
                За весь период
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
                За текущий год
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
        Дата последнего автоматического обновления:{" "}
        {project?.funding?.updateTime ? formattedUpdateTime : "30.04.2025, 18:55"}
      </Typography>
    </Card>
  );
};

export default FundsSpentBlock;
