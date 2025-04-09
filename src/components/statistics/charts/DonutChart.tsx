"use client";

import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

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
    labels: labels || ["до $100.000", "от $100.000 до $500.000", "от $500.000"],
    colors: [
      "#0b4678", // Тёмно-синий
      "#005faf", // Ярко-синий
      "#0084c7", // Голубой
      "#00a1e1", // Светло-голубой
      "#0074b7", // Средний синий
    ],
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
    <div className="w-full flex justify-center items-center">
      <Chart options={options} series={series} type="donut" width="500" />
    </div>
  );
};

export default DonutChart;
