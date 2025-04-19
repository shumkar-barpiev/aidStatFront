"use client";

import React, { useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import AgenciesList from "@/components/partners/agencies/AgenciesList";
import Colors from "@/styles/colors.ts";
import MoveDownOutlinedIcon from "@mui/icons-material/MoveDownOutlined";
import { NAVBAR_HEIGHT } from "@/utils/constants.ts";

const AgenciesTab = () => {

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: { xs: "center", sm: "center", md: "flex-start" },
          textAlign: { xs: "center", sm: "center", md: "left" },
          paddingBottom: "50px"
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
          }}
        >
          Агентства
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ maxWidth: "100%" }}>
          Здесь представлена информация об исполнительных агентствах, участвующих в реализации проектов и
          программ, а также об их вкладе в устойчивое развитие и повышение эффективности проводимых инициатив.
        </Typography>
      </Box>
      <AgenciesList />
    </Box>
  );
};

export default AgenciesTab;
