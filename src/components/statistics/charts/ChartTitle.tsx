"use client";

import React from "react";
import { Typography } from "@mui/material";

interface Props {
  title: string;
}

const ChartTitle: React.FC<Props> = ({ title }) => {
  return (
    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
      {title}
    </Typography>
  );
};

export default ChartTitle;
