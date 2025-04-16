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

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        cardsStore.fetchTopDonorsByInvestmentByRegion(1),
        cardsStore.fetchTopDonorsByInvestmentBySector(1),
        cardsStore.fetchTopSectorsByInvestment(),
        cardsStore.fetchTopSectorsByProjectCount(),
        cardsStore.fetchTopDonorsByInvestment(),
        cardsStore.fetchTopDonorsByProjectCount(),
        cardsStore.fetchTopImplementingAgenciesByProjectCount(),
        cardsStore.fetchTopExecutiveAgenciesByProjectCount(),
      ]);
    };
    fetchData();
  }, []);

  return {
    handleFilterBySector,
    handleFilterByRegion,
  };
};

export default useStatisticsChartsViewModel;
