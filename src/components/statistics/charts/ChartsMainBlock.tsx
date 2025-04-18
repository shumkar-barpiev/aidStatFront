import React from "react";
import useStatisticsChartsViewModel from "@/viewmodels/statistics/charts/useStatisticsChartsViewModel.ts";
import { useProjectCardsStore } from "@/stores/projects/projects-for-cards.ts";
import { Grid } from "@mui/material";
import ChartCard from "@/components/statistics/charts/ChartCard.tsx";
import { useRegionsViewModel } from "@/viewmodels/regions/useRegionsViewModel.ts";
import { useSectorsViewModel } from "@/viewmodels/sectors/useSectorsViewModel.ts";

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
  const { regions } = useRegionsViewModel();
  const { sectors, sectorsGroup } = useSectorsViewModel();
  const sectorOptions = sectors.concat(sectorsGroup);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} lg={6}>
        <ChartCard
          title="Корреляция доноров по регионам"
          total={topDonorsByInvestmentByRegion?.total}
          unit={topDonorsByInvestmentByRegion?.unit}
          data={topDonorsByInvestmentByRegion?.data}
          handleFilterChange={handleFilterByRegion}
          selectOptions={regions}
        />
      </Grid>

      <Grid item xs={12} sm={12} lg={6}>
        <ChartCard
          title="Корреляция доноров по секторам"
          total={topDonorsByInvestmentBySector?.total}
          unit={topDonorsByInvestmentBySector?.unit}
          data={topDonorsByInvestmentBySector?.data}
          handleFilterChange={handleFilterBySector}
          selectOptions={sectorOptions}
        />
      </Grid>

      <Grid item xs={12} sm={12} lg={6}>
        <ChartCard
          title="Топ доноров по инвестициям"
          total={topDonorsByInvestment?.total}
          unit={topDonorsByInvestment?.unit}
          data={topDonorsByInvestment?.data}
        />
      </Grid>

      <Grid item xs={12} sm={12} lg={6}>
        <ChartCard
          title="Топ доноров по количеству проектов"
          total={topDonorsByProjectCount?.total}
          unit={topDonorsByProjectCount?.unit}
          data={topDonorsByProjectCount?.data}
        />
      </Grid>

      <Grid item xs={12} sm={12} lg={6}>
        <ChartCard
          title="Топ секторов по инвестициям"
          total={topSectorsByInvestment?.total}
          unit={topSectorsByInvestment?.unit}
          data={topSectorsByInvestment?.data}
        />
      </Grid>

      <Grid item xs={12} sm={12} lg={6}>
        <ChartCard
          title="Топ секторов по количеству проектов"
          total={topSectorsByProjectCount?.total}
          unit={topSectorsByProjectCount?.unit}
          data={topSectorsByProjectCount?.data}
        />
      </Grid>

      <Grid item xs={12} sm={12} lg={6}>
        <ChartCard
          title="Топ исполняющих агентств"
          total={topImplementingAgenciesByProjectCount?.total}
          unit={topImplementingAgenciesByProjectCount?.unit}
          data={topImplementingAgenciesByProjectCount?.data}
        />
      </Grid>

      <Grid item xs={12} sm={12} lg={6}>
        <ChartCard
          title="Топ исполнительных агентств"
          total={topExecutiveAgenciesByProjectCount?.total}
          unit={topExecutiveAgenciesByProjectCount?.unit}
          data={topExecutiveAgenciesByProjectCount?.data}
        />
      </Grid>
    </Grid>
  );
};

export default ChartsMainBlock;
