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
  const { handleFilter } = useProjectsViewModel();
  const { allPartners } = usePartnersViewModel();
  const { regions, districts } = useRegionsViewModel();
  const [selectedGroupIds, setSelectedGroupIds] = useState<number[]>([]);
  const [selectedSectorIds, setSelectedSectorIds] = useState<number[]>([]);
  const [selectedRegionIds, setSelectedRegionIds] = useState<number[]>([]);
  const [selectedPartnerIds, setSelectedPartnerIds] = useState<number[]>([]);
  const [selectedDistrictIds, setSelectedDistrictIds] = useState<number[]>([]);
  const { sectors, sectorsGroup, handleSectorGroupChange } = useSectorsViewModel();
  const selectedSectorOptions = sectors.filter((s) => selectedSectorIds.includes(s.id));
  const selectedSectorsGroupOptions = sectorsGroup.filter((g) => selectedGroupIds.includes(g.id));
  const selectedParnerOptions = allPartners.filter((option) => selectedPartnerIds.includes(option.id));

  const handleGroupChange = (event: any, newGroups: Record<string, any>[]) => {
    const newGroupIds = newGroups.map((g) => g.id);
    setSelectedGroupIds(newGroupIds);
    handleSectorGroupChange(newGroupIds);
    if (newGroupIds.length > 0) {
      setSelectedSectorIds((prev) => Array.from(new Set([...prev, ...newGroupIds])));
    } else {
      setSelectedSectorIds([]);
    }
  };

  const handleSectorChange = (event: any, newSectors: Record<string, any>[]) => {
    const newSectorIds = newSectors.map((s) => s.id);
    if (newSectorIds.length > 0) {
      setSelectedSectorIds(newSectorIds);
    } else {
      const newGroupIds = selectedSectorsGroupOptions.map((g) => g.id);
      setSelectedSectorIds(newGroupIds);
    }
  };

  useEffect(() => {
    handleFilter(EProjectModelFilter.filterSector, selectedSectorIds);
  }, [selectedSectorIds]);

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
          id="sector-group-ids"
          options={sectorsGroup}
          getOptionLabel={(option) => `${option.name} - (${1})`}
          value={selectedSectorsGroupOptions}
          onChange={handleGroupChange}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => <TextField {...params} label="Группы секторов" />}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
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
              return <Chip {...otherProps} key={index} label={option.name} size="small" />;
            })
          }
        />

        <Autocomplete
          size="small"
          multiple
          id="sector-ids"
          options={sectors}
          getOptionLabel={(option) => `${option.name} - (${1})`}
          value={selectedSectorOptions}
          onChange={handleSectorChange}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => <TextField {...params} label="Секторы" />}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
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
              return <Chip {...otherProps} key={index} label={option.name} size="small" />;
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
            <li {...props} key={option.id}>
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
              return <Chip {...otherProps} key={index} label={option.name} size="small" />;
            })
          }
        />

        {districts && regions && (
          <RegionDistrictSelector districts={districts} regions={regions} onChange={handleSelectionChange} />
        )}
      </Stack>
    </Box>
  );
}
