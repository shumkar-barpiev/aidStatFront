"use client";
import { InputAdornment } from "@mui/material";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import { EPartnerModelFilter } from "@/models/partner/partner";
import { StyledTextField } from "@/components/other/StyledTextField";
import { usePartnersViewModel } from "@/viewmodels/partners/usePartnersViewModel";

export const PartnerSearchField = () => {
  const { t } = useTranslation();
  const { handleFilter } = usePartnersViewModel();

  return (
    <StyledTextField
      fullWidth
      placeholder={t("search-placeholder")}
      variant="outlined"
      onChange={(e) => {
        const searchText = e.target.value;
        handleFilter(EPartnerModelFilter.search, searchText);
      }}
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
