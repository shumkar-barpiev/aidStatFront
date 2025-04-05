"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Tooltip } from "@mui/material";

function parseValue(s: string) {
  const n = parseFloat(s.replace(/[^\d.]/g, ""));
  return s.includes("млрд") ? n * 1000 : n;
}
function truncateLabel(label: string) {
  return label.length > 60 ? label.substring(0, 60) + "..." : label;
}
function formatValue(original: string, val: number) {
  if (original.includes("млрд")) {
    const adjusted = val / 1000;
    let dec = adjusted.toFixed(1);
    if (dec.endsWith(".0")) dec = dec.slice(0, -2);
    return dec + " млрд";
  }
  if (original.includes("млн")) {
    let dec = val.toFixed(1);
    if (dec.endsWith(".0")) dec = dec.slice(0, -2);
    return dec + " млн";
  }
  let dec = val.toFixed(1);
  if (dec.endsWith(".0")) dec = dec.slice(0, -2);
  return dec;
}

export default function TableChart({ card }: { card: any }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let step = 0;
    const total = 90;
    const inc = 1 / total;
    const timer = setInterval(() => {
      step++;
      setProgress((p) => Math.min(p + inc, 1));
      if (step >= total) clearInterval(timer);
    }, 16);
  }, []);

  const data = [...card.chartData];
  const idx = data.findIndex((d) => d.label === "Другие");
  let others: any = null;
  if (idx !== -1) others = data.splice(idx, 1)[0];
  data.sort((a, b) => parseValue(b.value) - parseValue(a.value));
  if (others) data.push(others);

  const maxVal = parseValue(data[0].value) || 1;

  return (
    <Box>
      {data.map((item: any) => {
        const val = parseValue(item.value);
        const ratio = val / maxVal;
        const barW = ratio * progress * 28;
        const animatedVal = val * progress;
        const disp = formatValue(item.value, animatedVal);

        const labelTooLong = item.label.length > 60;

        return (
          <Box key={item.label} sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {labelTooLong ? (
                <Tooltip
                  title={item.label}
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
                  <Typography variant="body2">{truncateLabel(item.label)}</Typography>
                </Tooltip>
              ) : (
                <Typography variant="body2">{truncateLabel(item.label)}</Typography>
              )}
              <Typography variant="body2">{disp}</Typography>
            </Box>
            <Box
              sx={{
                mt: 0.5,
                backgroundColor: item.label === "Другие" ? "#9e9e9e" : item.color,
                height: "4px",
                width: `${barW}%`,
                transition: "width 0.1s linear",
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
}
