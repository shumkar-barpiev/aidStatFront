"use client";

import { Box, Card, Grid, Stack, Tooltip, CardMedia, IconButton, Typography } from "@mui/material";
import React from "react";
import Colors from "@/styles/colors";
import { useTranslation } from "react-i18next";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { usePartnersViewModel } from "@/viewmodels/partners/usePartnersViewModel";

function PartnersCard() {
  const { t } = useTranslation();
  const { partners } = usePartnersViewModel();

  return (
    <Grid container spacing={3}>
      {partners.map((partner, index) => {
        return (
          <Grid item xs={12} sm={6} md={6} lg={3} key={partner.id}>
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
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  alt={partner.name}
                  image={`https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200?grayscale`}
                  sx={{
                    objectFit: "cover",
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
  );
}

export default PartnersCard;
