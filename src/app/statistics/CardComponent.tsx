"use client";
import React, { useState } from "react";
import { Card, Typography, Box, Divider, IconButton, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import TableViewIcon from "@mui/icons-material/TableView";
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import TableChart from "./tableChart";
import RegChart from "./regChart";
import PieChart from "./pieChart";

export default function CardComponent({ card }: { card: any }) {
  const [view, setView] = useState<"chart" | "table" | "pie">("chart");

  function switchToChart() {
    setView("chart");
  }
  function switchToTable() {
    setView("table");
  }
  function switchToPie() {
    setView("pie");
  }

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
    const fileUrl = `/statistics/exselData/${cardId}.xlsx`;
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
          {view === "chart" && <RegChart card={card} />}
          {view === "table" && (
            <Box sx={{ width: "110%", height: "100%", overflow: "auto" }}>
              <TableChart card={card} />
            </Box>
          )}
          {view === "pie" && <PieChart card={card} />}
        </Box>
        <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}>
          <Box>
            <IconButton onClick={switchToChart} sx={iconButtonSx(view === "chart")}>
              <BarChartIcon />
            </IconButton>
            <IconButton onClick={switchToTable} sx={iconButtonSx(view === "table")}>
              <TableViewIcon />
            </IconButton>
            <IconButton onClick={switchToPie} sx={iconButtonSx(view === "pie")}>
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
