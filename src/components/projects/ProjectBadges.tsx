import * as React from "react";
import { Chip, Box } from "@mui/material/";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircle from "@mui/icons-material/CheckCircle";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

interface ProjectBadgesProps {
  status: "In progress" | "Completed" | "Not started" | "Canceled";
}

export default function ProjectBadges({ status }: ProjectBadgesProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-start", my: 1 }}>
      {status === "In progress" && (
        <Chip
          icon={<CachedOutlinedIcon fontSize="small" />}
          label="В процессе"
          color="primary"
          variant="outlined"
          sx={{
            fontWeight: "bold",
            borderWidth: 2,
          }}
        />
      )}
      {status === "Completed" && (
        <Chip
          icon={<CheckCircle fontSize="small" />}
          label="Завершено"
          color="success"
          sx={{
            fontWeight: "bold",
            borderWidth: 2,
          }}
        />
      )}
      {status === "Not started" && (
        <Chip
          icon={<HourglassEmptyIcon fontSize="small" />}
          label="Не начато"
          color="default"
          variant="outlined"
          sx={{
            fontWeight: "bold",
            borderWidth: 2,
          }}
        />
      )}
      {status === "Canceled" && (
        <Chip
          icon={<CancelIcon fontSize="small" />}
          label="Отменено"
          color="error"
          sx={{
            fontWeight: "bold",
            borderWidth: 2,
          }}
        />
      )}
    </Box>
  );
}
