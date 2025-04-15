"use client";
import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { Box, Card, Divider, IconButton, Typography } from "@mui/material";
import BarChart from "@/components/statistics/charts/BarChart.tsx";
import FilterSelect from "@/components/select/FilterSelect.tsx";
import { TestFilterLocationNameOptions, TestFilterSectorOptions } from "@/shared/enums/statisticsMapIconsEnums.ts";
import { ChartDataCount, ChartDataSum } from "@/stores/projects/projects-for-cards.ts";
import { SelectChangeEvent } from "@mui/material/Select";
import { formatCurrency } from "@/utils/formatCurrency.ts";

interface Props {
  title: string;
  total: string;
  unit: string;
  data: ChartDataCount[] | ChartDataSum[];
  chartFilters?: { [key: string]: string };
  handleFilterChange?: (event: SelectChangeEvent) => void;
}

const ChartCard: React.FC<Props> = React.memo(({ title, total, unit, data, chartFilters, handleFilterChange }) => {
  // if (typeof window !== "undefined") {
  //   window.__logCounter = (window.__logCounter || 0) + 1;
  //   console.log(`${title} ${window.__logCounter}`);
  // }

  const isChartDataSum = (data: ChartDataSum[] | ChartDataCount[]): data is ChartDataSum[] => {
    return "grantAmounts" in data[0];
  };

  const names = data.map((item) => item.name);
  const mainValues = isChartDataSum(data)
    ? data.map((item) => item.grantAmounts)
    : data.map((item) => item.projectCount);
  const extraValues = isChartDataSum(data) ? data.map((item) => item.creditAmounts) : undefined;

  // const downloadExcel = (title: string) => {
  //   const fileUrl = `/assets/statistics/exselData/${title}.xlsx`;
  //   const link = document.createElement("a");
  //   link.href = fileUrl;
  //   link.download = `${title}.xlsx`;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 1, minHeight: 500 }}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {isChartDataSum(data) ? unit + " " + formatCurrency(total) : total}
          </Typography>
        </Box>
        <Divider sx={{ backgroundColor: "#666666", height: 2, mb: 4 }} />
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {mainValues.length ? (
            <BarChart names={names} mainValues={mainValues} extraValues={extraValues} title={title} />
          ) : (
            <Typography color="text.secondary">Нет данных для отображения</Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
          <Box>
            {handleFilterChange && (
              <Box>
                <FilterSelect
                  name="region"
                  value={chartFilters?.region ? chartFilters?.region : "all"}
                  options={TestFilterLocationNameOptions}
                  onChange={handleFilterChange}
                  labelName="Регион"
                />
              </Box>
            )}
            {handleFilterChange && (
              <Box>
                <FilterSelect
                  name="sector"
                  value={chartFilters?.sector ? chartFilters?.sector : "all"}
                  options={TestFilterSectorOptions}
                  onChange={handleFilterChange}
                  labelName="Сектор"
                />
              </Box>
            )}
          </Box>
          <Box>
            <IconButton
              // onClick={() => downloadExcel(title)}
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
});

ChartCard.displayName = "ChartCard";

export default ChartCard;
