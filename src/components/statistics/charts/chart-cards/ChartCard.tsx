"use client";

import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { Box, Card, CircularProgress, Divider, IconButton, Typography } from "@mui/material";
import BarChart from "@/components/statistics/charts/bar-chart-components/BarChart.tsx";
import { ChartDataCount, ChartDataSum } from "@/stores/projects/projects-for-charts.ts";
import { formatCurrency } from "@/utils/formatCurrency.ts";
import FilterSelect, { Option } from "@/components/select/FilterSelect.tsx";
import ChartTitle from "@/components/statistics/charts/ChartTitle.tsx";
import Colors from "@/styles/colors.ts";

interface Props {
  title: string;
  total?: string;
  unit?: string;
  data: ChartDataSum[];
  value?: string;
  selectOptions?: Option[];
  chartFilters?: { [key: string]: string };
  handleFilterChange?: (id: number) => void;
  loading?: boolean;
  handleDownload: () => void;
}

const ChartCard: React.FC<Props> = ({
  title,
  total,
  unit,
  data,
  value,
  selectOptions,
  handleFilterChange,
  loading,
  handleDownload,
}) => {
  const isChartDataSum = (data: ChartDataSum[] | ChartDataCount[]): data is ChartDataSum[] => {
    return data?.length > 0 && "grantAmounts" in data[0];
  };

  const names = data.map((item) => item.name);

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 1, minHeight: 483 }}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <ChartTitle title={title} />
          {total && (
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {isChartDataSum(data || []) ? `${unit} ${formatCurrency(total)}` : total}
            </Typography>
          )}
        </Box>

        <Divider sx={{ backgroundColor: Colors.darkBlue, height: 2, mb: 2 }} />

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
          {loading ? (
            <Box
              height="100%"
              sx={{ minHeight: "325px", display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <CircularProgress />
            </Box>
          ) : data ? (
            <BarChart data={data} />
          ) : (
            <Typography color="text.secondary">Нет данных для отображения</Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between", alignItems: "center", p: 2 }}>
          <Box sx={{ display: "flex", flex: 1 }}>
            {title.includes("по регионам") && selectOptions && selectOptions.length > 0 && value && (
              <FilterSelect
                name="region"
                value={value}
                options={selectOptions}
                onChange={handleFilterChange ?? (() => {})}
                labelName="Регион"
                isAll={false}
              />
            )}
            {title.includes("по секторам") && selectOptions && selectOptions.length > 0 && value && (
              <FilterSelect
                name="sector"
                value={value}
                options={selectOptions}
                onChange={handleFilterChange ?? (() => {})}
                labelName="Сектор"
                isAll={false}
              />
            )}
          </Box>
          <Box>
            <IconButton
              sx={{
                transition: "transform 0.2s, color 0.2s",
                "&:hover": { transform: "scale(1.5)", color: "blue" },
              }}
              onClick={handleDownload}
            >
              <DownloadIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default React.memo(ChartCard);
