"use client";

import React, { useMemo } from "react";
import { Card, CardContent, useMediaQuery, useTheme } from "@mui/material";
import ChartTitle from "@/components/statistics/charts/ChartTitle.tsx";
import dynamic from "next/dynamic";
import Colors from "@/styles/colors.ts";

interface Series {
  name: string;
  data: number[];
}

interface Project {
  id: number;
  name: string;
  startDate: string;
}

interface Props {
  title: string;
  series: Series[] | undefined;
  projects: { id: number; name: string; startDate: string }[];
  yTitle: string;
}

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const AreaChart: React.FC<Props> = ({ title, series, projects, yTitle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const generateYears = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => (start + i).toString());
  const currentYear = new Date().getFullYear();
  const years = generateYears(2001, currentYear);

  const padSeriesByRepeatingLast = (seriesData: number[], targetLength: number) => {
    const padded = [...seriesData];
    const lastValue = padded[padded.length - 1];
    while (padded.length < targetLength) {
      padded.push(lastValue);
    }
    return padded;
  };

  const extendedSeries = useMemo(() => {
    return series?.map((s) => ({
      ...s,
      data: padSeriesByRepeatingLast(s.data, years.length),
    }));
  }, [years.length]);

  const annotations = useMemo(() => {
    const groupedProjects: Record<string, Project[]> = projects.reduce(
      (acc, project) => {
        const startYear = new Date(project.startDate).getFullYear().toString();
        if (!acc[startYear]) {
          acc[startYear] = [];
        }
        acc[startYear].push(project);
        return acc;
      },
      {} as Record<string, Project[]>
    );

    return Object.keys(groupedProjects).map((year) => {
      const projectsInYear = groupedProjects[year];
      const color = "#2F70AF";
      return {
        x: year,
        borderColor: color,
        label: {
          borderColor: color,
          style: {
            color: "#fff",
            background: color,
            fontSize: isMobile ? "8px" : "14px",
            fontWeight: 500,
          },
          text: `Начато проектов: ${projectsInYear.length}`,
          offsetX: 10,
          offsetY: -5,
        },
      };
    });
  }, [projects]);

  const chartOptions: ApexCharts.ApexOptions = useMemo(
    () => ({
      chart: {
        type: "area",
        stacked: false,
        toolbar: { show: false },
        animations: { enabled: true, speed: 1200 },
        background: "transparent",
        zoom: {
          enabled: false,
        },
      },
      colors: [Colors.primary, Colors.darkBlue, "#012d4a"],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 2 },
      xaxis: {
        categories: years,
        title: {
          text: "Годы",
          style: { fontWeight: 600, fontSize: isMobile ? "8px" : "14px" },
          offsetY: isMobile ? 5 : 0,
        },
        labels: { style: { fontSize: isMobile ? "5px" : "12px" } },
        tickAmount: 10,
      },
      yaxis: {
        title: { text: yTitle, style: { fontWeight: 600, fontSize: isMobile ? "8px" : "14px" } },
        labels: {
          formatter: (val) => val.toFixed(0),
          style: { fontSize: isMobile ? "5px" : "12px" },
        },
        min: 0,
        forceNiceScale: true,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (val) => `${val} ${yTitle}`,
        },
        custom: ({ series, dataPointIndex, w }) => {
          const currentYear = years[dataPointIndex];

          const projectsInYear = projects.filter((project) => {
            const projectYear = new Date(project.startDate).getFullYear().toString();
            return projectYear === currentYear;
          });

          const projectInfo = projectsInYear
            .map(
              (project) =>
                `<p style="padding: 0.5px; margin: 0"><strong style="color: #777777;">Проект:</strong> <span style="color: #777777; word-wrap: break-word; overflow-wrap: break-word; white-space: normal;">${project.name}</span></p><br />`
            )
            .join("");

          const seriesColors = chartOptions.colors;

          const seriesInfo = series
            .map((s: any, idx: number) => {
              const value = s[dataPointIndex];
              const seriesColor = seriesColors ? seriesColors[idx] : "#000";
              return `<strong style="color: ${seriesColor};">${w.globals.seriesNames[idx]}</strong>: <span style="font-weight: bold; color: ${seriesColor};">${value} ${yTitle}</span>`;
            })
            .join("<br />");

          return `
    <div style="padding: 15px; background-color: #fff; border-radius: 8px; width: 100%; border: 1px solid #ddd; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); max-width: 330px; overflow: hidden; word-wrap: break-word;">
      <p>${seriesInfo}</p><br />
      ${projectInfo}
    </div>
  `;
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0.5,
          opacityFrom: 0.8,
          opacityTo: 0.1,
          stops: [0, 90, 100],
        },
      },
      legend: {
        position: "top",
        fontSize: "13px",
        markers: {
          size: 7,
          shape: "circle",
        },
      },
      annotations: {
        xaxis: annotations,
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: { height: 300 },
            legend: { fontSize: "11px" },
            xaxis: { labels: { rotate: -45 } },
          },
        },
        {
          breakpoint: 480,
          options: {
            chart: { height: 250 },
            xaxis: { tickAmount: 5 },
          },
        },
      ],
    }),
    [annotations, years, projects, yTitle]
  );

  return (
    <Card sx={{ borderRadius: 1, boxShadow: 3, backgroundColor: "#fff", mb: 3 }}>
      <CardContent>
        <ChartTitle title={title} />
        <ApexChart options={chartOptions} series={extendedSeries} type="area" height={500} />
      </CardContent>
    </Card>
  );
};

export default AreaChart;
