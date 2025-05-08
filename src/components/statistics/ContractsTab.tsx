import React from "react";
import { Box } from "@mui/material";
import ContractsMapBlock from "@/components/statistics/blocks/ContractsMapBlock.tsx";
import ContractsTable from "@/components/statistics/maps/ContractsTable.tsx";
import { useContractsViewModel } from "@/viewmodels/contracts/useContractsViewModel.ts";

const ContractsTab = () => {
  const { displayData, handleMouseEnter, handleMouseLeave, handleClick, handleBack } = useContractsViewModel();
  return (
    <Box>
      <ContractsMapBlock
        data={displayData}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        handleClick={handleClick}
        handleBack={handleBack}
      />
      <ContractsTable />
    </Box>
  );
};

export default ContractsTab;
