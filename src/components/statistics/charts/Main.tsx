"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, Divider, Grid, Tab, Tabs } from "@mui/material";
import CardComponent from "@/components/statistics/charts/ChartCard";
import { useStatisticsChartsViewModel } from "@/viewmodels/statistics/charts/useStatisticChartsViewModel";
import { useContractsViewModel } from "@/viewmodels/contracts/useContractsViewModel";
import ContractsMap from "@/components/maps/ContractsMap.tsx";
import dynamic from "next/dynamic";
import CustomTabPanel from "@/components/tabs/CustomTabPanel.tsx";
import ContractsTable from "@/components/maps/ContractsTable.tsx";

const ProjectsMap = dynamic(() => import("@/components/maps/ProjectsMap"), {
  ssr: false,
});

const DonutChart = dynamic(() => import("@/components/statistics/charts/DonutChart"), { ssr: false });

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

export default function Main() {
  const [tab, setTab] = useState<number>(0);
  const { t } = useTranslation();
  const { cardsData } = useStatisticsChartsViewModel();
  const { budgetForChart, byTypesForChart } = useContractsViewModel();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: 1 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Карта проектов" {...a11yProps(0)} />
          <Tab label="Карта контрактов" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tab} index={0}>
        <Typography variant="h4" fontWeight="bold" sx={{ my: 3, textAlign: "left" }}>
          Мониторинг проектов для создания и развития инфраструктуры КР
        </Typography>
        <Divider sx={{ mb: 2, borderColor: "darkblue", borderBottomWidth: 2 }} />
        <ProjectsMap />
        <Typography variant="h4" fontWeight="bold" sx={{ my: 3, textAlign: "left" }}>
          {t("statisticsTitle")}
        </Typography>
        <Divider sx={{ mb: 6, borderColor: "darkblue", borderBottomWidth: 2 }} />
        <Grid container spacing={3}>
          {cardsData.map((card) => (
            <Grid item xs={12} sm={12} lg={6} key={card.id}>
              <CardComponent card={card} />
            </Grid>
          ))}
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={1}>
        <Box
          display="flex"
          gap={2}
          mb={5}
          sx={{ flexDirection: { xs: "column", lg: "row" }, justifyContent: "center", alignItems: "center" }}
        >
          <ContractsMap />
          <Box display="flex" gap={2} flexDirection="column" sx={{ flexDirection: { xs: "row", lg: "column" } }}>
            {budgetForChart && (
              <DonutChart
                seriesOptions={[budgetForChart.lowBudget, budgetForChart.mediumBudget, budgetForChart.highBudget]}
                labels={["до $100.000", "$100.000 - $500.000", "от $500.000"]}
              />
            )}
            {byTypesForChart && (
              <DonutChart
                seriesOptions={[byTypesForChart.goods, byTypesForChart?.infrastructure]}
                labels={["Товары", "Инфраструктура"]}
              />
            )}
          </Box>
        </Box>
        <ContractsTable />
      </CustomTabPanel>
    </Box>
  );
}
