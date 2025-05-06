"use client";

import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { Box, Card, CircularProgress, Divider, Grid, IconButton, Typography } from "@mui/material";
import { formatCurrency } from "@/utils/formatCurrency";
import FilterSelect, { Option } from "@/components/select/FilterSelect";
import ChartTitle from "@/components/statistics/charts/ChartTitle";
import Colors from "@/styles/colors";

interface Props {
  title: string;
  total?: string;
  unit?: string;
  value?: string;
  selectOptions?: Option[];
  handleFilterChange?: (id: number) => void;
  loading?: boolean;
  handleDownload: () => void;
  children?: React.ReactNode;
}

const ChartCardLayout: React.FC<Props> = ({
  title,
  total,
  unit,
  value,
  selectOptions,
  handleFilterChange,
  loading,
  handleDownload,
  children,
}) => {
  return (
    <Grid item xs={12} sm={12} lg={6}>
      <Card sx={{ boxShadow: 3, borderRadius: 1, minHeight: 483 }}>
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Box sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <ChartTitle title={title} />
            {total && (
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {unit ? `${unit} ${formatCurrency(total)}` : total}
              </Typography>
            )}
          </Box>

          <Divider sx={{ backgroundColor: Colors.darkBlue, height: 2, mb: 2 }} />

          <Box
            sx={{
              flex: 1,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "325px",
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : children ? (
              children
            ) : (
              <Typography color="text.secondary">Нет данных для отображения</Typography>
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between", alignItems: "center", p: 2 }}>
            <Box sx={{ display: "flex", flex: 1 }}>
              {selectOptions && selectOptions.length > 0 && value && (
                <>
                  {title.includes("по регионам") && (
                    <FilterSelect
                      name="region"
                      value={value}
                      options={selectOptions}
                      onChange={handleFilterChange ?? (() => {})}
                      labelName="Регион"
                      isAll={false}
                    />
                  )}
                  {title.includes("по секторам") && (
                    <FilterSelect
                      name="sector"
                      value={value}
                      options={selectOptions}
                      onChange={handleFilterChange ?? (() => {})}
                      labelName="Сектор"
                      isAll={false}
                    />
                  )}
                </>
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
        </Box>
      </Card>
    </Grid>
  );
};

export default React.memo(ChartCardLayout);
