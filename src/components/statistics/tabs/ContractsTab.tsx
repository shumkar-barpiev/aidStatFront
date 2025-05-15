import React from "react";
import { Box } from "@mui/material";
import ContractsMapBlock from "@/components/statistics/blocks/ContractsMapBlock";
import ContractsTableBlock from "@/components/statistics/maps/ContractsTableBlock.tsx";

const ContractsTab = () => {
  return (
    <Box>
      <ContractsMapBlock />
      <ContractsTableBlock />
    </Box>
  );
};

export default ContractsTab;
