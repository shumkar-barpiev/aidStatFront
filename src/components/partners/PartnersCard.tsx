"use client";

import React, { useEffect } from "react";
import Colors from "@/styles/colors";
import { useTranslation } from "react-i18next";
import { usePartnersStore } from "@/stores/partners/partners";
import { PartnerSearchField } from "@/components/partners/PartnerSearch";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { usePartnersViewModel } from "@/viewmodels/partners/usePartnersViewModel";
import { Box, Card, Grid, Stack, Tooltip, CardMedia, IconButton, Typography, Pagination } from "@mui/material";

function PartnersCard() {
  const { t } = useTranslation();
  const partnerStore = usePartnersStore();
  const { handlePartnersPageChange, partnersFilter } = usePartnersViewModel();

  return (
    partnerStore?.items && (
      <Box>
        <Box sx={{ mb: 1 }}>
          <PartnerSearchField />
        </Box>
        <Grid container spacing={3}>
          {(partnerStore?.items ?? []).length > 0 &&
            partnerStore.items?.map((partner, index) => {
              return (
                <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                  <Card
                    sx={{
                      height: "282px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      p: "20px",
                      borderRadius: "0px",
                      overflow: "hidden",
                      backgroundColor: "#F0F4F7",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#e6ecf0",
                        boxShadow: 6,
                        transform: "translateY(-5px)",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "180px",
                        width: "100%",
                        overflow: "hidden",
                        backgroundColor: "inherit",
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt={partner.name}
                        image={`data:image/png;base64,${partner.image}`}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>

                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                      <Stack direction={"column"} alignItems={"left"}>
                        <Typography
                          variant="h3"
                          sx={{
                            fontWeight: 550,
                            fontFamily: "sans-serif",
                            fontSize: "1.25rem",
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 1,
                            textOverflow: "ellipsis",

                            "&:hover": {
                              color: "#2E4B6D",
                              transition: "color 0.3s ease",
                            },
                          }}
                        >
                          {partner.name}
                        </Typography>
                      </Stack>

                      <Tooltip title={t("more")}>
                        <IconButton sx={{ border: `1px solid ${Colors.darkBlue}` }}>
                          <ArrowForwardOutlinedIcon sx={{ color: `${Colors.darkBlue}` }} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
        {(partnerStore.pageTotal ?? 0) > 0 && (
          <Box sx={{ mt: 2 }}>
            <Pagination
              siblingCount={1}
              boundaryCount={2}
              page={partnersFilter?.page}
              disabled={partnerStore.loading}
              count={partnerStore.pageTotal ?? 1}
              onChange={handlePartnersPageChange}
            />
          </Box>
        )}
      </Box>
    )
  );
}

export default PartnersCard;
