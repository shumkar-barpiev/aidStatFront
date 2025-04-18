import React from "react";
import { Box } from "@mui/material";
import ContractsMap from "@/components/statistics/maps/ContractsMap.tsx";
import ContractsTable from "@/components/statistics/maps/ContractsTable.tsx";
import { useContractsViewModel } from "@/viewmodels/contracts/useContractsViewModel.ts";
import dynamic from "next/dynamic";

const DonutChart = dynamic(() => import("@/components/statistics/charts/DonutChart.tsx"), { ssr: false });

const ContractsTab = () => {
  const { budgetForChart, byTypesForChart } = useContractsViewModel();
  return (
    <Box>
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
    </Box>
  );
};

export default ContractsTab;