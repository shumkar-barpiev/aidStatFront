"use client";
import { Box, List, ListItem, Divider, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import * as React from "react";

export function SuggestionList() {
  const suggestions: string[] = [
    "Предложить трансфер",
    "Предложить cтраховку",
    "Предложить VIP зал",
    "Предложить экскурсию",
    "Предложить дополнительные услуги",
    "Предложить скидку",
    "Предложить скидку",
    "Предложить скидку",
  ];

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
      <List
        sx={{
          width: "100%",
          maxHeight: 170,
          overflow: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          alignItems: "end",
          "&::-webkit-scrollbar": {
            width: "0.3em",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
          },
        }}
      >
        {suggestions.map((suggestion, index) => (
          <div key={index}>
            <ListItem sx={{ pl: 0, py: 0 }}>
              <InfoIcon
                sx={{
                  marginRight: 1,
                  fontSize: 20,
                  color: "secondary.light",
                }}
              />
              <Box sx={{ fontSize: 14, color: "#45464E", display: "flex", p: 1 }}>
                <Tooltip title={suggestion}>
                  <Typography
                    sx={{
                      overflow: "hidden",
                      width: "170px",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {suggestion}
                  </Typography>
                </Tooltip>
              </Box>
            </ListItem>
            <Divider component="div" />
          </div>
        ))}
      </List>
    </Box>
  );
}
