"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Colors from "@/styles/colors";
import { useTranslation } from "react-i18next";
import { containerWidths, containerMargins } from "@/utils/constants";
import { useFooterViewModel } from "@/viewmodels/footer/useFooterViewModel";
import { Box, Container, Grid, Link, Typography, Divider, Stack } from "@mui/material";

export const Footer = () => {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState<boolean>(false);
  const { primaryFooterNavItems, secondaryFooterNavItems } = useFooterViewModel();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

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
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3 }, height: "25vh" }}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Stack direction={"row"} alignItems={"center"} flexWrap={"wrap"}>
              {primaryFooterNavItems.map((item) => (
                <Box key={item.label} sx={{ mt: 1, mr: 2 }}>
                  <Link
                    href="#"
                    color="inherit"
                    underline="hover"
                    sx={{ display: "block", textTransform: "uppercase" }}
                  >
                    {t(`${item.i18n}`)}
                  </Link>
                </Box>
              ))}
            </Stack>
            <Grid container spacing={4} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Divider sx={{ mb: 2 }} />

                <Stack
                  direction={{ xs: "column", md: "row" }}
                  alignItems={{ xs: "flex-start", md: "center" }}
                  justifyContent={{ xs: "flex-start", md: "space-between" }}
                  sx={{ width: "100%" }}
                  spacing={3}
                >
                  <Box>
                    <Link href="/">
                      <Image
                        src="/icons/aid-stat-footer-icon.png"
                        alt="App Logo"
                        width={150}
                        height={50}
                        style={{ objectFit: "contain" }}
                      />
                    </Link>
                  </Box>
                  <Box>
                    <Box>
                      <Grid
                        container
                        spacing={2}
                        sx={{
                          flexDirection: { xs: "column", sm: "row", md: "row" },
                          flexWrap: { sm: "nowrap" },
                          overflowX: { sm: "auto" },
                        }}
                      >
                        {secondaryFooterNavItems.map((item) => (
                          <Grid
                            item
                            key={item.label}
                            sx={{
                              width: { xs: "100%", sm: "auto" },
                              flexShrink: 0,
                            }}
                          >
                            <Link
                              href="#"
                              color="inherit"
                              underline="hover"
                              sx={{
                                display: "block",
                                whiteSpace: "nowrap",
                                px: 1,
                              }}
                            >
                              {t(`${item.i18n}`)}
                            </Link>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Box>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack
                  direction={{ xs: "column", md: "row", lg: "row", xl: "row" }}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {t("allRightsReserved")}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    © 2025 AIDSTAT.
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
