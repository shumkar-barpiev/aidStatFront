import { useEffect, useState } from "react";
import { useProjectChartsStore } from "@/stores/projects/projects-for-charts";
import { useRegionsViewModel } from "@/viewmodels/regions/useRegionsViewModel";
import { useSectorsViewModel } from "@/viewmodels/sectors/useSectorsViewModel";
import { ChartDownloadType } from "@/shared/enums/fetchChartsEnums";

interface FirstOptions {
  sector: number;
  region: number;
}

const useStatisticsChartsViewModel = () => {
  const [selectedOption, setSelectedOption] = useState<FirstOptions>({
    sector: 0,
    region: 0,
  });
  const [optionsForDuoCorrelation, setOptionsForDuoCorrelation] = useState<FirstOptions>({
    sector: 0,
    region: 0,
  });
  const cardsStore = useProjectChartsStore();
  const { regions } = useRegionsViewModel();
  const { sectors, sectorsGroup } = useSectorsViewModel();
  const sectorOptions = sectors.concat(sectorsGroup);

  const handleSelectedOption = (optionName: string, id: number) => {
    setSelectedOption({ ...selectedOption, [optionName]: id });
  };

  const handleSelectedOptionForDuoCorrelation = (optionName: string, id: number) => {
    setOptionsForDuoCorrelation({ ...optionsForDuoCorrelation, [optionName]: id });
  };

  const handleFilterBySector = (id: number, isDuo?: boolean) => {
    if (isDuo) {
      handleSelectedOptionForDuoCorrelation("sector", id);
      cardsStore.fetchTopDonorsByInvestmentByRegionAndSector(optionsForDuoCorrelation.region, id);
    } else {
      handleSelectedOption("sector", id);
      cardsStore.fetchTopDonorsByInvestmentBySector(id);
    }
  };

  const handleFilterByRegion = (id: number, isDuo?: boolean) => {
    if (isDuo) {
      handleSelectedOptionForDuoCorrelation("region", id);
      cardsStore.fetchTopDonorsByInvestmentByRegionAndSector(id, optionsForDuoCorrelation.sector);
    } else {
      handleSelectedOption("region", id);
      cardsStore.fetchTopDonorsByInvestmentByRegion(id);
    }
  };

  const handleDownload = (type: ChartDownloadType, regionId?: number, sectorId?: number) => {
    switch (type) {
      case ChartDownloadType.Region:
        cardsStore.fetchTopDonorsByInvestmentByRegion(regionId as number, true);
        break;
      case ChartDownloadType.Sector:
        cardsStore.fetchTopDonorsByInvestmentBySector(sectorId as number, true);
        break;
      case ChartDownloadType.RegionAndSector:
        cardsStore.fetchTopDonorsByInvestmentByRegionAndSector(regionId as number, sectorId as number, true);
        break;
      case ChartDownloadType.DonorsByInvestment:
        cardsStore.fetchTopDonorsByInvestment(true);
        break;
      case ChartDownloadType.DonorsByProjectCount:
        cardsStore.fetchTopDonorsByProjectCount(true);
        break;
      case ChartDownloadType.SectorsByInvestment:
        cardsStore.fetchTopSectorsByInvestment(true);
        break;
      case ChartDownloadType.SectorsByProjectCount:
        cardsStore.fetchTopSectorsByProjectCount(true);
        break;
      case ChartDownloadType.ImplementingAgencies:
        cardsStore.fetchTopImplementingAgenciesByProjectCount(true);
        break;
      case ChartDownloadType.ExecutiveAgencies:
        cardsStore.fetchTopExecutiveAgenciesByProjectCount(true);
        break;
      default:
        console.warn("Неизвестный тип для загрузки:", type);
    }
  };

  useEffect(() => {
    if (sectorOptions && sectorOptions.length > 0) {
      const firstNonEmptyOption = sectorOptions.find((option) => option.projectCount > 0);

      if (firstNonEmptyOption) {
        handleSelectedOption("sector", firstNonEmptyOption.id);
        cardsStore.fetchTopDonorsByInvestmentBySector(firstNonEmptyOption.id);
      }
    }
  }, [sectorOptions.length]);

  useEffect(() => {
    if (regions && regions.length > 0) {
      const firstNonEmptyOption = regions.find((option) => option.projectCount > 0);

      if (firstNonEmptyOption) {
        handleSelectedOption("region", firstNonEmptyOption.id);
        cardsStore.fetchTopDonorsByInvestmentByRegion(firstNonEmptyOption.id);
      }
    }
  }, [regions.length]);

  useEffect(() => {
    if (regions && regions.length > 0 && sectorOptions && sectorOptions.length > 0) {
      const firstNonEmptyRegionOption = regions.find((option) => option.projectCount > 0);
      const firstNonEmptySectorOption = sectorOptions.find((option) => option.projectCount > 0);

      if (firstNonEmptyRegionOption && firstNonEmptySectorOption) {
        const newOptions = {
          sector: firstNonEmptySectorOption.id,
          region: firstNonEmptyRegionOption.id,
        };
        setOptionsForDuoCorrelation(newOptions);

        cardsStore.fetchTopDonorsByInvestmentByRegionAndSector(newOptions.region, newOptions.sector);
      }
    }
  }, [regions.length, sectorOptions.length]);

  useEffect(() => {
    cardsStore.fetchTopSectorsByInvestment();
    cardsStore.fetchTopSectorsByProjectCount();
    cardsStore.fetchTopDonorsByInvestment();
    cardsStore.fetchTopDonorsByProjectCount();
    cardsStore.fetchTopImplementingAgenciesByProjectCount();
    cardsStore.fetchTopExecutiveAgenciesByProjectCount();
  }, []);

  return {
    selectedOption,
    optionsForDuoCorrelation,
    handleFilterBySector,
    handleFilterByRegion,
    handleDownload,
  };
};

export default useStatisticsChartsViewModel;
