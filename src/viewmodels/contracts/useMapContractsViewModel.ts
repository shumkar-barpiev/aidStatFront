import { useEffect, useState } from "react";
import { useContractsStore } from "@/stores/contracts/contracts.ts";

export const useMapContractsViewModel = () => {
  const { fetchContractsForMap, contractsForMap } = useContractsStore();
  const [searchByLocation, setSearchByLocation] = useState<string | null>(null);
  const [isDistrict, setIsDistrict] = useState<string | null>(null);

  const getRegion = (regionName: string) => {
    return contractsForMap?.includes?.find((region) => region.locationName === regionName) ?? null;
  };

  const getDistrict = (regionName: string, districtName: string) => {
    const region = getRegion(regionName);
    if (!region) return null;
    return region?.includes?.find((district) => district.locationName === districtName) ?? null;
  };

  const displayData = (() => {
    if (!isDistrict) {
      return searchByLocation ? getRegion(searchByLocation) : contractsForMap;
    } else {
      const region = getRegion(isDistrict);
      if (!region) return null;
      if (!region.includes?.length) return region;
      return searchByLocation ? getDistrict(isDistrict, searchByLocation) : region;
    }
  })();

  const handleMouseEnter = (locationName: string) => {
    setSearchByLocation(locationName);
  };

  const handleMouseLeave = () => {
    setSearchByLocation(null);
  };

  const handleClick = (locationName: string) => {
    setIsDistrict(locationName);
    setSearchByLocation(null);
  };

  const handleBack = () => {
    setIsDistrict(null);
  };

  useEffect(() => {
    fetchContractsForMap();
  }, []);

  return {
    displayData,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    handleBack,
  };
};
