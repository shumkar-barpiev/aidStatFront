"use client";

import React from "react";
import { containerMargins, containerWidths } from "@/utils/constants";
import { Box } from "@mui/material";
import FeedbackForm from "@/components/feedback/FeedbackForm";

const Main = () => {
  return (
    <Box
      sx={{
        width: containerWidths,
        mx: containerMargins,
        p: {
          xs: 0,
          sm: 3,
          md: 4,
        },
      }}
    >
      <FeedbackForm />
    </Box>
  );
};

export default Main;