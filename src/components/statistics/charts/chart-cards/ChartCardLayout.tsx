"use client";

import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { Box, Card, CircularProgress, Divider, Grid, IconButton, Typography } from "@mui/material";
import { formatCurrency } from "@/utils/formatCurrency.ts";
import FilterSelect, { Option } from "@/components/select/FilterSelect.tsx";
import ChartTitle from "@/components/statistics/charts/ChartTitle.tsx";
import Colors from "@/styles/colors.ts";

interface Props {
  name?: string;
  title: string;
  total?: string;
  unit?: string;
  regionSelectValue?: string;
  sectorSelectValue?: string;
  regionOptions?: Option[];
  sectorOptions?: Option[];
  handleRegionFilterChange?: (id: number) => void;
  handleSectorFilterChange?: (id: number) => void;
  loading?: boolean;
  handleDownload: () => void;
  children?: React.ReactNode;
}

const ChartCardLayout: React.FC<Props> = ({
  name,
  title,
  total,
  unit,
  regionSelectValue,
  sectorSelectValue,
  regionOptions,
  sectorOptions,
  handleRegionFilterChange,
  handleSectorFilterChange,
  loading,
  handleDownload,
  children,
}) => {
  return (
    <Grid item xs={12} sm={12} lg={name === "donorsWithRegion&Sector" ? 12 : 6}>
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
              {name?.includes("RegionsOnly") && regionSelectValue && regionOptions && regionOptions.length > 0 && (
                <FilterSelect
                  name="region"
                  value={regionSelectValue}
                  options={regionOptions}
                  onChange={handleRegionFilterChange ?? (() => {})}
                  labelName="Регион"
                  isAll={false}
                />
              )}
              {name?.includes("SectorsOnly") && sectorSelectValue && sectorOptions && sectorOptions.length > 0 && (
                <FilterSelect
                  name="sector"
                  value={sectorSelectValue}
                  options={sectorOptions}
                  onChange={handleSectorFilterChange ?? (() => {})}
                  labelName="Сектор"
                  isAll={false}
                />
              )}
              {name?.includes("Region&Sector") &&
                regionSelectValue &&
                sectorSelectValue &&
                regionOptions &&
                regionOptions.length > 0 &&
                sectorOptions &&
                sectorOptions.length > 0 && (
                  <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, width: "100%", gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <FilterSelect
                        name="region"
                        value={regionSelectValue}
                        options={regionOptions}
                        onChange={handleRegionFilterChange ?? (() => {})}
                        labelName="Регион"
                        isAll={false}
                        isDuo={true}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <FilterSelect
                        name="sector"
                        value={sectorSelectValue}
                        options={sectorOptions}
                        onChange={handleSectorFilterChange ?? (() => {})}
                        labelName="Сектор"
                        isAll={false}
                        isDuo={true}
                      />
                    </Box>
                  </Box>
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
    </Grid>
  );
};

export default React.memo(ChartCardLayout);
