"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { useContractsStore } from "@/stores/contracts/contracts.ts";
import { useTableContractsViewModel } from "@/viewmodels/contracts/useTableContractsViewModel.ts";
import ContractsSearchField from "@/components/statistics/components/search/ContractsSearchField.tsx";
import { useTranslation } from "react-i18next";
import ContractsTable from "@/components/statistics/components/ContractsTable.tsx";

const ContractsTableBlock = () => {
  const { contractsForTable, pageTotal, totalContracts, filters, loadingTableData, setFilters } = useContractsStore();
  const { handleSetFilter } = useTableContractsViewModel();
  const { t } = useTranslation();
  const name = filters.districtName || filters.regionName;
  const translationKey = name?.includes("район") ? `district.${name as string}` : `region.${name as string}`;

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" sx={{ my: 3, textAlign: "left" }}>
        {t("statisticsPage.contractsTab.tableTitle")}
        {name && ": "}
        {name ? t(`kyrgyzstan.${translationKey}`) : ""}
      </Typography>
      <ContractsSearchField handleSetFilter={handleSetFilter} />
      <ContractsTable
        contractsForTable={contractsForTable}
        pageTotal={pageTotal}
        totalContracts={totalContracts}
        loadingTableData={loadingTableData}
        filters={filters}
        setFilters={setFilters}
      />
    </Box>
  );
};

export default ContractsTableBlock;
