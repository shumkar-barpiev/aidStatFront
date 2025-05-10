import { ChangeEvent, useEffect, useState } from "react";
import { useContractsStore } from "@/stores/contracts/contracts.ts";
import { TContractModelForMap } from "@/models/contracts/ContractModel.ts";

export const useTableContractsViewModel = () => {
  const { fetchContractsForTable, setFilters, filters } = useContractsStore();

  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    setFilters({ page });
  };

  const handleSetFilter = (searchString: string) => {
    setFilters({ searchString });
  };

  useEffect(() => {
    fetchContractsForTable();
  }, [filters.page, filters.searchString, filters.status]);

  return {
    handleChangePage,
    handleSetFilter,
  };
};
