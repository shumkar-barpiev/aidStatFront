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
            alignItems={"center"}
            spacing={3}
            sx={{ mb: 2, justifyContent: "space-between", pr: 3 }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1rem", sm: "1.5rem" },
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
                <CardMedia
                  component="img"
                  alt={partner?.name}
                  image={`data:image/png;base64,${partner?.image}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              )}
            </Box>
          </Stack>
          <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <PlaylistAddCheckOutlinedIcon fontSize="small" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Проекты
                </Typography>
              </Stack>

              {partner?.projectCount && <Typography>{partner?.projectCount}</Typography>}
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <PaymentsOutlinedIcon fontSize="small" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Гранты
                </Typography>
              </Stack>
              {partner?.grant && <Typography>{partner?.grant}</Typography>}
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <LocalAtmOutlinedIcon fontSize="small" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Кредиты
                </Typography>
              </Stack>

              {partner?.credit && <Typography>{partner?.credit}</Typography>}
            </Grid>
          </Grid>
          <Divider sx={{ my: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
          <Typography variant="subtitle1" fontWeight="bold">
            Описание
          </Typography>
          {partner?.description && <CollapsibleText header="Описание" text={partner?.description} maxChars={1000} />}
          <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <PhoneIcon fontSize="small" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Контакты
                </Typography>
              </Stack>

              {partner?.mobilePhone && <Typography>{partner?.mobilePhone}</Typography>}
              {partner?.fixedPhone && <Typography>{partner?.fixedPhone}</Typography>}
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Адрес
                </Typography>
              </Stack>
              {partner?.address && <Typography>{partner?.address}</Typography>}
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <InsertLinkOutlinedIcon fontSize="small" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Ссылки
                </Typography>
              </Stack>

              {partner?.website && (
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography>{partner?.website}</Typography>
                  <IconButton disabled={!formatAndValidateUrl(partner?.website)} sx={{ width: 32, height: 32 }}>
                    <a href={formatAndValidateUrl(partner?.website) ?? "#"} target="_blank" rel="noreferrer">
                      <OpenInNewIcon fontSize="small" />
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
