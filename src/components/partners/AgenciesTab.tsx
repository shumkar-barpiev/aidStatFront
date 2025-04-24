"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import AgenciesList from "@/components/partners/agencies/AgenciesList";
import Colors from "@/styles/colors.ts";
import Image from "next/image";

const AgenciesTab = () => {
  return (
    <Box>
      <Stack
        alignItems={"center"}
        direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
        spacing={3}
        sx={{
          width: "100%",
          mx: "auto",
          height: { xs: "50vh", sm: "50vh", md: "auto" },
          color: Colors.darkBlue,
          mb: 3,
        }}
        justifyContent={{ xs: "center", sm: "center", md: "space-between", lg: "space-between" }}
      >
        <Box sx={{ position: "relative", width: "auto", height: { xs: "100%", md: "350px" }, aspectRatio: "1" }}>
          <Image
            fill
            alt="Project1"
            style={{ objectFit: "cover" }}
            src="/assets/images/pages/agencies-page-1.png"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
            priority
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", sm: "center", md: "flex-start" },
            textAlign: { xs: "center", sm: "center", md: "left" },
            paddingBottom: "50px",
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              maxWidth: { xs: "100%", md: "90%" },
              color: Colors.darkBlue,
            }}
          >
            Агентства
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            gutterBottom
            sx={{ maxWidth: "100%", color: Colors.darkBlue }}
          >
            Здесь представлена информация об исполнительных агентствах, участвующих в реализации проектов и программ, а
            также об их вкладе в устойчивое развитие и повышение эффективности проводимых инициатив.
          </Typography>
        </Box>
      </Stack>
      <AgenciesList />
    </Box>
  );
};

export default AgenciesTab;
