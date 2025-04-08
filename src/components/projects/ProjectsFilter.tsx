"use client";

import React, { useState, useEffect } from "react";
import RegionDistrictSelector from "./RegionDistrictSelector";
import { EProjectModelFilter } from "@/models/project/ProjectModel";
import { useRegionsViewModel } from "@/viewmodels/regions/useRegionsViewModel";
import { useSectorsViewModel } from "@/viewmodels/sectors/useSectorsViewModel";
import { usePartnersViewModel } from "@/viewmodels/partners/usePartnersViewModel";
import { useProjectsViewModel } from "@/viewmodels/projects/useProjectsViewModel";
import { Stack, Box, Typography, Chip, Autocomplete, TextField } from "@mui/material";

export default function ProjectsFilter() {
  const { sectors } = useSectorsViewModel();
  const { handleFilter } = useProjectsViewModel();
  const { allPartners } = usePartnersViewModel();
  const { regions, districts } = useRegionsViewModel();
  const [selectedSectorIds, setSelectedSectorIds] = useState<number[]>([]);
  const [selectedRegionIds, setSelectedRegionIds] = useState<number[]>([]);
  const [selectedPartnerIds, setSelectedPartnerIds] = useState<number[]>([]);
  const [selectedDistrictIds, setSelectedDistrictIds] = useState<number[]>([]);
  const selectedSectorOptions = sectors.filter((option) => selectedSectorIds.includes(option.id));
  const selectedParnerOptions = allPartners.filter((option) => selectedPartnerIds.includes(option.id));

  const handleSelectionChange = (regionIds: number[], districtIds: number[]) => {
    setSelectedRegionIds(regionIds);
    setSelectedDistrictIds(districtIds);
  };

  useEffect(() => {
    handleFilter(EProjectModelFilter.filterCoverage, {
      regionIds: selectedRegionIds,
      districtIds: selectedDistrictIds,
    });
  }, [selectedRegionIds, selectedDistrictIds]);

  return (
    <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "4px" }}>
      <Stack spacing={2}>
        <Autocomplete
          size="small"
          multiple
          id="sector-ids"
          options={sectors}
          getOptionLabel={(option) => `${option.name} - (${1})`}
          value={selectedSectorOptions}
          onChange={(event, newValue) => {
            const newSectorIds = newValue.map((option) => option.id);
            setSelectedSectorIds(newSectorIds);
            handleFilter(EProjectModelFilter.filterSector, newSectorIds);
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => <TextField {...params} label="Секторы" />}
          renderOption={(props, option) => (
            <li {...props} key={option.name}>
              <Typography
                variant="body2"
                sx={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                ({option.projectCount}) - {option.name}
              </Typography>
            </li>
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...otherProps } = getTagProps({ index });
              return <Chip {...otherProps} key={option.id ?? `option-${index}`} label={option.name} size="small" />;
            })
          }
        />
        <Autocomplete
          size="small"
          multiple
          id="parner-ids"
          options={allPartners}
          getOptionLabel={(option) => option?.name ?? ""}
          value={selectedParnerOptions}
          onChange={(event, newValue) => {
            const newPartnerIds = newValue.map((option) => option.id);
            setSelectedPartnerIds(newPartnerIds);
            handleFilter(EProjectModelFilter.filterPartner, newPartnerIds);
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => <TextField {...params} label="Партнеры" />}
          renderOption={(props, option) => (
            <li {...props} key={option.name}>
              <Typography
                variant="body2"
                sx={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                ({option.projectCount}) - {option.name}
              </Typography>
            </li>
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...otherProps } = getTagProps({ index });
              return <Chip {...otherProps} key={option.id ?? `option-${index}`} label={option.name} size="small" />;
            })
          }
        />

        <RegionDistrictSelector districts={districts} regions={regions} onChange={handleSelectionChange} />
      </Stack>
    </Box>
  );
}
