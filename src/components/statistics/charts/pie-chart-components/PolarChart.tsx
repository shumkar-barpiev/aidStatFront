"use client";

import { Box, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { ChartDataCount } from "@/stores/projects/projects-for-charts.ts";
import TitlesLegend from "@/components/statistics/charts/bar-chart-components/TitlesLegend.tsx";
import Colors from "@/styles/colors.ts";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

interface Props {
  data: ChartDataCount[];
}

const PolarChart: React.FC<Props> = ({ data }) => {
  const [progress, setProgress] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  // Анимация на рендер
  // useEffect(() => {
  //   let step = 0;
  //   const totalSteps = 60;
  //   const inc = 1 / totalSteps;
  //   const timer = setInterval(() => {
  //     step++;
  //     setProgress((old) => Math.min(old + inc, 1));
  //     if (step >= totalSteps) clearInterval(timer);
  //   }, 16);
  //   return () => clearInterval(timer);
  // }, []);

  const sum = data.reduce((acc: number, d: any) => acc + d.projectCount, 0);

  const size = 220;
  const center = size / 2;
  const radius = 80;

  let cumulativeAngle = 0;

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
        alignItems: "center",
        px: 2.5,
      }}
    >
      <TitlesLegend
        names={names}
        hoveredIndex={hoveredIndex}
        setHoveredIndex={setHoveredIndex}
        mainBarColors={colors}
      />
      <svg width={size} height={size} style={{ overflow: "visible" }}>
        {[...data].reverse().map((item, idx: number) => {
          const sliceRatio = item.projectCount / (sum ? sum : 0);
          const sliceAngle = sliceRatio * 360 * progress;
          const startAngle = cumulativeAngle;
          const endAngle = startAngle + sliceAngle;
          cumulativeAngle = endAngle;

          const largeArc = sliceAngle > 180 ? 1 : 0;

          const [x1, y1] = [
            center + radius * Math.cos((Math.PI / 180) * startAngle - Math.PI / 2),
            center + radius * Math.sin((Math.PI / 180) * startAngle - Math.PI / 2),
          ];
          const [x2, y2] = [
            center + radius * Math.cos((Math.PI / 180) * endAngle - Math.PI / 2),
            center + radius * Math.sin((Math.PI / 180) * endAngle - Math.PI / 2),
          ];

          const pathData = `
            M ${center} ${center}
            L ${x1} ${y1}
            A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
            Z
          `;

          const midAngle = (startAngle + endAngle) / 2;
          const [tx, ty] = [
            center + radius * 0.6 * Math.cos((Math.PI / 180) * midAngle - Math.PI / 2),
            center + radius * 0.6 * Math.sin((Math.PI / 180) * midAngle - Math.PI / 2),
          ];

          const slicePercent = (sliceRatio * 100).toFixed(1).replace(/\.0$/, "");
          const baseScale = hoveredIndex === item.name ? `scale(${1 + idx * 0.08 + 0.2})` : `scale(${1 + idx * 0.08})`;

          return (
            <Tooltip
              key={idx}
              title={
                <Box sx={{ p: 1 }}>
                  <Typography variant="caption" sx={{ fontSize: "0.85rem", fontWeight: 500, color: "#333", mb: 1 }}>
                    {item.name}: {item.projectCount}
                  </Typography>
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
                    border: "1px solid #ccc",
                  },
                },
              }}
            >
              <g>
                <path
                  d={pathData}
                  fill={colors[idx]}
                  stroke={Colors.darkBlue}
                  strokeWidth={0.2}
                  style={{
                    transition: "transform 0.4s ease, fill 0.4s ease",
                    transformOrigin: `${center}px ${center}px`,
                    transform: baseScale,
                    opacity: 1,
                  }}
                  onMouseEnter={() => {
                    setHoveredIndex(item.name);
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                {sliceAngle > 5 && (
                  <text
                    x={tx}
                    y={ty}
                    className={poppins.className}
                    style={{
                      transition: "transform 0.2s ease",
                      pointerEvents: "none",
                      fill: "#fff",
                      fontWeight: "400",
                      fontSize: "12px",
                      textAnchor: "middle",
                      alignmentBaseline: "middle",
                      textShadow: "0 0 4px rgba(0, 0, 0, 1)",
                    }}
                  >
                    {slicePercent}%
                  </text>
                )}
              </g>
            </Tooltip>
          );
        })}
      </svg>
    </Box>
  );
};

export default React.memo(PolarChart);
