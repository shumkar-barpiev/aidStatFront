"use client";

import React, { useState } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import { ChartDataSum } from "@/stores/projects/projects-for-charts.ts";
import { formatCurrency } from "@/utils/formatCurrency.ts";
import TitlesLegend from "@/components/statistics/charts/bar-chart-components/TitlesLegend.tsx";

interface Props {
  data: ChartDataSum[];
}

const HorizontalStackedBarChart: React.FC<Props> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const maxTotalSum = Math.max(...data.map((item) => parseFloat(item.totalSum)));

  const names = data.map((item) => item.name);
  const colors = ["#9e9e9e", "#1E3A8A", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"];

  return (
    <Box
      width="100%"
      height="100%"
      sx={{
        minHeight: "325px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        px: 2.5,
      }}
    >
      <TitlesLegend
        names={names}
        hoveredIndex={hoveredIndex}
        setHoveredIndex={setHoveredIndex}
        mainBarColors={colors}
      />
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Typography sx={{ color: "#93C5FD", fontSize: "14px" }}>гранты:</Typography>
        <Typography sx={{ color: "#1E3A8A", fontSize: "14px" }}>кредиты:</Typography>
      </Box>
      {data.map((item) => {
        const opacity = hoveredIndex === null || hoveredIndex === item.name ? 1 : 0.3;
        const backgroundColor = hoveredIndex === item.name ? "#f3f4f6" : "#fff";

        const totalSum = parseFloat(item.totalSum);
        const grantValue = parseFloat(item.grantAmounts);
        const creditValue = parseFloat(item.creditAmounts);
        const grantAmount = formatCurrency(grantValue);
        const creditAmount = formatCurrency(creditValue);

        const totalBarWidth = (totalSum / maxTotalSum) * 100;

        const grantRatio = grantValue / (grantValue + creditValue);
        const creditRatio = creditValue / (grantValue + creditValue);

        const grantBarWidth = totalBarWidth * grantRatio;
        const creditBarWidth = totalBarWidth * creditRatio;

        const grantPercent = Math.round(grantRatio * 100);
        const creditPercent = Math.round(creditRatio * 100);

        return (
          <Box
            key={item.name}
            sx={{ display: "flex", opacity, backgroundColor }}
            onMouseEnter={() => setHoveredIndex(item.name)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Tooltip
              title={
                <Box sx={{ p: 1 }}>
                  <Typography variant="caption" sx={{ fontSize: "0.85rem", fontWeight: 500, color: "#333", mb: 1 }}>
                    {item.name}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mt: 1 }}>
                    <Typography variant="caption" sx={{ fontSize: "0.75rem", color: "#555" }}>
                      Общая сумма: {formatCurrency(item.totalSum)}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: "0.75rem", color: "#555" }}>
                      Гранты: {grantAmount}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: "0.75rem", color: "#555" }}>
                      Кредиты: {creditAmount}
                    </Typography>
                  </Box>
                </Box>
              }
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "#fff",
                    color: "#fff",
                    fontSize: "0.85rem",
                    border: "1px solid #ccc",
                  },
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "100%",
                  maxWidth: "600px",
                  minWidth: "200px",
                  mx: "auto",
                  py: 0.4,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                  <Typography sx={{ width: "10%", textAlign: "left", fontSize: "12px", color: "#555" }}>
                    {grantPercent}%
                  </Typography>
                  <Box
                    sx={{
                      position: "relative",
                      width: "70%",
                      height: "28px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        right: "50%",
                        width: `${grantBarWidth / 2}%`,
                        height: "100%",
                        backgroundColor: "#93C5FD",
                        borderTopLeftRadius: "2px",
                        borderBottomLeftRadius: "2px",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        left: "50%",
                        width: `${creditBarWidth / 2}%`,
                        height: "100%",
                        backgroundColor: "#1E3A8A",
                        borderTopRightRadius: "2px",
                        borderBottomRightRadius: "2px",
                      }}
                    />
                  </Box>

                  <Typography sx={{ width: "10%", textAlign: "right", fontSize: "12px", color: "#555" }}>
                    {creditPercent}%
                  </Typography>
                </Box>
              </Box>
            </Tooltip>
          </Box>
        );
      })}
    </Box>
  );
};

export default HorizontalStackedBarChart;
