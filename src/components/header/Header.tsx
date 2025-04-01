"use client";
import Colors from "@/styles/colors";
import { Box, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { containerWidths, containerMargins } from "@/utils/constants";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const locales = [
  { code: "en", label: "English", flag: "ENG" },
  { code: "ru", label: "Русский", flag: "РУС" },
  { code: "kg", label: "Кыргызча", flag: "КЫР" },
];

export const Header = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [selectedLocale, setSelectedLocale] = useState<Record<string, any> | null>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (locale: any) => {
    if (locale) {
      setSelectedLocale(locale);
      i18n.changeLanguage(locale.code ?? "ru");
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    const matchingLocale = locales.find((locale) => locale.code === i18n.language);
    if (matchingLocale) {
      setSelectedLocale(matchingLocale);
    }

    setIsClient(true);
  }, [i18n.language]);

  if (!isClient) return null;

  return (
    <Box sx={{ height: "40px", width: "100%", bgcolor: `${Colors.lightBrown}` }}>
      <Box
        sx={{
          width: containerWidths,
          mx: containerMargins,
        }}
      >
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ width: "100%" }}>
          <Box>
            <Button
              id="locale-button"
              aria-controls={anchorEl ? "locale-menu" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              endIcon={<ExpandMoreIcon sx={{ color: "black" }} />}
              sx={{ color: "black" }}
            >
              {selectedLocale?.flag}
            </Button>
            <Menu
              id="locale-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleClose(null)}
              disableScrollLock={true}
            >
              {locales.map((locale) => (
                <MenuItem key={locale.code} onClick={() => handleClose(locale)}>
                  <Typography variant="body2">{locale.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box>
            <Button
              id="sign-in-button"
              startIcon={<AccountCircleOutlinedIcon sx={{ color: "black", width: 24, height: 24 }} />}
              sx={{ color: "black" }}
            >
              {t("login")}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
