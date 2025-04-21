import React, { useEffect, useRef } from "react";
import useStatisticsChartsViewModel from "@/viewmodels/statistics/charts/useStatisticsChartsViewModel.ts";
import { useProjectCardsStore } from "@/stores/projects/projects-for-cards.ts";
import { Grid } from "@mui/material";
import { useRegionsViewModel } from "@/viewmodels/regions/useRegionsViewModel.ts";
import { useSectorsViewModel } from "@/viewmodels/sectors/useSectorsViewModel.ts";

const LazyChart = React.lazy(() => import("./ChartCard"));

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
    loadingState
  } = cardsStore;
  const { regions } = useRegionsViewModel();
  const { sectors, sectorsGroup } = useSectorsViewModel();
  const sectorOptions = sectors.concat(sectorsGroup);

  const renderCount = useRef<number>(0);

  useEffect(() => {
    renderCount.current++;
    console.log("Выполнено рендеров: ", renderCount.current);
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} lg={6}>
        <LazyChart
          title="Корреляция доноров по регионам"
          total={topDonorsByInvestmentByRegion?.total}
          unit={topDonorsByInvestmentByRegion?.unit}
          data={topDonorsByInvestmentByRegion?.data}
          handleFilterChange={handleFilterByRegion}
          selectOptions={regions}
          loading={loadingState.topDonorsByInvestmentByRegion}
        />
      </Grid>

      <Grid item xs={12} sm={12} lg={6}>
        <LazyChart
          title="Корреляция доноров по секторам"
          total={topDonorsByInvestmentBySector?.total}
          unit={topDonorsByInvestmentBySector?.unit}
          data={topDonorsByInvestmentBySector?.data}
          handleFilterChange={handleFilterBySector}
          selectOptions={sectorOptions}
          loading={loadingState.topDonorsByInvestmentBySector}
        />
      </Grid>

      <Grid item xs={12} sm={12} lg={6}>
        <LazyChart
          title="Топ доноров по инвестициям"
          total={topDonorsByInvestment?.total}
          unit={topDonorsByInvestment?.unit}
          data={topDonorsByInvestment?.data}
          loading={loadingState.topDonorsByInvestment}
        />
      </Grid>

      <Grid item xs={12} sm={12} lg={6}>
        <LazyChart
          title="Топ доноров по количеству проектов"
          total={topDonorsByProjectCount?.total}
          unit={topDonorsByProjectCount?.unit}
          data={topDonorsByProjectCount?.data}
          loading={loadingState.topDonorsByProjectCount}
        />
      </Grid>

      <Grid item xs={12} sm={12} lg={6}>
        <LazyChart
          title="Топ секторов по инвестициям"
          total={topSectorsByInvestment?.total}
          unit={topSectorsByInvestment?.unit}
          data={topSectorsByInvestment?.data}
          loading={loadingState.topSectorsByInvestment}
        />
      </Grid>

      <Grid item xs={12} sm={12} lg={6}>
        <LazyChart
          title="Топ секторов по количеству проектов"
          total={topSectorsByProjectCount?.total}
          unit={topSectorsByProjectCount?.unit}
          data={topSectorsByProjectCount?.data}
          loading={loadingState.topSectorsByProjectCount}
        />
      </Grid>

      <Grid item xs={12} sm={12} lg={6}>
        <LazyChart
          title="Топ исполняющих агентств по количеству проектов"
          total={topImplementingAgenciesByProjectCount?.total}
          unit={topImplementingAgenciesByProjectCount?.unit}
          data={topImplementingAgenciesByProjectCount?.data}
          loading={loadingState.topImplementingAgenciesByProjectCount}
        />
      </Grid>

      <Grid item xs={12} sm={12} lg={6}>
        <LazyChart
          title="Топ реализующих агентств по количеству проектов"
          total={topExecutiveAgenciesByProjectCount?.total}
          unit={topExecutiveAgenciesByProjectCount?.unit}
          data={topExecutiveAgenciesByProjectCount?.data}
          loading={loadingState.topExecutiveAgenciesByProjectCount}
        />
      </Grid>
    </Grid>
  );
};

export default ChartsMainBlock;
