"use client";

import {
  Box,
  Card,
  Grid,
  Stack,
  Tooltip,
  CardMedia,
  IconButton,
  Typography,
  Pagination,
  CircularProgress,
} from "@mui/material";
import React from "react";
import Colors from "@/styles/colors.ts";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { usePartnersStore } from "@/stores/partners/partners.ts";
import { PartnerSearchField } from "@/components/partners/partners/PartnerSearch.tsx";
import { plainBtnStyle } from "@/components/navigation-bar/NavigationBar.tsx";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { usePartnersViewModel } from "@/viewmodels/partners/usePartnersViewModel.ts";

function PartnersCard() {
  const router = useRouter();
  const { t } = useTranslation();
  const partnerStore = usePartnersStore();
  const { handlePartnersPageChange, partnersFilter } = usePartnersViewModel();

  const placeholderBox = () => {
    return (
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            width: 1,
            mt: 3,
          }}
        >
          {partnerStore.loading && <CircularProgress />}
          {!partnerStore.loading && <Typography variant="body2">Нет данных</Typography>}
        </Box>
      </Grid>
    );
  };

  return (
    <Box>
      <Box sx={{ mb: 1 }}>
        <PartnerSearchField />
      </Box>

      <Box>
        <Grid container spacing={3}>
          {partnerStore.loading
            ? placeholderBox()
            : partnerStore?.items?.length !== 0
              ? partnerStore?.items?.map((partner, index) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
                            onClick={() => {
                              router.push(`/partners/show/${partner.name}#${partner.id}`);
                            }}
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
                            <button
                              onClick={() => {
                                router.push(`/partners/show/${partner.name}#${partner.id}`);
                              }}
                              style={plainBtnStyle}
                            >
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
                            </button>
                          </Stack>

                          <Tooltip title={t("more")}>
                            <IconButton
                              onClick={() => {
                                router.push(`/partners/show/${partner.name}#${partner.id}`);
                              }}
                              sx={{ border: `1px solid ${Colors.darkBlue}` }}
                            >
                              <ArrowForwardOutlinedIcon sx={{ color: `${Colors.darkBlue}` }} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </Card>
                    </Grid>
                  );
                })
              : placeholderBox()}
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
    </Box>
  );
}

export default PartnersCard;
