import React from "react";
import { Typography } from "@mui/material";

interface Props {
  barOpacity: number;
  percentage: string;
}

const PercentageBar: React.FC<Props> = ({ barOpacity, percentage }) => {
  return (
    <Typography
      variant="caption"
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "0.65rem",
        color: "#fff",
        textAlign: "center",
        fontWeight: 500,
        opacity: barOpacity,
        textShadow: "0px 0px 4px rgba(0,0,0,0.5)",
      }}
    >
      {percentage}
    </Typography>
  );
};

export default PercentageBar;
