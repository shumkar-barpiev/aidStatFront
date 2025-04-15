"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Divider, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useContractsViewModel } from "@/viewmodels/contracts/useContractsViewModel";
import ContractsMap from "@/components/maps/ContractsMap.tsx";
import dynamic from "next/dynamic";
import CustomTabPanel from "@/components/tabs/CustomTabPanel.tsx";
import ContractsTable from "@/components/maps/ContractsTable.tsx";
import ChartCard from "@/components/statistics/charts/ChartCard.tsx";
import {
  CorrelationDataByRegion,
  CorrelationDataBySector,
  ProjectChartData,
  useProjectCardsStore,
} from "@/stores/projects/projects-for-cards.ts";
import ChartCardSkeleton from "@/components/statistics/charts/bar-chart-components/ChartCardSkeleton.tsx";

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
  const { budgetForChart, byTypesForChart } = useContractsViewModel();
  const cardsStore = useProjectCardsStore();
  const {
    topSectorsByProjectCount,
    topSectorsByInvestment,
    topDonorsByInvestment,
    topDonorsByProjectCount,
    topImplementingAgenciesByProjectCount,
    topExecutiveAgenciesByProjectCount,
    topDonorsByInvestmentBySector,
    topDonorsByInvestmentByRegion,
  } = cardsStore;

  useEffect(() => {
    cardsStore.fetchTopSectorsByInvestment();
    cardsStore.fetchTopSectorsByProjectCount();
    cardsStore.fetchTopDonorsByInvestment();
    cardsStore.fetchTopDonorsByProjectCount();
    cardsStore.fetchTopImplementingAgenciesByProjectCount();
    cardsStore.fetchTopExecutiveAgenciesByProjectCount();
  }, []);

  const renderChartCard = (data: ProjectChartData | CorrelationDataByRegion | CorrelationDataBySector) => (
    <Grid item xs={12} sm={12} lg={6}>
      {data ? (
        <ChartCard title={data.title} total={data.total} unit={data.unit} data={data.data} />
      ) : (
        <ChartCardSkeleton />
      )}
    </Grid>
  );

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
          <Grid container spacing={3}>
            {[
              topDonorsByInvestment,
              topDonorsByProjectCount,
              topDonorsByInvestmentBySector,
              topDonorsByInvestmentByRegion,
              topSectorsByInvestment,
              topSectorsByProjectCount,
              topImplementingAgenciesByProjectCount,
              topExecutiveAgenciesByProjectCount,
            ].map((data, idx) => (
              <React.Fragment key={idx}>
                {renderChartCard(data as ProjectChartData | CorrelationDataByRegion | CorrelationDataBySector)}
              </React.Fragment>
            ))}
          </Grid>
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
          <Box
            display="flex"
            gap={2}
            flexDirection="column"
            sx={{ flexDirection: { xs: "column", md: "row", lg: "column" } }}
          >
            {budgetForChart && (
              <DonutChart
                title="Суммы контрактов"
                seriesOptions={[budgetForChart.lowBudget, budgetForChart.mediumBudget, budgetForChart.highBudget]}
                labels={["до $100.000", "$100.000 - $500.000", "от $500.000"]}
              />
            )}
            {byTypesForChart && (
              <DonutChart
                title="Типы контрактов"
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
