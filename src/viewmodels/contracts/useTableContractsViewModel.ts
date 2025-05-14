import { useRef, useEffect, ChangeEvent } from "react";
import { useContractsStore } from "@/stores/contracts/contracts";
import { debounce } from "@/utils/utils";

export const useTableContractsViewModel = () => {
  const { fetchContractsForTable, setFilters, filters } = useContractsStore();

  const debouncedFetch = useRef(debounce(() => fetchContractsForTable(), 500)).current;

  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    setFilters({ page });
  };

  const handleSetFilter = (searchString: string) => {
    setFilters({ searchString, page: 1 });
  };

  useEffect(() => {
    debouncedFetch();
  }, [filters.page, filters.searchString, filters.status, filters.regionName, filters.districtName]);

  return {
    handleChangePage,
    handleSetFilter,
  };
};
