"use client";

import React from "react";
import ContractsMap from "@/components/statistics/maps/ContractsMap.tsx";
import { Box } from "@mui/material";
import { NAVBAR_HEIGHT } from "@/utils/constants.ts";
import dynamic from "next/dynamic";
import { TContractModelForMap } from "@/models/contracts/ContractModel.ts";
import EmptyDonutChart from "@/components/statistics/charts/donut-chart-components/EmptyDonutChart.tsx";

const DonutChart = dynamic(() => import("@/components/statistics/charts/DonutChart.tsx"), { ssr: false });
const TABS_HEIGHT = 48;
const MOBILE_OFFSET = NAVBAR_HEIGHT + TABS_HEIGHT + 10;

interface Props {
  data: TContractModelForMap | null;
  handleMouseEnter: (locationName: string) => void;
  handleMouseLeave: () => void;
  handleClick: (locationName: string) => void;
  handleBack: () => void;
}

const ContractsMapBlock: React.FC<Props> = ({ data, handleMouseEnter, handleMouseLeave, handleBack, handleClick }) => {
  return (
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
      <ContractsMap
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        handleClick={handleClick}
        handleBack={handleBack}
      />
      <Box display="flex" gap={2} flexDirection="column" sx={{ flexDirection: { xs: "column", md: "column" } }}>
        {data ? (
          <DonutChart
            title="Суммы контрактов"
            seriesOptions={[data.lowBudget, data.mediumBudget, data.highBudget]}
            labels={["до $100.000", "$100.000 - $500.000", "от $500.000"]}
            totalContracts={data.totalContracts}
          />
        ) : (
          <EmptyDonutChart />
        )}
        {data ? (
          <DonutChart
            title="Типы контрактов"
            seriesOptions={[data.goodsContracts, data.infrastructureContracts]}
            labels={["Товары", "Инфраструктура"]}
            totalContracts={data.totalContracts}
          />
        ) : (
          <EmptyDonutChart />
        )}
      </Box>
    </Box>
  );
};

export default ContractsMapBlock;
