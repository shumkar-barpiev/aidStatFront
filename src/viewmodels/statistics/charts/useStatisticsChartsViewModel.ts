import { useEffect, useState } from "react";
import { useProjectCardsStore } from "@/stores/projects/projects-for-cards.ts";
import { useRegionsViewModel } from "@/viewmodels/regions/useRegionsViewModel.ts";
import { useSectorsViewModel } from "@/viewmodels/sectors/useSectorsViewModel.ts";

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

  const handleDownload = (id: number, selectedValueId?: number) => {
    switch (id) {
      case 1:
        cardsStore.fetchTopDonorsByInvestmentByRegion(selectedValueId as number, true);
        break;
      case 2:
        cardsStore.fetchTopDonorsByInvestmentBySector(selectedValueId as number, true);
        break;
      case 3:
        cardsStore.fetchTopDonorsByInvestment(true);
        break;
      case 4:
        cardsStore.fetchTopDonorsByProjectCount(true);
        break;
      case 5:
        cardsStore.fetchTopSectorsByInvestment(true);
        break;
      case 6:
        cardsStore.fetchTopSectorsByProjectCount(true);
        break;
      case 7:
        cardsStore.fetchTopImplementingAgenciesByProjectCount(true);
        break;
      case 8:
        cardsStore.fetchTopExecutiveAgenciesByProjectCount(true);
        break;
      default:
        console.warn("Неизвестный id для загрузки:", id);
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
