"use client";

import React from "react";
import ContractsMap from "@/components/statistics/maps/ContractsMap";
import { Box } from "@mui/material";
import { NAVBAR_HEIGHT } from "@/utils/constants";
import dynamic from "next/dynamic";
import { useMapContractsViewModel } from "@/viewmodels/contracts/useMapContractsViewModel";

const DonutChart = dynamic(() => import("@/components/statistics/charts/pie-chart-components/DonutChart"), {
  ssr: false,
});
const EmptyDonutChart = dynamic(() => import("@/components/statistics/charts/pie-chart-components/EmptyDonutChart"), {
  ssr: false,
});
const TABS_HEIGHT = 48;
const MOBILE_OFFSET = NAVBAR_HEIGHT + TABS_HEIGHT + 10;

const ContractsMapBlock = () => {
  const { displayData, handleMouseEnter, handleMouseLeave, handleClick, handleBack } = useMapContractsViewModel();
  return (
    <Box
      display="flex"
      gap={2}
      mb={5}
      sx={{
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: "center",
        height: { xs: `calc(100dvh - ${MOBILE_OFFSET}px)`, md: "600px" },
      }}
    >
      <ContractsMap
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        handleClick={handleClick}
        handleBack={handleBack}
      />
      <Box
        display="flex"
        gap={2}
        flexDirection="column"
        sx={{
          flexDirection: { xs: "column", md: "column" },
          minWidth: "420px",
        }}
      >
        {displayData ? (
          <>
            <DonutChart
              key={`budget-${displayData.totalContracts}-${displayData.lowBudget}-${displayData.mediumBudget}-${displayData.highBudget}`}
              title="Суммы контрактов"
              seriesOptions={[displayData.lowBudget, displayData.mediumBudget, displayData.highBudget]}
              labels={["до $100.000", "$100.000 - $500.000", "от $500.000"]}
              totalContracts={displayData.totalContracts}
            />
            <DonutChart
              key={`types-${displayData.totalContracts}-${displayData.goodsContracts}-${displayData.infrastructureContracts}`}
              title="Типы контрактов"
              seriesOptions={[displayData.goodsContracts, displayData.infrastructureContracts]}
              labels={["Товары", "Инфраструктура"]}
              totalContracts={displayData.totalContracts}
            />
          </>
        ) : (
          <>
            <EmptyDonutChart />
            <EmptyDonutChart />
          </>
        )}
      </Box>
    </Box>
  );
};

export default ContractsMapBlock;
