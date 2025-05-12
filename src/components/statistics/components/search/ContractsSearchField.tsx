"use client";

import React, { useState } from "react";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { StyledTextField } from "@/components/other/StyledTextField";
import { useContractsStore } from "@/stores/contracts/contracts";
import { useTranslation } from "react-i18next";

interface Props {
  handleSetFilter: (searchString: string) => void;
}

const ContractsSearchField: React.FC<Props> = ({ handleSetFilter }) => {
  const filters = useContractsStore((state) => state.filters);
  const [inputValue, setInputValue] = useState<string>(filters?.searchString ?? "");
  const { t } = useTranslation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    handleSetFilter(value);
  };

  return (
    <StyledTextField
      fullWidth
      placeholder={t("search-placeholder")}
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

export default ContractsSearchField;
