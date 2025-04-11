"use client";

import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Box } from "@mui/material";

interface Props {
  seriesOptions?: number[];
  labels?: string[];
}

const DonutChart: React.FC<Props> = ({ seriesOptions, labels }) => {
  if (!seriesOptions) return null;

  const noData = seriesOptions.every((val) => val === 0);

  const series = noData ? [1] : seriesOptions;

  const options: ApexOptions = noData
    ? {
        chart: {
          type: "donut",
        },
        labels: ["Нет данных для графика"],
        colors: ["#e0e0e0"],
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
        legend: {
          show: true,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      }
    : {
        chart: {
          type: "donut",
        },
        labels: labels,
        colors: ["#0b4678", "#005faf", "#0084c7", "#00a1e1", "#0074b7"],
        dataLabels: {
          enabled: true,
        },
        tooltip: {
          enabled: true,
        },
        legend: {
          show: true,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      };

  return (
    <Box mx="auto" display="flex" justifyContent="center" alignItems="center">
      <Chart options={options} series={series} type="donut" width="450px" />
    </Box>
  );
};

export default DonutChart;
