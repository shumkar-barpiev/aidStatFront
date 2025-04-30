"use client";

import "@/utils/i18n";
import React from "react";
import "@/styles/global.css";
import theme from "@/styles/theme";
import { Box } from "@mui/material";
import { NAVBAR_HEIGHT } from "@/utils/constants";
import { Footer } from "@/components/footer/Footer";
import { ThemeProvider } from "@mui/material/styles";
import { FeedbackBtn } from "@/components/feedback-btn/FeedbackBtn";
import { NavigationBar } from "@/components/navigation-bar/NavigationBar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <NavigationBar />
        <Box sx={{ minHeight: "100dvh", mt: `${NAVBAR_HEIGHT}px` }}>{children}</Box>
        <Footer />
        <FeedbackBtn />
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
