"use client";
import { InputAdornment } from "@mui/material";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import { StyledTextField } from "@/components/other/StyledTextField";

interface SearchFieldProps {
  value: string;
  onChange: Function;
}

export const ProjectSearchField: React.FC<SearchFieldProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <StyledTextField
      fullWidth
      placeholder={t("search-placeholder")}
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
