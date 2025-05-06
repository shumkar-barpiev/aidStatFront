"use client";

import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import "apexcharts/dist/apexcharts.css";
import Colors from "@/styles/colors";

interface Props {
  title: string;
  seriesOptions?: number[];
  labels?: string[];
}

const DonutChart: React.FC<Props> = ({ title, seriesOptions, labels }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!seriesOptions) return null;

  const noData = seriesOptions.every((val) => val === 0);
  const series = noData ? [1] : seriesOptions;

  const options: ApexOptions = noData
    ? {
        chart: {
          type: "donut",
        },
        labels: ["Нет контрактов"],
        colors: ["#e0e0e0"],
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
        legend: {
          show: true,
          position: "right",
          width: 180,
        },
        plotOptions: {
          pie: {
            donut: {
              size: "65%",
              labels: {
                show: false,
              },
            },
          },
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
          fontSize: isMobile ? "10px" : "12px",
          width: 140,
        },
        plotOptions: {
          pie: {
            donut: {
              size: "65%",
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: isMobile ? "10px" : "14px",
                  fontWeight: 600,
                  color: Colors.darkBlue,
                  offsetY: -10,
                },
                value: {
                  show: true,
                  fontSize: isMobile ? "18px" : "28px",
                  fontWeight: 700,
                  color: Colors.darkBlue,
                  offsetY: 10,
                },
                total: {
                  show: true,
                  label: "Контрактов",
                  fontSize: isMobile ? "10px" : "14px",
                  fontWeight: 600,
                  color: Colors.darkBlue,
                  formatter: function (w) {
                    return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0).toString();
                  },
                },
              },
            },
          },
        },
      };

  return (
    <Box mx="auto" display="flex" flexDirection="column" justifyContent="center" alignItems="start">
      <Typography
        variant="h6"
        sx={{
          mb: isMobile ? 0 : 1,
          fontSize: isMobile ? "12px" : "18px",
          color: Colors.darkBlue,
        }}
      >
        {title}
      </Typography>
      <Chart options={options} series={series} type="donut" width={isMobile ? "350px" : "450px"} height="270px" />
    </Box>
  );
};
export default DonutChart;
