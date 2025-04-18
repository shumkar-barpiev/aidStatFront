"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { Box, Button, Tooltip } from "@mui/material";
import { ChevronRightSharp } from "@mui/icons-material";
import { Menu, MenuItem, Typography } from "@mui/material";

const locales = [
  { code: "en", label: "Eng", iconPath: "/assets/images/country-flags/us-flag.png" },
  { code: "ru", label: "Рус", iconPath: "/assets/images/country-flags/ru-flag.png" },
  { code: "kg", label: "Кыр", iconPath: "/assets/images/country-flags/kg-flag.png" },
];

export const LocaleSwitch = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLocale, setSelectedLocale] = useState<Record<string, any> | null>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (locale: any) => {
    if (locale) {
      setSelectedLocale(locale);
      i18n.changeLanguage(locale.code ?? locales[1].code);
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    const matchingLocale = locales.find((locale) => locale.code === i18n.language);
    if (matchingLocale) {
      setSelectedLocale(matchingLocale);
    } else {
      setSelectedLocale(locales[1]);
      i18n.changeLanguage(locales[1].code);
    }
  }, [i18n.language]);

  return (
    <Box>
      <Tooltip title={`${selectedLocale?.label}`}>
        <Button
          id="locale-button"
          aria-controls={anchorEl ? "locale-menu" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          sx={{ color: "black" }}
          startIcon={
            <Box
              component="span"
              sx={{
                display: "inline-flex",
                transition: "transform 0.3s ease",
                transform: anchorEl ? "rotate(90deg)" : "rotate(0deg)",
              }}
            >
              <ChevronRightSharp />
            </Box>
          }
        >
          {selectedLocale?.label}
        </Button>
      </Tooltip>

      <Menu
        id="locale-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose(null)}
        disableScrollLock={true}
      >
        {locales.map((locale) => (
          <MenuItem key={locale.code} onClick={() => handleClose(locale)}>
            <Typography variant="body2" sx={{ fontWeight: 550 }}>
              {locale.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
