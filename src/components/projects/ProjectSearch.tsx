"use client";
import { InputAdornment } from "@mui/material";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import { useProjectsStore } from "@/stores/projects/projects";
import { EProjectModelFilter } from "@/models/project/ProjectModel";
import { StyledTextField } from "@/components/other/StyledTextField";
import { useProjectsViewModel } from "@/viewmodels/projects/useProjectsViewModel";

export const ProjectSearchField = () => {
  const { t } = useTranslation();
  const { handleFilter } = useProjectsViewModel();
  const filters = useProjectsStore((state) => state.filters);

  return (
    <StyledTextField
      fullWidth
      placeholder={t("search-placeholder")}
      variant="outlined"
      onChange={(e) => {
        const searchText = e.target.value;
        handleFilter(EProjectModelFilter.search, searchText);
      }}
      value={filters?.searchString ?? ""}
      sx={{ width: 1, my: 1 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
    />
  );
};
