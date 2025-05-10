import React from "react";
import { Box } from "@mui/material";
import ContractsMapBlock from "@/components/statistics/blocks/ContractsMapBlock";
import ContractsTable from "@/components/statistics/maps/ContractsTable";

const ContractsTab = () => {
  return (
    <Box>
      <ContractsMapBlock />
      <ContractsTable />
    </Box>
  );
};

export default ContractsTab;
