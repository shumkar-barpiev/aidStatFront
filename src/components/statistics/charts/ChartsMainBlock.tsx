import React from "react";
import useStatisticsChartsViewModel from "@/viewmodels/statistics/charts/useStatisticsChartsViewModel.ts";
import {
  CorrelationDataByRegion,
  CorrelationDataBySector,
  ProjectChartData,
  useProjectCardsStore,
} from "@/stores/projects/projects-for-cards.ts";
import { Grid } from "@mui/material";
import ChartCard from "@/components/statistics/charts/ChartCard.tsx";
import ChartCardSkeleton from "@/components/statistics/charts/bar-chart-components/ChartCardSkeleton.tsx";

const ChartsMainBlock = () => {
  const { handleFilterBySector, handleFilterByRegion } = useStatisticsChartsViewModel();
  const cardsStore = useProjectCardsStore();
  const {
    topSectorsByProjectCount,
    topSectorsByInvestment,
    topDonorsByInvestment,
    topDonorsByProjectCount,
    topImplementingAgenciesByProjectCount,
    topExecutiveAgenciesByProjectCount,
    topDonorsByInvestmentBySector,
    topDonorsByInvestmentByRegion,
  } = cardsStore;

  const renderChartCard = (
    data: ProjectChartData | CorrelationDataByRegion | CorrelationDataBySector,
    handleFilterChange?: (id: number) => void
  ) => {
    return (
      <Grid item xs={12} sm={12} lg={6}>
        {data ? (
          <ChartCard
            title={data.title}
            total={data.total}
            unit={data.unit}
            data={data.data}
            handleFilterChange={handleFilterChange}
          />
        ) : (
          <ChartCardSkeleton />
        )}
      </Grid>
    );
  };

  return (
    <Grid container spacing={3}>
      <Grid container spacing={3}>
        <React.Fragment>
          {topDonorsByInvestmentByRegion && renderChartCard(topDonorsByInvestmentByRegion, handleFilterByRegion)}
        </React.Fragment>
        <React.Fragment>
          {topDonorsByInvestmentBySector && renderChartCard(topDonorsByInvestmentBySector, handleFilterBySector)}
        </React.Fragment>
        {[
          topDonorsByInvestment,
          topDonorsByProjectCount,
          topSectorsByInvestment,
          topSectorsByProjectCount,
          topImplementingAgenciesByProjectCount,
          topExecutiveAgenciesByProjectCount,
        ].map((data, idx) => (
          <React.Fragment key={idx}>
            {renderChartCard(data as ProjectChartData | CorrelationDataByRegion | CorrelationDataBySector)}
          </React.Fragment>
        ))}
      </Grid>
    </Grid>
  );
};

export default ChartsMainBlock;
