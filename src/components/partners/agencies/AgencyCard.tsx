"use client";

import React, { useEffect, useRef } from "react";
import { Box, Typography, Grid, IconButton, Link, CircularProgress } from "@mui/material";
import Image from "next/image";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useAgenciesStore } from "@/stores/partners/agencies.ts";

const AgencyCard = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { agency, agencyLoading } = useAgenciesStore();

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  if (agencyLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!agency) {
    return <Box sx={{ p: 3 }}>Нет данных по этому агентству</Box>;
  }

  return (
    <Box
      ref={cardRef}
      sx={{
        mt: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} mt={1}>
              <Typography variant="body1" color="text.secondary">
                <strong>Website:</strong>
              </Typography>
              <Typography variant="body2" sx={{ pt: 0.5, fontSize: "1rem" }}>
                { agency.website ?
                  (<Link href={agency.website} target="_blank" color="primary" sx={{ pt: 0.5, fontSize: "1rem" }}>
                    {agency.website}
                  </Link>
                  ) : ("сайт не указан")
                }
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} mt={1}>
              <Typography variant="body1" color="text.secondary">
                <strong>Тел:</strong>
              </Typography>
              <Typography variant="body2" sx={{ pt: 0.5, fontSize: "1rem" }}>
                {agency.fixedPhone}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} mt={1}>
              <Typography variant="body1" color="text.secondary">
                <strong>Мобильный тел:</strong>
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  ml: 0,
                  pt: 0.5,
                  fontSize: "1rem",
                }}
              >
                {agency.mobilePhone || "номер не указан"}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} mt={1}>
              <Typography variant="body1" color="text.secondary">
                <strong>Адрес:</strong>
              </Typography>
              <Typography variant="body2" sx={{ pt: 0.5, fontSize: "1rem" }}>
                {agency.address || "Адрес не указан"}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} mt={1}>
              <Typography variant="body1" color="text.secondary">
                <strong>Количество проектов:</strong>
              </Typography>
              <Typography variant="body2" sx={{ pt: 0.5, fontSize: "1rem" }}>
                {agency.projectCount}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} mt={1}>
              <Typography variant="body1" color="text.secondary">
                <strong>Сумма грантов:</strong>
              </Typography>
              <Typography variant="body2" sx={{ pt: 0.5, fontSize: "1rem" }}>
                {agency.grant || 0}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} mt={1}>
              <Typography variant="body1" color="text.secondary">
                <strong>Сумма кредитов:</strong>
              </Typography>
              <Typography variant="body2" sx={{ pt: 0.5, fontSize: "1rem" }}>
                {agency.credit || 0}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Image
          src={`data:image/jpeg;base64,${agency.image}`}
          alt={`${agency.name} logo`}
          width={300}
          height={300}
          objectFit="contain"
          style={{ borderRadius: "8px" }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <IconButton color="primary" sx={{ borderRadius: "50%" }}>
          <ArrowDropUpIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AgencyCard;
