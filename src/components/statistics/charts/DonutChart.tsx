"use client";

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Colors from "@/styles/colors";

interface Props {
  title: string;
  seriesOptions: number[];
  labels: string[];
  totalContracts: number;
}

const DonutChart: React.FC<Props> = ({ title, seriesOptions, labels, totalContracts }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [options, setOptions] = useState<ApexOptions>({
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
      width: 160,
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
              formatter: () => totalContracts.toString(),
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      labels: labels,
      plotOptions: {
        pie: {
          donut: {
            labels: {
              total: {
                formatter: () => totalContracts.toString(),
              },
            },
          },
        },
      },
    }));
  }, [totalContracts, labels]);

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
      <Chart
        options={options}
        series={seriesOptions}
        type="donut"
        width={isMobile ? "350px" : "420px"}
        height="270px"
      />
    </Box>
  );
};

export default React.memo(DonutChart);
