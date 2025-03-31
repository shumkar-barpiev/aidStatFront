"use client";

import React from "react";
import Image from "next/image";
import Colors from "@/styles/colors";
import { containerWidths, containerMargins } from "@/utils/constants";
import { useFooterViewModel } from "@/viewmodels/footer/useFooterViewModel";
import { Box, Container, Grid, Link, Typography, Divider, ListItem, ListItemText, Stack } from "@mui/material";

export const Footer = () => {
  const { primaryFooterNavItems, secondaryFooterNavItems } = useFooterViewModel();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: `${Colors.darkBlue}`,
        color: "white",
        py: 4,
        borderTop: "1px solid",
        borderColor: "divider",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <Box
        sx={{
          width: containerWidths,
          mx: containerMargins,
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3 }, height: "45vh" }}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={8}>
                <Grid container spacing={2}>
                  {primaryFooterNavItems.map((item) => (
                    <Grid item xs={6} sm={4} key={item.label}>
                      <Link href="#" color="inherit" underline="hover" sx={{ display: "block" }}>
                        {item.label}
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />

                <Stack
                  direction={{ xs: "column", md: "row" }}
                  alignItems={{ xs: "flex-start", md: "center" }}
                  justifyContent={{ xs: "flex-start", md: "space-between" }}
                  sx={{ width: "100%" }}
                  spacing={3}
                >
                  <Box>
                    <Image
                      src="/icons/aid-stat-footer-icon.png"
                      alt="App Logo"
                      width={150}
                      height={50}
                      style={{ objectFit: "contain" }}
                    />
                  </Box>
                  <Box>
                    <Grid container spacing={2}>
                      {secondaryFooterNavItems.map((item) => (
                        <Grid item xs={6} sm={6} key={item.label}>
                          <Link
                            href="#"
                            color="inherit"
                            underline="hover"
                            sx={{ display: "block", whiteSpace: "nowrap" }}
                          >
                            {item.label}
                          </Link>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack
                  direction={{ xs: "column", md: "row", lg: "row", xl: "row" }}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Все права защищены.
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    © 2024 AIDSTAT.
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
