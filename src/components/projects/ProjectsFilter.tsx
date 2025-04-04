"use client";

import React, { useState, useEffect } from "react";
import RegionDistrictSelector from "./RegionDistrictSelector";
import { Region, useRegionsViewModel } from "@/viewmodels/regions/useRegionsViewModel";
import { useSectorsViewModel } from "@/viewmodels/sectors/useSectorsViewModel";
import { usePartnersViewModel } from "@/viewmodels/partners/usePartnersViewModel";
import { Stack, Box, Typography, Chip, Autocomplete, TextField } from "@mui/material";

export default function ProjectsFilter() {
  const { sectors } = useSectorsViewModel();
  const { allPartners } = usePartnersViewModel();
  const { regions, districts } = useRegionsViewModel();
  const [selectedSectorIds, setSelectedSectorIds] = useState<number[]>([]);
  const [selectedPartnerIds, setSelectedPartnerIds] = useState<number[]>([]);
  const selectedSectorOptions = sectors.filter((option) => selectedSectorIds.includes(option.id));
  const selectedParnerOptions = allPartners.filter((option) => selectedPartnerIds.includes(option.id));

  const [renderTheSelector, setRenderTheSelector] = useState<boolean>(false);

  useEffect(() => {
    if (regions.length > 0 && districts.length > 0) {
      setRenderTheSelector(true);
    }
  }, [regions, districts]);

  const handleSelectionChange = (regionIds: number[], districtIds: number[]) => {
    // console.log("Selected Regions:", regionIds);
    // console.log("Selected Dsit:", districtIds);
  };

  return (
    <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: "4px" }}>
      <Stack spacing={3}>
        <Autocomplete
          size="small"
          multiple
          id="sector-ids"
          options={sectors}
          getOptionLabel={(option) => option.name}
          value={selectedSectorOptions}
          onChange={(event, newValue) => {
            const newSectorIds = newValue.map((option) => option.id);
            setSelectedSectorIds(newSectorIds);
            console.log("Selected IDs:", newSectorIds);
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
                {option.name}
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
            console.log("Selected IDs:", newPartnerIds);
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
                {option.name}
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

        {renderTheSelector && (
          <RegionDistrictSelector districts={districts} regions={regions} onChange={handleSelectionChange} />
        )}
      </Stack>
    </Box>
  );
}
