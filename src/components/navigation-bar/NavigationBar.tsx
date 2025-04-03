"use client";

import {
  Box,
  List,
  Stack,
  AppBar,
  Drawer,
  Toolbar,
  Tooltip,
  ListItem,
  Typography,
  IconButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";
import { NAVBAR_HEIGHT } from "@/utils/constants";
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQueryWithSsr } from "@/hooks/useMediaQuery";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { containerWidths, containerMargins } from "@/utils/constants";
import { LocaleSwitch } from "@/components/navigation-bar/LocaleSwitch";
import { useNavViewModel } from "@/viewmodels/navigation-bar/useNavViewModel";

export const NavigationBar = () => {
  const { t } = useTranslation();
  const { matches: isDesktop, mounted } = useMediaQueryWithSsr("md");
  const { navItems, isMobileMenuOpen, toggleMobileMenu } = useNavViewModel();

  if (!mounted) return null;

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        color: "black",
        fontFamily: "Roboto, sans-serif",
        height: `${NAVBAR_HEIGHT}px`,
      }}
    >
      <Toolbar
        sx={{
          width: containerWidths,
          mx: containerMargins,
          justifyContent: "space-between",
          height: "100%",
          alignItems: "center",
          minHeight: "unset",
        }}
      >
        <Box>
          <Link href="/" passHref>
            <Image
              src="/assets/images/icons/aid-stat-icon.png"
              alt="App Logo"
              width={120}
              height={40}
              style={{ objectFit: "contain" }}
            />
          </Link>
        </Box>

        {isDesktop && (
          <>
            <Box sx={{ display: "flex", alignItems: "center", gap: { md: 1.5, lg: 3, xl: 4 }, mx: 2 }}>
              {navItems.map((item) => (
                <Link key={item.path} href={item.path} passHref style={{ textDecoration: "none", color: "inherit" }}>
                  <Typography
                    variant="button"
                    sx={{
                      whiteSpace: "nowrap",
                      fontSize: "14px",
                      transition: "all 0.1s ease-in-out",
                      "&:hover": { textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" },
                    }}
                  >
                    {t(`${item.i18n}`)}
                  </Typography>
                </Link>
              ))}
            </Box>

            <Box>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <LocaleSwitch />
                <Tooltip title={`${t("login")}`}>
                  <IconButton id="sign-in-button" sx={{ color: "black" }}>
                    <LoginOutlinedIcon sx={{ color: "black", width: 24, height: 24 }} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
          </>
        )}

        {!isDesktop && (
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleMobileMenu} sx={{ ml: 2 }}>
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      {!isDesktop && (
        <Drawer
          anchor="right"
          open={isMobileMenuOpen}
          onClose={toggleMobileMenu}
          sx={{
            "& .MuiDrawer-paper": {
              width: "100%",
              height: "100%",
              maxWidth: "100vw",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "background.paper",
              p: 2,
            }}
            role="presentation"
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={toggleMobileMenu}>
                <CloseIcon />
              </IconButton>
            </Box>

            <List sx={{ mt: 4 }}>
              {navItems.map((item) => (
                <ListItem
                  key={item.path}
                  component={Link}
                  href={item.path}
                  onClick={toggleMobileMenu}
                  sx={{
                    py: 1,
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <ListItemText
                    primary={t(`${item.i18n}`)}
                    primaryTypographyProps={{
                      variant: "h6",
                      textAlign: "center",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      )}
    </AppBar>
  );
};
