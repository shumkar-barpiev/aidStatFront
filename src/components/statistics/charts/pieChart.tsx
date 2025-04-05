"use client";
import { Box, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";

function parseValue(str: string) {
  const numeric = parseFloat(str.replace(/[^\d.]/g, ""));
  return str.includes("млрд") ? numeric * 1000 : numeric;
}

export default function PieChart({ card }: { card: any }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let step = 0;
    const totalSteps = 60;
    const inc = 1 / totalSteps;
    const timer = setInterval(() => {
      step++;
      setProgress((old) => Math.min(old + inc, 1));
      if (step >= totalSteps) clearInterval(timer);
    }, 16);
  }, []);

  const data = card.chartData.map((item: any) => ({
    ...item,
    numericVal: parseValue(item.value),
  }));
  const sum = data.reduce((acc: number, d: any) => acc + d.numericVal, 0);

  const size = 270;
  const center = 135;
  const radius = 90;
  let cumulativeAngle = 0;

  return (
    <Box sx={{ width: size, height: size, mx: "auto", position: "relative" }}>
      <svg width={size} height={size} style={{ overflow: "visible" }}>
        {data.map((item: any, idx: number) => {
          const sliceRatio = item.numericVal / sum;
          const sliceAngle = sliceRatio * 360 * progress;
          const startAngle = cumulativeAngle;
          const endAngle = startAngle + sliceAngle;
          cumulativeAngle = endAngle;

          const largeArc = sliceAngle > 180 ? 1 : 0;

          const x1 = center + radius * Math.cos((Math.PI / 180) * startAngle - Math.PI / 2);
          const y1 = center + radius * Math.sin((Math.PI / 180) * startAngle - Math.PI / 2);
          const x2 = center + radius * Math.cos((Math.PI / 180) * endAngle - Math.PI / 2);
          const y2 = center + radius * Math.sin((Math.PI / 180) * endAngle - Math.PI / 2);

          const pathData = [
            `M ${center} ${center}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
            `Z`,
          ].join(" ");

          const midAngle = (startAngle + endAngle) / 2;
          const midRad = (Math.PI / 180) * midAngle - Math.PI / 2;
          const slicePercent = (sliceRatio * 100).toFixed(1).replace(/\.0$/, "");

          const textRadius = radius * 0.6;
          const tx = center + textRadius * Math.cos(midRad);
          const ty = center + textRadius * Math.sin(midRad);

          return (
            <Tooltip
              key={idx}
              title={`${item.label}: ${item.value}`}
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "white",
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
                  fill={item.label === "Другие" ? "#9e9e9e" : item.color}
                  stroke="#fff"
                  strokeWidth="1"
                  style={{ transition: "transform 0.2s" }}
                  transform-origin={`${center}px ${center}px`}
                  onMouseEnter={(e) => {
                    (e.target as SVGPathElement).style.transform = "scale(1.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as SVGPathElement).style.transform = "scale(1)";
                  }}
                />
                {sliceAngle > 5 && (
                  <text
                    x={tx}
                    y={ty}
                    fill="black"
                    fontWeight="bold"
                    fontSize="13"
                    textAnchor="middle"
                    alignmentBaseline="middle"
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
}
