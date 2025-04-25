"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, Typography } from "@mui/material";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const years = [
  "1992",
  "1993",
  "1994",
  "1995",
  "1996",
  "1997",
  "1998",
  "1999",
  "2000",
  "2001",
  "2002",
  "2003",
  "2004",
  "2005",
  "2006",
  "2007",
  "2008",
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
];

const series = [
  {
    name: "Гидроэлектростанции",
    data: [
      9288, 9085, 11724, 11118, 12255, 10934, 9943, 12141, 13682, 12430, 10787, 13004, 14094.3, 13980.4, 13652.5,
      14004.1, 10759.1, 10098.0, 11254.6, 14309.1, 14179.0, 13096.7,
    ],
  },
  {
    name: "Тепловые электростанции",
    data: [
      2692, 2188, 1208, 1231, 1503, 1703, 1675, 1018, 1249, 1237, 1135, 1017, 1046.7, 910.8, 870.7, 826.3, 1030.0,
      985.2, 808.1, 848.9, 989.3, 914.7,
    ],
  },
];

const options: ApexCharts.ApexOptions = {
  chart: {
    type: "area",
    stacked: true,
    animations: {
      enabled: true,
      speed: 1800,
    },
  },
  dataLabels: { enabled: false },
  xaxis: {
    categories: years,
    title: { text: "Годы" },
    tickAmount: 10,
  },
  yaxis: {
    title: { text: "Произведено электроэнергии (млн кВт⋅ч)" },
    labels: {
      formatter: (val) => val.toFixed(0),
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: (val) => `${val} млн кВт⋅ч`,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.6,
      opacityTo: 0.1,
    },
  },
  legend: {
    position: "bottom",
  },
};

const ElectricityProductionChart = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Производство электроэнергии по источникам (1992–2013)
      </Typography>
      <ApexCharts options={options} series={series} type="area" height={500} />
    </CardContent>
  </Card>
);

export default ElectricityProductionChart;
