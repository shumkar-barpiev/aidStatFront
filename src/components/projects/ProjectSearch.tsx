"use client";
import { InputAdornment } from "@mui/material";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { useProjectsStore } from "@/stores/projects/projects";
import { EProjectModelFilter } from "@/models/project/ProjectModel";
import { StyledTextField } from "@/components/other/StyledTextField";
import { useProjectsViewModel } from "@/viewmodels/projects/useProjectsViewModel";

export const ProjectSearchField = () => {
  const { t } = useTranslation();
  const { handleFilter } = useProjectsViewModel();
  const filters = useProjectsStore((state) => state.filters);
  const [inputValue, setInputValue] = useState<string>(filters?.searchString ?? "");

  useEffect(() => {
    setInputValue(filters?.searchString ?? "");
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    handleFilter(EProjectModelFilter.search, value);
  };

  return (
    <StyledTextField
      fullWidth
      placeholder={t("ui.search-placeholder")}
      variant="outlined"
      onChange={onChange}
      value={inputValue}
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
