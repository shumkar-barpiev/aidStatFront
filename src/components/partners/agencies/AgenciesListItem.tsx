"use client";

import React from "react";
import { TPartnerModel } from "@/models/partner/partner.ts";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AgencyCard from "@/components/partners/agencies/AgencyCard";

interface Props {
  item: TPartnerModel;
  toggleOpen: (id: number) => void;
  isOpenId: number | null;
}

const AgenciesListItem: React.FC<Props> = ({ item, toggleOpen, isOpenId }) => {
  return (
    <Box
      key={item.id}
      onClick={() => toggleOpen(item.id)}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
        cursor: "pointer",
        transition: "all 0.1s ease-in-out",
        "&:hover": {
          boxShadow: 1,
          transform: "translateY(-3px)",
          cursor: "pointer",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.875rem",
        }}
      >
        <Typography
          sx={{
            width: "75%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "text.primary",
            fontWeight: `${isOpenId === item.id ? 600 : 500}`,
            fontSize: `${isOpenId === item.id ? "1.5rem" : "0.875rem"}`,
            mr: 2,
          }}
        >
          {item.name}
        </Typography>

        <Box sx={{ width: "25%", textAlign: "right" }}>
          <IconButton size="small" color="primary">
            {isOpenId === item.id ? null: <ArrowDropDownIcon />}
          </IconButton>
        </Box>
      </Box>

      {isOpenId === item.id && <AgencyCard />}
    </Box>
  );
};

export default AgenciesListItem;
