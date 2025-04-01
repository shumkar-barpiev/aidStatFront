"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useMediaQueryWithSsr } from "@/hooks/useMediaQuery";
import { containerWidths, containerMargins } from "@/utils/constants";
import { useNavViewModel } from "@/viewmodels/navigation-bar/useNavViewModel";
import { Box, List, Drawer, AppBar, Toolbar, ListItem, Typography, IconButton, ListItemText } from "@mui/material";

export const NavigationBar = () => {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState<boolean>(false);
  const { matches: isDesktop, mounted } = useMediaQueryWithSsr("md");
  const { navItems, isMobileMenuOpen, toggleMobileMenu } = useNavViewModel();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !mounted) return null;

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        color: "black",
        fontFamily: "Roboto, sans-serif",
        height: "90px",
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
              src="/icons/aid-stat-icon.png"
              alt="App Logo"
              width={120}
              height={40}
              style={{ objectFit: "contain" }}
            />
          </Link>
        </Box>

        {isDesktop && (
          <>
            <Box sx={{ display: "flex", gap: { md: 1.5, lg: 3, xl: 4 }, mx: 2 }}>
              {navItems.map((item) => (
                <Link key={item.path} href={item.path} passHref style={{ textDecoration: "none", color: "inherit" }}>
                  <Typography variant="button" sx={{ whiteSpace: "nowrap" }}>
                    {t(`${item.i18n}`)}
                  </Typography>
                </Link>
              ))}
            </Box>

            <Box component="form">
              <IconButton id="search-button" sx={{ color: "black", width: 40, height: 40 }}>
                <SearchIcon sx={{ color: "black", width: 28, height: 28 }} />
              </IconButton>
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
