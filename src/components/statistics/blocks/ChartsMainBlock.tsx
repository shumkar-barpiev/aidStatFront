import React, { useMemo } from "react";
import useStatisticsChartsViewModel from "@/viewmodels/statistics/charts/useStatisticsChartsViewModel";
import { ChartDataCount, ChartDataSum, useProjectChartsStore } from "@/stores/projects/projects-for-charts";
import { Button, Grid, Typography } from "@mui/material";
import { useRegionsViewModel } from "@/viewmodels/regions/useRegionsViewModel";
import { useSectorsViewModel } from "@/viewmodels/sectors/useSectorsViewModel";
import { ChartDownloadType } from "@/shared/enums/fetchChartsEnums";
import AreaChart from "@/components/statistics/charts/area-chart-components/AreaChart";
import { useProjectsMapStore } from "@/stores/projects/projects-for-map";
import { EnergeticsMok, TransportsMok } from "@/shared/enums/statisticsMapIconsEnums";
import PolarChart from "@/components/statistics/charts/pie-chart-components/PolarChart";
import ChartCardLayout from "@/components/statistics/charts/chart-cards/ChartCardLayout";
import HorizontalStackedBarChart from "@/components/statistics/charts/bar-chart-components/HorizontalStackedBarChart";
import { useTranslation } from "react-i18next";
import BarChart from "@/components/statistics/charts/bar-chart-components/BarChart.tsx";

const ChartsMainBlock = () => {
  const { regions } = useRegionsViewModel();
  const { sectors, sectorsGroup } = useSectorsViewModel();
  const sectorOptions = sectors.concat(sectorsGroup);
  const { handleFilterBySector, handleFilterByRegion, handleDownload, selectedOption, optionsForDuoCorrelation } =
    useStatisticsChartsViewModel();
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
    topDonorsByInvestmentByRegionAndSector,
    loadingState,
  } = cardsStore;
  const { t } = useTranslation();

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
        title={t("statisticsPage.charts.areaElectricityTitle")}
        projects={energeticsProjects}
        series={EnergeticsMok}
        yTitle="млн кВт⋅ч"
      />
      <AreaChart
        title={t("statisticsPage.charts.freightTransportIncomeTitle")}
        projects={transportsProjects}
        series={TransportsMok}
        yTitle="млн сом"
      />

      <Grid container spacing={3}>
        <ChartCardLayout
          name="donorsWithRegion&Sector"
          title={t("statisticsPage.charts.barCorrelationDonorToRegionAndSectorTitle")}
          total={topDonorsByInvestmentByRegionAndSector?.total}
          unit={topDonorsByInvestmentByRegionAndSector?.unit}
          loading={loadingState.topDonorsByInvestmentByRegionAndSector}
          handleDownload={() =>
            handleDownload(
              ChartDownloadType.RegionAndSector,
              optionsForDuoCorrelation.region,
              optionsForDuoCorrelation.sector
            )
          }
          regionSelectValue={optionsForDuoCorrelation.region.toString()}
          sectorSelectValue={optionsForDuoCorrelation.sector.toString()}
          regionOptions={regions}
          sectorOptions={sectorOptions}
          handleRegionFilterChange={handleFilterByRegion ?? (() => {})}
          handleSectorFilterChange={handleFilterBySector ?? (() => {})}
        >
          {topDonorsByInvestmentByRegionAndSector && topDonorsByInvestmentByRegionAndSector.data.length > 0 ? (
            <BarChart data={topDonorsByInvestmentByRegionAndSector.data as ChartDataSum[]} />
          ) : (
            <Typography color="text.secondary">Нет данных для отображения</Typography>
          )}
        </ChartCardLayout>

        <ChartCardLayout
          name="donorsWithRegionsOnly"
          title={t("statisticsPage.charts.barCorrelationDonorToRegionTitle")}
          total={topDonorsByInvestmentByRegion?.total}
          unit={topDonorsByInvestmentByRegion?.unit}
          loading={loadingState.topDonorsByInvestmentByRegion}
          handleDownload={() => handleDownload(ChartDownloadType.Region, selectedOption.region)}
          regionSelectValue={selectedOption.region.toString()}
          regionOptions={regions}
          handleRegionFilterChange={handleFilterByRegion ?? (() => {})}
        >
          {topDonorsByInvestmentByRegion && topDonorsByInvestmentByRegion.data.length > 0 ? (
            <BarChart data={topDonorsByInvestmentByRegion.data as ChartDataSum[]} />
          ) : (
            <Typography color="text.secondary">Нет данных для отображения</Typography>
          )}
        </ChartCardLayout>

        <ChartCardLayout
          name="donorsWithSectorsOnly"
          title={t("statisticsPage.charts.barCorrelationDonorToSectorTitle")}
          total={topDonorsByInvestmentBySector?.total}
          unit={topDonorsByInvestmentBySector?.unit}
          loading={loadingState.topDonorsByInvestmentBySector}
          handleDownload={() => handleDownload(ChartDownloadType.Region, selectedOption.sector)}
          sectorSelectValue={selectedOption.sector.toString()}
          sectorOptions={sectorOptions}
          handleSectorFilterChange={handleFilterBySector ?? (() => {})}
        >
          {topDonorsByInvestmentBySector && topDonorsByInvestmentBySector.data.length > 0 ? (
            <BarChart data={topDonorsByInvestmentBySector.data as ChartDataSum[]} />
          ) : (
            <Typography color="text.secondary">Нет данных для отображения</Typography>
          )}
        </ChartCardLayout>

        <ChartCardLayout
          title={t("statisticsPage.charts.barDonorsToSumTitle")}
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
          title={t("statisticsPage.charts.barDonorsToProjectsTitle")}
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
          title={t("statisticsPage.charts.barSectorsToSumTitle")}
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
          title={t("statisticsPage.charts.barSectorsToProjectsTitle")}
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
          title={t("statisticsPage.charts.barImplementorsToProjectsTitle")}
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
          title={t("statisticsPage.charts.barExecutorsToProjectsTitle")}
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
