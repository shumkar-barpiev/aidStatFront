"use client";

import {
  Box,
  Card,
  Grid,
  Stack,
  Divider,
  CardMedia,
  Typography,
  IconButton,
  CardContent,
  CircularProgress,
} from "@mui/material";
import Colors from "@/styles/colors";
import PhoneIcon from "@mui/icons-material/Phone";
import React, { useEffect, useState } from "react";
import { TPartnerModel } from "@/models/partner/partner";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { usePartnersStore } from "@/stores/partners/partners";
import { formatCurrencyWithSpaces } from "@/utils/formatCurrency";
import { CollapsibleText } from "@/components/other/CollabsibleText";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";

const ShowPartner = () => {
  const partnerStore = usePartnersStore();
  const [partner, setPartner] = useState<TPartnerModel | null>(null);

  const formatAndValidateUrl = (url: string) => {
    if (!url) return null;

    url = url.trim();

    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }

    try {
      new URL(url);
      return url;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    if (partnerStore.item) {
      setPartner(partnerStore.item);
    }

    return () => {
      partnerStore.clearStore();
    };
  }, [partnerStore.item]);

  return partner ? (
    <Box sx={{ mt: 4, px: 2 }}>
      <Card elevation={3}>
        <CardContent>
          <Stack
            direction={"row"}
            alignItems={"end"}
            spacing={3}
            sx={{ mb: 2, justifyContent: "space-between", pr: 3 }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1rem", sm: "1.5rem" },
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                maxWidth: "60%",
              }}
            >
              {partner?.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
                width: "180px",
                overflow: "hidden",
                backgroundColor: "inherit",
              }}
            >
              {partner?.image && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "150px",
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: "4px",
                    backgroundColor: "#F0F4F7",
                    p: 1,
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
              )}
            </Box>
          </Stack>
          <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />

          <Stack direction={{ xs: "column-reverse", sm: "row", md: "row" }} alignItems={"start"} gap={3}>
            <Box sx={{ width: { xs: 1, sm: 3 / 5, md: 4 / 5 } }}>
              <Card sx={{ p: 3, mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Описание
                </Typography>
                {partner?.description && (
                  <CollapsibleText header="Описание" text={partner?.description} maxChars={1000} />
                )}
              </Card>
            </Box>
            <Box sx={{ width: { xs: 1, sm: 2 / 5, md: 1 / 5 } }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ height: { xs: "90px", sm: "130px" } }}>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <PlaylistAddCheckOutlinedIcon fontSize="medium" />
                    <Typography variant="subtitle1" fontWeight="bold">
                      Проекты
                    </Typography>
                  </Stack>

                  {partner?.projectCount && <Typography fontWeight={"bold"}>{partner?.projectCount}</Typography>}
                </Grid>
                <Divider
                  sx={{ ml: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2, width: { xs: "95%", sm: "90%" } }}
                />

                <Grid item xs={12} sx={{ height: { xs: "90px", sm: "130px" } }}>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <PaymentsOutlinedIcon fontSize="medium" />
                    <Typography variant="subtitle1" fontWeight="bold">
                      Гранты
                    </Typography>
                  </Stack>
                  {partner?.grant && (
                    <Typography fontWeight={"bold"}>{formatCurrencyWithSpaces(partner?.grant)}</Typography>
                  )}
                </Grid>
                <Divider
                  sx={{ ml: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2, width: { xs: "95%", sm: "90%" } }}
                />

                <Grid item xs={12} sx={{ height: { xs: "90px", sm: "130px" } }}>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <LocalAtmOutlinedIcon fontSize="medium" />
                    <Typography variant="subtitle1" fontWeight="bold">
                      Кредиты
                    </Typography>
                  </Stack>

                  {partner?.credit && (
                    <Typography fontWeight={"bold"}>{formatCurrencyWithSpaces(partner?.credit)}</Typography>
                  )}
                </Grid>
                <Divider
                  sx={{
                    ml: 2,
                    borderColor: Colors.darkBlue,
                    borderBottomWidth: 2,
                    width: { xs: "95%", sm: "90%" },
                    display: { xs: "block", sm: "none" },
                  }}
                />
              </Grid>
            </Box>
          </Stack>

          <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <PhoneIcon fontSize="medium" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Контакты
                </Typography>
              </Stack>

              {partner?.mobilePhone && <Typography fontWeight={"bold"}>{partner?.mobilePhone}</Typography>}
              {partner?.fixedPhone && <Typography fontWeight={"bold"}>{partner?.fixedPhone}</Typography>}
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <LocationOnIcon fontSize="medium" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Адрес
                </Typography>
              </Stack>
              {partner?.address && <Typography fontWeight={"bold"}>{partner?.address}</Typography>}
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <InsertLinkOutlinedIcon fontSize="medium" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Ссылки
                </Typography>
              </Stack>

              {partner?.website && (
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography sx={{ maxWidth: "320px", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {partner?.website}
                  </Typography>
                  <IconButton disabled={!formatAndValidateUrl(partner?.website)} sx={{ width: 32, height: 32 }}>
                    <a href={formatAndValidateUrl(partner?.website) ?? "#"} target="_blank" rel="noreferrer">
                      <OpenInNewIcon fontSize="medium" />
                    </a>
                  </IconButton>
                </Stack>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  ) : (
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
      <CircularProgress />
    </Box>
  );
};

export default ShowPartner;
