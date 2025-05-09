import { useEffect, useState } from "react";
import { useContractsStore } from "@/stores/contracts/contracts.ts";
import { TContractModelForMap } from "@/models/contracts/ContractModel.ts";

export const useContractsViewModel = () => {
  const { fetchContractsForTable, fetchContractsForMap, setFilters, filters, contractsForMap } = useContractsStore();
  const [selectedData, setSelectedData] = useState<TContractModelForMap | null>(contractsForMap);
  const [searchByLocation, setSearchByLocation] = useState<string | null>(null);
  const [hoveredData, setHoveredData] = useState<TContractModelForMap | null>(null);
  const [isDistrict, setIsDistrict] = useState<boolean>(false);

  const displayData = searchByLocation
    ? (contractsForMap?.includes?.find((item) => item.locationName === searchByLocation) ?? null)
    : contractsForMap;

  const handleMouseEnter = (locationName: string) => {
    setSearchByLocation(locationName);
  };

  const handleMouseLeave = () => {
    setSearchByLocation(null);
  };

  const handleClick = (locationName: string) => {
    const match = contractsForMap?.includes?.find((location) => location.locationName === locationName);
    if (match) setSelectedData(match);
  };

  const handleBack = () => {
    setSelectedData(null);
    setHoveredData(null);
  };

  const handleShowDistrict = () => {
    setIsDistrict(!isDistrict);
  };

  // 🔍 Табличные фильтры
  // const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
  //   setFilters({ page });
  // };

  // const handleSetFilter = (filter: any) => {
  //   setFilters(filter);
  // };

  // const handleChangeLocation = (location: string) => {
  //   setSearchByLocation(location);
  // };

  // useEffect(() => {
  //   fetchContractsForTable();
  // }, [filters.page, filters.searchString, filters.status]);

  useEffect(() => {
    fetchContractsForMap();
  }, []);

  return {
    displayData,
    // handleSetFilter,
    // handleChangeLocation,
    // handleChangePage,
    handleShowDistrict,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    handleBack,
  };
};
