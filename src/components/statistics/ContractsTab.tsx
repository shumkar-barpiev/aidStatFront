import React from "react";
import { Box } from "@mui/material";
import ContractsMap from "@/components/statistics/maps/ContractsMap";
import ContractsTable from "@/components/statistics/maps/ContractsTable";
import { useContractsViewModel } from "@/viewmodels/contracts/useContractsViewModel";
import dynamic from "next/dynamic";
import { NAVBAR_HEIGHT } from "@/utils/constants";

const DonutChart = dynamic(() => import("@/components/statistics/charts/DonutChart.tsx"), { ssr: false });

const TABS_HEIGHT = 48;
const MOBILE_OFFSET = NAVBAR_HEIGHT + TABS_HEIGHT + 10;

const ContractsTab = () => {
  const { budgetForChart, byTypesForChart } = useContractsViewModel();
  return (
    <Box>
      <Box
        display="flex"
        gap={2}
        mb={5}
        sx={{
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          height: `calc(100dvh - ${MOBILE_OFFSET}px`,
        }}
      >
        <ContractsMap />
        <Box display="flex" gap={2} flexDirection="column" sx={{ flexDirection: { xs: "column", md: "column" } }}>
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
    </Box>
  );
};

export default ContractsTab;
