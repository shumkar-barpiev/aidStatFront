import { useEffect } from "react";
import { useProjectCardsStore } from "@/stores/projects/projects-for-cards.ts";

const useStatisticsChartsViewModel = () => {
  const cardsStore = useProjectCardsStore();

  const handleFilterBySector = (id: number) => {
    cardsStore.fetchTopDonorsByInvestmentBySector(id);
  };

  const handleFilterByRegion = (id: number) => {
    cardsStore.fetchTopDonorsByInvestmentByRegion(id);
  };

  const handleDownload = (id: number, sectorId?: number, regionId?: number) => {
    switch (id) {
      case 1:
        cardsStore.fetchTopDonorsByInvestmentByRegion(regionId as number, true);
        break;
      case 2:
        cardsStore.fetchTopDonorsByInvestmentBySector(sectorId as number, true);
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
        cardsStore.fetchTopDonorsByInvestmentByRegion(1);
        cardsStore.fetchTopDonorsByInvestmentBySector(1);
        cardsStore.fetchTopSectorsByInvestment();
        cardsStore.fetchTopSectorsByProjectCount();
        cardsStore.fetchTopDonorsByInvestment();
        cardsStore.fetchTopDonorsByProjectCount();
        cardsStore.fetchTopImplementingAgenciesByProjectCount();
        cardsStore.fetchTopExecutiveAgenciesByProjectCount();
  }, []);

  return {
    handleFilterBySector,
    handleFilterByRegion,
    handleDownload,
  };
};

export default useStatisticsChartsViewModel;
