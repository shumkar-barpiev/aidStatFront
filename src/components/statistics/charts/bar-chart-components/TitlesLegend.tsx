import React from "react";
import { Box, Tooltip, Typography } from "@mui/material";

interface Props {
  names: string[];
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  mainBarColors: string[];
  truncateLabel: (label: string) => string;
}

const TitlesLegend: React.FC<Props> = ({ names, hoveredIndex, setHoveredIndex, mainBarColors, truncateLabel }) => {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1.5, mb: 2, minHeight: "80px" }}>
      {names.map((title: string, index: number) => {
        const barOpacity = hoveredIndex === null || hoveredIndex === index ? 1 : 0.5;
        return (
          <Box
            key={title}
            sx={{ display: "flex", alignItems: "start", opacity: barOpacity }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: title === "Другие" ? "#9e9e9e" : mainBarColors[index],
                borderRadius: "50%",
                mr: 1,
              }}
            />
            <Tooltip
              title={title}
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "white",
                    color: names[index] === "Другие" ? "#9e9e9e" : mainBarColors[index],
                    fontWeight: "500",
                    fontSize: "0.85rem",
                    p: 1,
                    border: `1px solid ${names[index] === "Другие" ? "#9e9e9e" : mainBarColors[index]}`,
                  },
                },
              }}
            >
              <Typography variant="body2">{truncateLabel(title)}</Typography>
            </Tooltip>
          </Box>
        );
      })}
    </Box>
  );
};

export default TitlesLegend;
