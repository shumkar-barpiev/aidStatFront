import React, { useMemo } from "react";
import useStatisticsChartsViewModel from "@/viewmodels/statistics/charts/useStatisticsChartsViewModel";
import { ChartDataCount, ChartDataSum, useProjectChartsStore } from "@/stores/projects/projects-for-charts";
import { Grid, Typography } from "@mui/material";
import { useRegionsViewModel } from "@/viewmodels/regions/useRegionsViewModel";
import { useSectorsViewModel } from "@/viewmodels/sectors/useSectorsViewModel";
import { ChartDownloadType } from "@/shared/enums/fetchChartsEnums";
import AreaChart from "@/components/statistics/charts/AreaChart";
import { useProjectsMapStore } from "@/stores/projects/projects-for-map";
import { EnergeticsMok, TransportsMok } from "@/shared/enums/statisticsMapIconsEnums";
import PolarChart from "@/components/statistics/charts/PolarChart";
import ChartCardLayout from "@/components/statistics/charts/ChartCardLayout";
import HorizontalStackedBarChart from "@/components/statistics/charts/HorizontalStackedBarChart";
import ChartCard from "@/components/statistics/charts/ChartCard.tsx";

const ChartsMainBlock = () => {
  const { regions } = useRegionsViewModel();
  const { sectors, sectorsGroup } = useSectorsViewModel();
  const sectorOptions = sectors.concat(sectorsGroup);
  const { handleFilterBySector, handleFilterByRegion, handleDownload, selectedOption } = useStatisticsChartsViewModel();
  const { projects } = useProjectsMapStore();
  const cardsStore = useProjectChartsStore();
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

  const energeticsProjects = useMemo(() => {
    return (
      projects?.data
        .filter((project) => project.sectors?.some((sector) => sector.name === "Энергетика"))
        .map((project) => ({
          id: project.id,
          name: project.name,
          startDate: project.startDate,
        })) || []
    );
  }, [projects]);

  const transportsProjects = useMemo(() => {
    return (
      projects?.data
        .filter((project) => project.sectors?.some((sector) => sector.name === "Транспорт"))
        .map((project) => ({
          id: project.id,
          name: project.name,
          startDate: project.startDate,
        })) || []
    );
  }, [projects]);

  return (
    <Grid>
      <AreaChart
        title="Производство электроэнергии по источникам (2001–настоящее время)"
        projects={energeticsProjects}
        series={EnergeticsMok}
        yTitle="млн кВт⋅ч"
      />
      <AreaChart
        title="Доходы от перевозок грузов всеми видами транспорта (2001–настоящее время)"
        projects={transportsProjects}
        series={TransportsMok}
        yTitle="млн сом"
      />

      <Grid container spacing={3}>
        {selectedOption.region !== 0 && topDonorsByInvestmentByRegion && topDonorsByInvestmentByRegion.data && (
          <Grid item xs={12} sm={12} lg={6}>
            <ChartCard
              title="Корреляция доноров по регионам"
              total={topDonorsByInvestmentByRegion.total}
              unit={topDonorsByInvestmentByRegion.unit}
              data={topDonorsByInvestmentByRegion.data as ChartDataSum[]}
              handleFilterChange={handleFilterByRegion}
              value={selectedOption.region.toString()}
              selectOptions={regions}
              loading={loadingState.topDonorsByInvestmentByRegion}
              handleDownload={() => handleDownload(ChartDownloadType.Region, selectedOption.region)}
            />
          </Grid>
        )}

        {selectedOption.sector !== 0 && topDonorsByInvestmentBySector && topDonorsByInvestmentBySector.data && (
          <Grid item xs={12} sm={12} lg={6}>
            <ChartCard
              title="Корреляция доноров по секторам"
              total={topDonorsByInvestmentBySector.total}
              unit={topDonorsByInvestmentBySector.unit}
              data={topDonorsByInvestmentBySector.data as ChartDataSum[]}
              handleFilterChange={handleFilterBySector}
              value={selectedOption.sector.toString()}
              selectOptions={sectorOptions}
              loading={loadingState.topDonorsByInvestmentBySector}
              handleDownload={() => handleDownload(ChartDownloadType.Sector, selectedOption.sector)}
            />
          </Grid>
        )}

        <ChartCardLayout
          title="Топ доноров по инвестициям"
          total={topDonorsByInvestment?.total}
          unit={topDonorsByInvestment?.unit}
          loading={loadingState.topDonorsByProjectCount}
          handleDownload={() => handleDownload(ChartDownloadType.DonorsByInvestment)}
        >
          {topDonorsByInvestment && topDonorsByInvestment.data.length > 0 ? (
            <HorizontalStackedBarChart data={topDonorsByInvestment.data as ChartDataSum[]} />
          ) : (
            <Typography color="text.secondary">Нет данных для отображения</Typography>
          )}
        </ChartCardLayout>

        <ChartCardLayout
          title="Топ доноров по количеству проектов"
          total={topDonorsByProjectCount?.total}
          unit={topDonorsByProjectCount?.unit}
          loading={loadingState.topDonorsByProjectCount}
          handleDownload={() => handleDownload(ChartDownloadType.DonorsByProjectCount)}
        >
          {topDonorsByProjectCount && topDonorsByProjectCount.data.length > 0 ? (
            <PolarChart data={topDonorsByProjectCount.data as ChartDataCount[]} />
          ) : (
            <Typography color="text.secondary">Нет данных для отображения</Typography>
          )}
        </ChartCardLayout>

        <ChartCardLayout
          title="Топ секторов по инвестициям"
          total={topSectorsByInvestment?.total}
          unit={topSectorsByInvestment?.unit}
          loading={loadingState.topSectorsByInvestment}
          handleDownload={() => handleDownload(ChartDownloadType.SectorsByInvestment)}
        >
          {topSectorsByInvestment && topSectorsByInvestment.data.length > 0 ? (
            <HorizontalStackedBarChart data={topSectorsByInvestment.data as ChartDataSum[]} />
          ) : (
            <Typography color="text.secondary">Нет данных для отображения</Typography>
          )}
        </ChartCardLayout>

        <ChartCardLayout
          title="Топ секторов по количеству проектов"
          total={topSectorsByProjectCount?.total}
          unit={topSectorsByProjectCount?.unit}
          loading={loadingState.topSectorsByProjectCount}
          handleDownload={() => handleDownload(ChartDownloadType.SectorsByProjectCount)}
        >
          {topSectorsByProjectCount && topSectorsByProjectCount.data.length > 0 ? (
            <PolarChart data={topSectorsByProjectCount.data as ChartDataCount[]} />
          ) : (
            <Typography color="text.secondary">Нет данных для отображения</Typography>
          )}
        </ChartCardLayout>

        <ChartCardLayout
          title="Топ исполняющих агентств по количеству проектов"
          total={topImplementingAgenciesByProjectCount?.total}
          unit={topImplementingAgenciesByProjectCount?.unit}
          loading={loadingState.topImplementingAgenciesByProjectCount}
          handleDownload={() => handleDownload(ChartDownloadType.ImplementingAgencies)}
        >
          {topImplementingAgenciesByProjectCount && topImplementingAgenciesByProjectCount.data.length > 0 ? (
            <PolarChart data={topImplementingAgenciesByProjectCount.data as ChartDataCount[]} />
          ) : (
            <Typography color="text.secondary">Нет данных для отображения</Typography>
          )}
        </ChartCardLayout>

        <ChartCardLayout
          title="Топ реализующих агентств по количеству проектов"
          total={topExecutiveAgenciesByProjectCount?.total}
          unit={topExecutiveAgenciesByProjectCount?.unit}
          loading={loadingState.topExecutiveAgenciesByProjectCount}
          handleDownload={() => handleDownload(ChartDownloadType.ExecutiveAgencies)}
        >
          {topExecutiveAgenciesByProjectCount && topExecutiveAgenciesByProjectCount.data.length > 0 ? (
            <PolarChart data={topExecutiveAgenciesByProjectCount.data as ChartDataCount[]} />
          ) : (
            <Typography color="text.secondary">Нет данных для отображения</Typography>
          )}
        </ChartCardLayout>
      </Grid>
    </Grid>
  );
};

export default ChartsMainBlock;
