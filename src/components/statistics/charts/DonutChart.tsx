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
  const series = seriesOptions || [44, 54, 53];

  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: labels || ["до $100.000", "$100.000 - $500.000", "от $500.000"],
    colors: ["#0b4678", "#005faf", "#0084c7", "#00a1e1", "#0074b7"],
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
