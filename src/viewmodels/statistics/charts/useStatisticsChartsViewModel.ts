import { useEffect, useState } from "react";
import { useProjectCardsStore } from "@/stores/projects/projects-for-cards.ts";
import { useRegionsViewModel } from "@/viewmodels/regions/useRegionsViewModel.ts";
import { useSectorsViewModel } from "@/viewmodels/sectors/useSectorsViewModel.ts";
import { ChartDownloadType } from "@/shared/enums/fetchChartsEnums.ts";

interface firstOptions {
  sector: number,
  region: number,
}

const useStatisticsChartsViewModel = () => {
  const [selectedOption, setSelectedOption] = useState<firstOptions>({
    sector: 0,
    region: 0,
  });
  const cardsStore = useProjectCardsStore();
  const { regions } = useRegionsViewModel();
  const { sectors, sectorsGroup } = useSectorsViewModel();
  const sectorOptions = sectors.concat(sectorsGroup);

  const handleSelectedOption = (optionName: string, id: number) => {
    setSelectedOption({...selectedOption, [optionName]: id});
  };

  const handleFilterBySector = (id: number) => {
    handleSelectedOption('sector', id);
    cardsStore.fetchTopDonorsByInvestmentBySector(id);
  };

  const handleFilterByRegion = (id: number) => {
    handleSelectedOption('region', id);
    cardsStore.fetchTopDonorsByInvestmentByRegion(id);
  };

  const handleDownload = (type: ChartDownloadType, selectedValueId?: number) => {
    switch (type) {
      case ChartDownloadType.Region:
        cardsStore.fetchTopDonorsByInvestmentByRegion(selectedValueId as number, true);
        break;
      case ChartDownloadType.Sector:
        cardsStore.fetchTopDonorsByInvestmentBySector(selectedValueId as number, true);
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
      const firstNonEmptyOption = sectorOptions.find(option => option.projectCount !== 0);

      if (firstNonEmptyOption) {
        handleSelectedOption("sector", firstNonEmptyOption.id);
        cardsStore.fetchTopDonorsByInvestmentBySector(firstNonEmptyOption.id);
      }
    }
  }, [sectorOptions.length]);

  useEffect(() => {
    if (regions && regions.length > 0) {
      const firstNonEmptyOption = regions.find(option => option.projectCount !== 0);

      if (firstNonEmptyOption) {
        handleSelectedOption("region", firstNonEmptyOption.id);
        cardsStore.fetchTopDonorsByInvestmentByRegion(firstNonEmptyOption.id);
      }
    }
  }, [regions.length]);

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
    handleSelectedOption,
    handleFilterBySector,
    handleFilterByRegion,
    handleDownload,
  };
};

export default useStatisticsChartsViewModel;
