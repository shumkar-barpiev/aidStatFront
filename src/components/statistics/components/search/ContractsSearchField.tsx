"use client";

import React from "react";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { StyledTextField } from "@/components/other/StyledTextField.tsx";
import { useContractsStore } from "@/stores/contracts/contracts.ts";

interface Props {
  handleSetFilter: (searchString: string) => void;
}

const ContractsSearchField: React.FC<Props> = ({ handleSetFilter }) => {
  const filters = useContractsStore((state) => state.filters);

  return (
    <StyledTextField
      fullWidth
      // placeholder={t("search-placeholder")}
      // variant="outlined"
      // onChange={onChange}
      // value={inputValue}
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
