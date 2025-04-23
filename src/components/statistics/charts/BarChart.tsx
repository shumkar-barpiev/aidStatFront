import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import TitlesLegend from "@/components/statistics/charts/bar-chart-components/TitlesLegend.tsx";
import PercentageBar from "@/components/statistics/charts/bar-chart-components/PercentageBar.tsx";
import { formatCurrency } from "@/utils/formatCurrency.ts";

function parseValue(str: string): number {
  return parseFloat(str);
}

const truncateLabel = (label: string) => {
  return label.length > 22 ? label.substring(0, 22) + "..." : label;
};

const formatValue = (original: string, val: number) => {
  let oneDecimal = val.toFixed(1);
  if (oneDecimal.endsWith(".0")) oneDecimal = oneDecimal.slice(0, -2);
  return oneDecimal;
};

interface Props {
  names: string[];
  mainValues: string[];
  extraValues?: string[];
  title: string;
}

const BarChart: React.FC<Props> = ({ names, mainValues, extraValues, title }) => {
  const [progressMain, setProgressMain] = useState(0);
  const [progressExtra, setProgressExtra] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const mainBarColors = ["#1E3A8A", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"];
  const extraBarColors = ["#4B5CA3", "#5C7EF0", "#73A0F8", "#92BCFB", "#B3D4FE"];
  const tooltipLabel = useMemo(() => (title.includes("количеству") ? "Количество" : "Гранты"), [title]);
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let step = 0;
          const totalSteps = 20; // Увеличено с 10 до 20
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
              }, 16);
            }
          }, 16);
        }
      },
      {
        threshold: 0.4,
      }
    );

    const target = chartRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  const maxMainValue = useMemo(() => {
    if (!mainValues || mainValues.length === 0) return 0;
    return Math.max(...mainValues.map(parseValue));
  }, [mainValues]);

  const maxExtraValue = useMemo(() => {
    if (!extraValues || extraValues.length === 0) return 0;
    return Math.max(...extraValues.map(parseValue));
  }, [extraValues]);

  const chartMaxHeight = 230;

  if (!mainValues || mainValues.length === 0 || !names || names.length === 0) {
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
    <Box ref={chartRef} height="100%" sx={{ minHeight: "325px" }}>
      <TitlesLegend
        names={names}
        hoveredIndex={hoveredIndex}
        setHoveredIndex={setHoveredIndex}
        mainBarColors={mainBarColors}
        truncateLabel={truncateLabel}
      />
      <Box sx={{ height: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "start", height: chartMaxHeight }}>
          {mainValues.map((value: string, index: number) => {
            const finalMainVal = parseValue(value);
            const extraValStr = extraValues?.[index];
            const finalExtraVal = extraValStr ? parseValue(extraValStr) : 0;

            const totalMax = Math.max(maxMainValue + maxExtraValue, 1);
            const mainHeight = (finalMainVal / totalMax) * chartMaxHeight * 0.9;
            const extraHeight = (finalExtraVal / totalMax) * chartMaxHeight * 0.9;

            const animatedMainHeight = mainHeight * progressMain;
            const animatedExtraHeight = extraHeight * progressExtra;

            const total = finalMainVal + finalExtraVal;
            const mainPercent = total > 0 ? (finalMainVal / total) * 100 : 0;
            const extraPercent = total > 0 ? (finalExtraVal / total) * 100 : 0;

            const formattedMainPercent = `${Math.round(mainPercent)}%`;
            const formattedExtraPercent = `${Math.round(extraPercent)}%`;

            const displayMainText = formatValue(value, finalMainVal * progressMain);
            const displayExtraText = extraValStr ? formatValue(extraValStr, finalExtraVal * progressExtra) : null;

            const barOpacity = hoveredIndex === null || hoveredIndex === index ? 1 : 0.3;

            return (
              <Tooltip
                key={names[index]}
                placement="bottom"
                title={
                  <Box sx={{ p: 1.5 }}>
                    <Typography variant="caption" sx={{ fontSize: "0.85rem", fontWeight: 500, color: "#333", mb: 1 }}>
                      {names[index]}
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mt: 1 }}>
                      <Typography variant="caption" sx={{ fontSize: "0.75rem", color: "#555" }}>
                        {tooltipLabel + ": " + formatCurrency(displayMainText)}
                      </Typography>
                      {displayExtraText && (
                        <Typography variant="caption" sx={{ fontSize: "0.75rem", color: "#555" }}>
                          Кредиты: {formatCurrency(displayExtraText)}
                        </Typography>
                      )}
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
                    width: 70,
                    height: chartMaxHeight,
                    textAlign: "center",
                    margin: "0 5px",
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      position: "absolute",
                      bottom: animatedMainHeight + animatedExtraHeight + 4,
                      left: 0,
                      right: 0,
                      fontSize: "0.65rem",
                      color: "#000",
                      textAlign: "center",
                      fontWeight: 500,
                      letterSpacing: 0.5,
                      textShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                      opacity: barOpacity,
                    }}
                  >
                    {displayExtraText
                      ? formatCurrency(parseFloat(displayMainText) + parseFloat(displayExtraText))
                      : displayMainText}{" "}
                  </Typography>

                  {finalExtraVal > 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: animatedMainHeight,
                        height: animatedExtraHeight,
                        width: "100%",
                        backgroundColor: names[index] === "Другие" ? "#aaaaaa" : extraBarColors[index],
                        transition: "height 0.1s linear",
                        opacity: barOpacity,
                      }}
                    >
                      {finalExtraVal > 0 && animatedExtraHeight > 10 && extraValues && (
                        <PercentageBar barOpacity={barOpacity} percentage={formattedExtraPercent} />
                      )}
                    </Box>
                  )}

                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      height: animatedMainHeight,
                      width: "100%",
                      backgroundColor: names[index] === "Другие" ? "#9e9e9e" : mainBarColors[index],
                      transition: "height 0.1s linear",
                      opacity: barOpacity,
                    }}
                  >
                    {animatedMainHeight > 20 && extraValues && (
                      <PercentageBar barOpacity={barOpacity} percentage={formattedMainPercent} />
                    )}
                  </Box>
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default BarChart;
