"use client";

import React from "react";
import { TPartnerModel } from "@/models/partner/partner.ts";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AgencyCard from "@/components/partners/agencies/AgencyCard";
import Colors from "@/styles/colors.ts";

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
        borderBottom: "1px solid",
        borderColor: Colors.darkBlue,
        cursor: "pointer",
        transition: "all 0.1s ease-in-out",
      }}
    >
      <Box
        sx={{
          display: "flex",
          p: 2,
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.875rem",
          backgroundColor: "#fff",
          color: Colors.darkBlue,
          "&:hover": {
            backgroundColor: Colors.darkBlue,
            color: "#fff",
            boxShadow: 1,
            cursor: "pointer",
          },
        }}
      >
        <Typography
          sx={{
            width: `${isOpenId === item.id ? "100%" : "85%"}`,
            overflow: "hidden",
            whiteSpace: isOpenId === item.id ? "normal" : "nowrap",
            textOverflow: isOpenId === item.id ? "unset" : "ellipsis",
            overflowWrap: isOpenId === item.id ? "break-word" : "normal",
            wordBreak: isOpenId === item.id ? "break-word" : "normal",
            fontWeight: isOpenId === item.id ? 600 : 500,
            fontSize: isOpenId === item.id ? "1.5rem" : "0.875rem",
          }}
        >
          {item.name}
        </Typography>

        <Box sx={{ display: `${isOpenId === item.id ? "none" : "block"}`, width: "15%", textAlign: "right" }}>
          <IconButton size="small" sx={{ color: "inherit" }}>
            <ArrowDropDownIcon fontSize="large" sx={{ color: "inherit" }} />
          </IconButton>
        </Box>
      </Box>

      {isOpenId === item.id && <AgencyCard />}
    </Box>
  );
};

export default AgenciesListItem;
