"use client";

import "@/utils/i18n.ts";
import "@/styles/global.css";
import theme from "@/styles/theme";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { ThemeProvider } from "@mui/material/styles";
import { NavigationBar } from "@/components/navigation-bar/NavigationBar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1200,

                transform: isScrolled ? "translateY(-100%)" : "translateY(0)",
                transition: "transform 0.3s ease",
              }}
            >
              <Header />
            </Box>

            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1100,
                transform: isScrolled ? "translateY(0)" : "translateY(40px)",
                transition: "transform 0.3s ease",
              }}
            >
              <NavigationBar />
            </Box>

            <Box
              component="main"
              sx={{
                pt: isScrolled ? "64px" : "128px",
                minHeight: "100vh",
              }}
            >
              {children}
            </Box>

            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
