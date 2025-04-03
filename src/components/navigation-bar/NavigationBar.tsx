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
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const { t } = useTranslation();
  const { matches: isDesktop, mounted } = useMediaQueryWithSsr("md");
  const { navItems, isMobileMenuOpen, toggleMobileMenu } = useNavViewModel();

  const plainBtnStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    color: "inherit",
    padding: 0,
  };

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
          <button onClick={() => router.push("/")} style={plainBtnStyle}>
            <Image
              src="/assets/images/icons/aid-stat-icon.png"
              alt="App Logo"
              width={120}
              height={40}
              style={{ objectFit: "contain" }}
            />
          </button>
        </Box>

        {isDesktop && (
          <>
            <Box sx={{ display: "flex", alignItems: "center", gap: { md: 1.5, lg: 3, xl: 4 }, mx: 2 }}>
              {navItems.map((item) => (
                <button key={item.i18n} onClick={() => router.push(item.path)} style={plainBtnStyle}>
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
                </button>
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
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <LocaleSwitch />
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleMobileMenu} sx={{ ml: 2 }}>
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Stack>
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
              width: "80%",
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
              <ListItem
                key={"mainPage"}
                component="button"
                onClick={() => {
                  router.push("/");
                  toggleMobileMenu();
                }}
                sx={{
                  bgcolor: "transparent",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  width: "100%",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <ListItemText
                  primary={t("mainPage")}
                  primaryTypographyProps={{
                    variant: "h6",
                    textAlign: "left",
                  }}
                />
              </ListItem>
              {navItems.map((item) => (
                <ListItem
                  key={item.i18n}
                  component="button"
                  onClick={() => {
                    router.push(item.path);
                    toggleMobileMenu();
                  }}
                  sx={{
                    bgcolor: "transparent",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    width: "100%",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <ListItemText
                    primary={t(`${item.i18n}`)}
                    primaryTypographyProps={{
                      variant: "h6",
                      textAlign: "left",
                    }}
                  />
                </ListItem>
              ))}

              <ListItem
                key={"login"}
                component="button"
                onClick={() => {
                  // router.push("/login");
                  // toggleMobileMenu();
                }}
                sx={{
                  bgcolor: "transparent",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  width: "100%",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <ListItemText
                  primary={t("login")}
                  primaryTypographyProps={{
                    variant: "h6",
                    textAlign: "left",
                  }}
                />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}
    </AppBar>
  );
};
