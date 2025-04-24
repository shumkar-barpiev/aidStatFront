import React, { useEffect, useRef, useState } from "react";
import useStatisticsChartsViewModel from "@/viewmodels/statistics/charts/useStatisticsChartsViewModel";
import { useProjectCardsStore } from "@/stores/projects/projects-for-cards";
import { Grid } from "@mui/material";
import { useRegionsViewModel } from "@/viewmodels/regions/useRegionsViewModel";
import { useSectorsViewModel } from "@/viewmodels/sectors/useSectorsViewModel";
import { ChartDownloadType } from "@/shared/enums/fetchChartsEnums.ts";
import ElectricityProductionChart from "@/components/statistics/charts/ElectricityProductionChart.tsx";

const LazyChart = React.lazy(() => import("./ChartCard"));

const ChartsMainBlock = () => {
  const { regions } = useRegionsViewModel();
  const { sectors, sectorsGroup } = useSectorsViewModel();
  const sectorOptions = sectors.concat(sectorsGroup);
  const { handleFilterBySector, handleFilterByRegion, handleDownload, selectedOption } = useStatisticsChartsViewModel();
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
    loadingState,
  } = cardsStore;

  return (
    <Grid>
      <ElectricityProductionChart />
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {selectedOption.region !== 0 && (
          <Grid item xs={12} sm={12} lg={6}>
            <LazyChart
              title="Корреляция доноров по регионам"
              total={topDonorsByInvestmentByRegion?.total}
              unit={topDonorsByInvestmentByRegion?.unit}
              data={topDonorsByInvestmentByRegion?.data}
              handleFilterChange={handleFilterByRegion}
              value={selectedOption.region.toString()}
              selectOptions={regions}
              loading={loadingState.topDonorsByInvestmentByRegion}
              handleDownload={() => handleDownload(ChartDownloadType.Region, selectedOption.region)}
            />
          </Grid>
        )}

        {selectedOption.sector !== 0 && (
          <Grid item xs={12} sm={12} lg={6}>
            <LazyChart
              title="Корреляция доноров по секторам"
              total={topDonorsByInvestmentBySector?.total}
              unit={topDonorsByInvestmentBySector?.unit}
              data={topDonorsByInvestmentBySector?.data}
              handleFilterChange={handleFilterBySector}
              value={selectedOption.sector.toString()}
              selectOptions={sectorOptions}
              loading={loadingState.topDonorsByInvestmentBySector}
              handleDownload={() => handleDownload(ChartDownloadType.Sector, selectedOption.sector)}
            />
          </Grid>
        )}

        <Grid item xs={12} sm={12} lg={6}>
          <LazyChart
            title="Топ доноров по инвестициям"
            total={topDonorsByInvestment?.total}
            unit={topDonorsByInvestment?.unit}
            data={topDonorsByInvestment?.data}
            loading={loadingState.topDonorsByInvestment}
            handleDownload={() => handleDownload(ChartDownloadType.DonorsByInvestment)}
          />
        </Grid>

        <Grid item xs={12} sm={12} lg={6}>
          <LazyChart
            title="Топ доноров по количеству проектов"
            total={topDonorsByProjectCount?.total}
            unit={topDonorsByProjectCount?.unit}
            data={topDonorsByProjectCount?.data}
            loading={loadingState.topDonorsByProjectCount}
            handleDownload={() => handleDownload(ChartDownloadType.DonorsByProjectCount)}
          />
        </Grid>

        <Grid item xs={12} sm={12} lg={6}>
          <LazyChart
            title="Топ секторов по инвестициям"
            total={topSectorsByInvestment?.total}
            unit={topSectorsByInvestment?.unit}
            data={topSectorsByInvestment?.data}
            loading={loadingState.topSectorsByInvestment}
            handleDownload={() => handleDownload(ChartDownloadType.SectorsByInvestment)}
          />
        </Grid>

        <Grid item xs={12} sm={12} lg={6}>
          <LazyChart
            title="Топ секторов по количеству проектов"
            total={topSectorsByProjectCount?.total}
            unit={topSectorsByProjectCount?.unit}
            data={topSectorsByProjectCount?.data}
            loading={loadingState.topSectorsByProjectCount}
            handleDownload={() => handleDownload(ChartDownloadType.SectorsByProjectCount)}
          />
        </Grid>

        <Grid item xs={12} sm={12} lg={6}>
          <LazyChart
            title="Топ исполняющих агентств по количеству проектов"
            total={topImplementingAgenciesByProjectCount?.total}
            unit={topImplementingAgenciesByProjectCount?.unit}
            data={topImplementingAgenciesByProjectCount?.data}
            loading={loadingState.topImplementingAgenciesByProjectCount}
            handleDownload={() => handleDownload(ChartDownloadType.ImplementingAgencies)}
          />
        </Grid>

        <Grid item xs={12} sm={12} lg={6}>
          <LazyChart
            title="Топ реализующих агентств по количеству проектов"
            total={topExecutiveAgenciesByProjectCount?.total}
            unit={topExecutiveAgenciesByProjectCount?.unit}
            data={topExecutiveAgenciesByProjectCount?.data}
            loading={loadingState.topExecutiveAgenciesByProjectCount}
            handleDownload={() => handleDownload(ChartDownloadType.ExecutiveAgencies)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChartsMainBlock;
