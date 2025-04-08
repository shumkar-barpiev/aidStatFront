import {
  Box,
  Paper,
  Checkbox,
  Collapse,
  FormGroup,
  Typography,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState, useCallback } from "react";
import { StyledTextField } from "@/components/other/StyledTextField";
import { ExpandMore, ExpandLess, Search } from "@mui/icons-material";
import { Region, District } from "@/viewmodels/regions/useRegionsViewModel";

interface Props {
  regions: Region[];
  districts: District[];
  onChange: (regionIds: number[], districtIds: number[]) => void;
}

const RegionDistrictSelector: React.FC<Props> = ({ regions, districts, onChange }) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [selectedRegionIds, setSelectedRegionIds] = useState<number[]>([]);
  const [selectedDistrictIds, setSelectedDistrictIds] = useState<number[]>([]);
  const [expandedRegions, setExpandedRegions] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const initialExpanded = regions.reduce(
      (acc, region) => {
        acc[region.id] = false;
        return acc;
      },
      {} as Record<number, boolean>
    );
    setExpandedRegions(initialExpanded);
  }, [regions]);

  const filteredDistricts = useCallback(() => {
    if (!searchText) return districts;
    return districts.filter((district) => district.name.toLowerCase().includes(searchText.toLowerCase()));
  }, [districts, searchText]);

  const filteredRegions = useCallback(() => {
    if (!searchText) return regions;

    return regions.filter((region) => {
      const regionMatch = region.name.toLowerCase().includes(searchText.toLowerCase());
      const hasMatchingDistricts = filteredDistricts().some((district) => district.regionId === region.id);
      return regionMatch || hasMatchingDistricts;
    });
  }, [regions, searchText, filteredDistricts]);

  const handleRegionChange = useCallback(
    (regionId: number) => {
      setSelectedRegionIds((prev) =>
        prev.includes(regionId) ? prev.filter((id) => id !== regionId) : [...prev, regionId]
      );

      setSelectedDistrictIds((prev) => {
        const regionDistrictIds = districts.filter((d) => d.regionId === regionId).map((d) => d.id);
        return prev.filter((id) => !regionDistrictIds.includes(id));
      });
    },
    [districts]
  );

  const handleDistrictChange = useCallback(
    (districtId: number, regionId: number) => {
      setSelectedDistrictIds((prev) => {
        const newDistrictIds = prev.includes(districtId)
          ? prev.filter((id) => id !== districtId)
          : [...prev, districtId];

        const regionDistricts = districts.filter((d) => d.regionId === regionId);
        const allDistrictsSelected = regionDistricts.every((d) => newDistrictIds.includes(d.id));

        if (allDistrictsSelected) {
          setSelectedRegionIds((prev) => (prev.includes(regionId) ? prev : [...prev, regionId]));
          return newDistrictIds.filter((id) => !regionDistricts.some((d) => d.id === id));
        } else {
          setSelectedRegionIds((prev) => prev.filter((id) => id !== regionId));
          return newDistrictIds;
        }
      });
    },
    [districts]
  );

  const areAllDistrictsSelected = useCallback(
    (regionId: number) => {
      const regionDistricts = districts.filter((d) => d.regionId === regionId);
      return regionDistricts.length > 0 && regionDistricts.every((d) => selectedDistrictIds.includes(d.id));
    },
    [districts, selectedDistrictIds]
  );

  const areSomeDistrictsSelected = useCallback(
    (regionId: number) => {
      const regionDistricts = districts.filter((d) => d.regionId === regionId);
      return regionDistricts.some((d) => selectedDistrictIds.includes(d.id)) && !areAllDistrictsSelected(regionId);
    },
    [districts, selectedDistrictIds, areAllDistrictsSelected]
  );

  useEffect(() => {
    if (searchText) {
      const regionsToExpand = new Set<number>();
      const currentFilteredDistricts = filteredDistricts();
      const currentFilteredRegions = filteredRegions();

      currentFilteredDistricts.forEach((district) => {
        regionsToExpand.add(district.regionId);
      });

      currentFilteredRegions.forEach((region) => {
        if (region.name.toLowerCase().includes(searchText.toLowerCase())) {
          regionsToExpand.add(region.id);
        }
      });

      setExpandedRegions((prev) => {
        const newState = { ...prev };
        let hasChanges = false;

        regions.forEach((region) => {
          const shouldExpand = regionsToExpand.has(region.id);
          if (newState[region.id] !== shouldExpand) {
            newState[region.id] = shouldExpand;
            hasChanges = true;
          }
        });

        return hasChanges ? newState : prev;
      });
    }
  }, [searchText, regions, filteredDistricts, filteredRegions]);

  useEffect(() => {
    onChange(selectedRegionIds, selectedDistrictIds);
  }, [selectedRegionIds, selectedDistrictIds, onChange]);

  return (
    regions &&
    districts && (
      <Paper elevation={2} sx={{ p: 1 }}>
        <Typography variant="body1" color={"secondary"} sx={{ mb: 0.5 }}>
          Охват
        </Typography>

        <StyledTextField
          fullWidth
          variant="outlined"
          placeholder={`${t("search-coverage-placeholder")}...`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 1 }}
        />

        <FormGroup>
          {filteredRegions().map((region) => {
            const regionDistricts = filteredDistricts().filter((d) => d.regionId === region.id);
            const isRegionSelected = selectedRegionIds.includes(region.id);
            const allDistrictsSelected = areAllDistrictsSelected(region.id);
            const someDistrictsSelected = areSomeDistrictsSelected(region.id);
            const isExpanded = expandedRegions[region.id] ?? false;

            if (
              searchText &&
              regionDistricts.length === 0 &&
              !region.name.toLowerCase().includes(searchText.toLowerCase())
            ) {
              return null;
            }

            return (
              <Box key={region.id} sx={{ mb: 0, width: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isRegionSelected || allDistrictsSelected}
                        indeterminate={someDistrictsSelected && !isRegionSelected}
                        onChange={() => handleRegionChange(region.id)}
                      />
                    }
                    label={
                      <Typography
                        fontWeight="bold"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: { xs: "150px", sm: "200px", md: "250px" },
                        }}
                      >
                        {`[ ${region.projectCount} ]  ${region.name}`}
                      </Typography>
                    }
                    sx={{
                      flexGrow: 1,
                      minWidth: 0,
                      ml: 0.5,
                      "& .MuiFormControlLabel-label": {
                        flex: 1,
                        minWidth: 0,
                      },
                    }}
                  />
                  {regionDistricts.length > 0 && (
                    <IconButton
                      size="small"
                      onClick={() =>
                        setExpandedRegions((prev) => ({
                          ...prev,
                          [region.id]: !prev[region.id],
                        }))
                      }
                      sx={{ flexShrink: 0 }}
                    >
                      {isExpanded ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  )}
                </Box>

                <Collapse in={isExpanded}>
                  {regionDistricts.length > 0 && (
                    <Box sx={{ ml: 3 }}>
                      <FormGroup>
                        {regionDistricts.map((district) => (
                          <FormControlLabel
                            key={district.id}
                            control={
                              <Checkbox
                                checked={selectedDistrictIds.includes(district.id) || isRegionSelected}
                                onChange={() => handleDistrictChange(district.id, region.id)}
                              />
                            }
                            label={`[${district.projectCount}] ${district.name}`}
                          />
                        ))}
                      </FormGroup>
                    </Box>
                  )}
                </Collapse>
              </Box>
            );
          })}
        </FormGroup>
      </Paper>
    )
  );
};

export default RegionDistrictSelector;
