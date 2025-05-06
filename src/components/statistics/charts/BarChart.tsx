import React, { useEffect, useRef, useState } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import TitlesLegend from "@/components/statistics/charts/bar-chart-components/TitlesLegend";
import PercentageBar from "@/components/statistics/charts/bar-chart-components/PercentageBar";
import { formatCurrency } from "@/utils/formatCurrency";
import { ChartDataSum } from "@/stores/projects/projects-for-charts.ts";

interface Props {
  data: ChartDataSum[];
}

const BarChart: React.FC<Props> = ({ data }) => {
  const [progressMain, setProgressMain] = useState(1);
  const [progressExtra, setProgressExtra] = useState(1);

  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const chartRef = useRef<HTMLDivElement | null>(null);

  const names = data.map((item) => item.name);
  const maxTotalSum = Math.max(...data.map((item) => parseFloat(item.totalSum)));
  const mainBarColors = ["#9e9e9e", "#1E3A8A", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let step = 0;
          const totalSteps = 20;
          const stepDuration = 30;
          const inc = 1 / totalSteps;

          setProgressMain(0);
          setProgressExtra(0);

          const intervalMain = setInterval(() => {
            step++;
            setProgressMain((prev) => Math.min(prev + inc, 1));
            if (step >= totalSteps) {
              clearInterval(intervalMain);

              let extraStep = 0;
              const intervalExtra = setInterval(() => {
                extraStep++;
                setProgressExtra((prev) => Math.min(prev + inc, 1));
                if (extraStep >= totalSteps) {
                  clearInterval(intervalExtra);
                }
              }, stepDuration);
            }
          }, stepDuration);
        }
      },
      { threshold: 0.4 }
    );

    const target = chartRef.current;
    if (target) observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  if (data.length === 0) {
    return (
      <Box
        ref={chartRef}
        height="100%"
        sx={{ minHeight: "325px", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Typography variant="body1" color="textSecondary">
          Нет данных для отображения
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={chartRef}
      height="100%"
      sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "325px" }}
    >
      <TitlesLegend
        names={names}
        hoveredIndex={hoveredIndex}
        setHoveredIndex={setHoveredIndex}
        mainBarColors={mainBarColors}
      />
      <Box sx={{ display: "flex", justifyContent: "start", alignItems: "end", height: "100%" }}>
        {data.map((item) => {
          const totalSum = parseFloat(item.totalSum);
          const grantValue = parseFloat(item.grantAmounts);
          const creditValue = parseFloat(item.creditAmounts);
          const totalBarHeight = (totalSum / maxTotalSum) * 200;
          const grantBarHeight = (grantValue / totalSum) * totalBarHeight;
          const creditBarHeight = (creditValue / totalSum) * totalBarHeight;
          const creditPercent = totalSum > 0 ? (creditValue / totalSum) * 100 : 0;
          const grantPercent = totalSum > 0 ? (grantValue / totalSum) * 100 : 0;

          const barOpacity = hoveredIndex === null || hoveredIndex === item.name ? 1 : 0.3;

          return (
            <Tooltip
              key={item.name}
              placement="bottom"
              title={
                <Box sx={{ p: 1.5 }}>
                  <Typography variant="caption" sx={{ fontSize: "0.85rem", fontWeight: 500, color: "#333", mb: 1 }}>
                    {item.name}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mt: 1 }}>
                    <Typography variant="caption" sx={{ fontSize: "0.75rem", color: "#555" }}>
                      Гранты: {formatCurrency(grantValue * progressMain)}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: "0.75rem", color: "#555" }}>
                      Кредиты: {formatCurrency(creditValue * progressExtra)}
                    </Typography>
                  </Box>
                </Box>
              }
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "white",
                    color: "black",
                    fontSize: "0.75rem",
                    p: 0.5,
                    border: "1px solid black",
                  },
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: { xs: "45px", md: "70px" },
                  height: totalBarHeight,
                  margin: "0 5px",
                  textAlign: "center",
                }}
                onMouseEnter={() => setHoveredIndex(item.name)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    bottom: totalBarHeight * progressMain + 4,
                    left: 0,
                    right: 0,
                    fontSize: "0.65rem",
                    color: "#000",
                    textAlign: "center",
                    fontWeight: 500,
                    textShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    opacity: barOpacity,
                  }}
                >
                  {formatCurrency(totalSum * progressMain)}
                </Typography>

                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    height: grantBarHeight * progressMain,
                    width: "100%",
                    backgroundColor: item.name === "Другие" ? "#9e9e9e" : "#93C5FD",
                    opacity: barOpacity,
                    transition: "height 0.1s linear",
                  }}
                >
                  {grantBarHeight > 10 && (
                    <PercentageBar barOpacity={barOpacity} percentage={`${Math.round(grantPercent)}`} />
                  )}
                </Box>

                <Box
                  sx={{
                    position: "absolute",
                    bottom: grantBarHeight * progressMain,
                    height: creditBarHeight * progressMain,
                    width: "100%",
                    backgroundColor: item.name === "Другие" ? "#aaaaaa" : "#1E3A8A",
                    opacity: barOpacity,
                    transition: "height 0.1s linear",
                  }}
                >
                  {creditBarHeight > 10 && (
                    <PercentageBar barOpacity={barOpacity} percentage={`${Math.round(creditPercent)}`} />
                  )}
                </Box>
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
};

export default BarChart;
