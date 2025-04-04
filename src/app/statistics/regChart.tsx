"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Tooltip } from "@mui/material";

function parseValue(str: string): number {
  const numeric = parseFloat(str.replace(/[^\d.]/g, ""));
  return str.includes("млрд") ? numeric * 1000 : numeric;
}
function truncateLabel(label: string): string {
  return label.length > 22 ? label.substring(0, 22) + "..." : label;
}
function formatValue(original: string, val: number) {
  if (original.includes("млрд")) {
    const adjusted = val / 1000;
    let oneDecimal = adjusted.toFixed(1);
    if (oneDecimal.endsWith(".0")) oneDecimal = oneDecimal.slice(0, -2);
    return oneDecimal + " млрд";
  }
  if (original.includes("млн")) {
    let oneDecimal = val.toFixed(1);
    if (oneDecimal.endsWith(".0")) oneDecimal = oneDecimal.slice(0, -2);
    return oneDecimal + " млн";
  }
  let oneDecimal = val.toFixed(1);
  if (oneDecimal.endsWith(".0")) oneDecimal = oneDecimal.slice(0, -2);
  return oneDecimal;
}

export default function RegChart({ card }: { card: any }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let step = 0;
    const totalSteps = 60;
    const inc = 1 / totalSteps;
    const intervalId = setInterval(() => {
      step++;
      setProgress((old) => Math.min(old + inc, 1));
      if (step >= totalSteps) clearInterval(intervalId);
    }, 16);
  }, []);

  const chartMaxHeight = 140;
  const maxValue = Math.max(...card.chartData.map((item: any) => parseValue(item.value)), 0);

  return (
    <Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1.5, mb: 2 }}>
        {card.chartData.map((item: any) => (
          <Box key={item.label} sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: item.label === "Другие" ? "#9e9e9e" : item.color,
                borderRadius: "50%",
                mr: 1,
              }}
            />
            <Tooltip
              title={item.label}
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "white",
                    color: "black",
                    fontSize: "0.75rem",
                    p: 0.5,
                    border: "1px solid black",
                  },
                },
              }}
            >
              <Typography variant="body2">{truncateLabel(item.label)}</Typography>
            </Tooltip>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: "auto" }}>
        <Box
          sx={{ mt: 1, display: "flex", justifyContent: "space-between", height: chartMaxHeight, overflow: "visible" }}
        >
          {card.chartData.map((item: any) => {
            const finalVal = parseValue(item.value);
            const barHeight = maxValue > 0 ? (finalVal / maxValue) * chartMaxHeight * 0.9 : 0;
            const animatedHeight = barHeight * progress;
            const animatedVal = finalVal * progress;
            const displayText = formatValue(item.value, animatedVal);

            return (
              <Tooltip
                key={item.label}
                placement="top"
                title={
                  <Box sx={{ border: "1px solid black", p: 0.5 }}>
                    <Typography variant="caption" sx={{ fontSize: "0.75rem", mb: 0.5 }}>
                      {item.label}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          backgroundColor: item.label === "Другие" ? "#9e9e9e" : item.color,
                          borderRadius: "50%",
                          mr: 0.5,
                        }}
                      />
                      <Typography variant="caption" sx={{ fontSize: "0.75rem" }}>
                        Количество: {item.value}
                      </Typography>
                    </Box>
                  </Box>
                }
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "white",
                      color: "black",
                      fontSize: "0.75rem",
                      p: 0.5,
                      border: "1px solid black",
                    },
                  },
                }}
              >
                <Box sx={{ position: "relative", width: 70, height: chartMaxHeight, textAlign: "center" }}>
                  <Typography
                    variant="caption"
                    sx={{
                      position: "absolute",
                      bottom: animatedHeight + 4,
                      left: 0,
                      right: 0,
                      fontSize: "0.75rem",
                    }}
                  >
                    {displayText}
                  </Typography>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      backgroundColor: item.label === "Другие" ? "#9e9e9e" : item.color,
                      filter: "brightness(0.8)",
                      height: animatedHeight,
                      width: "100%",
                      transition: "height 0.1s linear",
                      borderRadius: 0,
                    }}
                  />
                </Box>
              </Tooltip>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
