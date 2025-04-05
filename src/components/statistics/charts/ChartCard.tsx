"use client";
import React, { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import TableViewIcon from "@mui/icons-material/TableView";
import RegChart from "@/components/statistics/charts/regChart";
import PieChart from "@/components/statistics/charts/pieChart";
import TableChart from "@/components/statistics/charts/tableChart";
import { Card, Typography, Box, Divider, IconButton } from "@mui/material";

enum ChartTypes {
  BarChart = "BAR_CHART",
  PieChart = "PIE_CHART",
  Table = "Table",
}

export default function ChartCard({ card }: { card: any }) {
  const [view, setView] = useState<ChartTypes>(ChartTypes.BarChart);

  const iconButtonSx = (active: boolean) => ({
    transform: active ? "scale(1.5)" : "scale(1)",
    color: active ? "green" : "inherit",
    transition: "transform 0.2s, color 0.2s",
    "&:hover": {
      transform: "scale(1.5)",
      color: active ? "green" : "blue",
    },
  });

  function downloadExcel(cardId: number) {
    const fileUrl = `/assets/statistics/exselData/${cardId}.xlsx`;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `${cardId}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <Card sx={{ p: 2, boxShadow: 3, borderRadius: 1, height: 400 }}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {card.title}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {card.totalValue} {card.unit}
          </Typography>
        </Box>
        <Divider sx={{ bgcolor: "#666666", height: 2, mb: 1 }} />
        <Box sx={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {view === ChartTypes.BarChart && <RegChart card={card} />}
          {view === ChartTypes.Table && (
            <Box sx={{ width: "110%", height: "100%", overflow: "auto" }}>
              <TableChart card={card} />
            </Box>
          )}
          {view === ChartTypes.PieChart && <PieChart card={card} />}
        </Box>
        <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}>
          <Box>
            <IconButton onClick={() => setView(ChartTypes.BarChart)} sx={iconButtonSx(view === ChartTypes.BarChart)}>
              <BarChartIcon />
            </IconButton>
            <IconButton onClick={() => setView(ChartTypes.Table)} sx={iconButtonSx(view === ChartTypes.Table)}>
              <TableViewIcon />
            </IconButton>
            <IconButton onClick={() => setView(ChartTypes.PieChart)} sx={iconButtonSx(view === ChartTypes.PieChart)}>
              <PieChartIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton
              onClick={() => downloadExcel(card.id)}
              sx={{
                transition: "transform 0.2s, color 0.2s",
                "&:hover": { transform: "scale(1.5)", color: "blue" },
              }}
            >
              <DownloadIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
