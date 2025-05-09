"use client";

import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Colors from "@/styles/colors.ts";

const EmptyDonutChart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const options: ApexOptions = {
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
      fontSize: isMobile ? "10px" : "12px",
      width: 160,
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
  };

  return (
    <Box mx="auto" display="flex" flexDirection="column" justifyContent="center" alignItems="start">
      <Typography
        variant="h6"
        sx={{
          mb: isMobile ? 0 : 1,
          fontSize: isMobile ? "12px" : "18px",
          color: Colors.textSecondary,
        }}
      >
        Нет контрактов
      </Typography>
      <Chart options={options} series={[1]} type="donut" width={isMobile ? "350px" : "420px"} height="270px" />
    </Box>
  );
};

export default EmptyDonutChart;
