"use client";

import React from "react";
import { Avatar, Tooltip } from "@mui/material";
import { imageUrl } from "@/utils/constants.ts";

interface Props {
  item: {
    id: number;
    name?: string | null;
    image?: number | null;
  };
}

const AvatarListItem: React.FC<Props> = ({ item }) => (
  <Tooltip key={item.id} title={item.name}>
    <Avatar
      src={`${imageUrl}${item.image}`}
      alt={item.name || "Avatar"}
      sx={{
        width: 50,
        height: 50,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.45)",
        "& .MuiAvatar-img": {
          objectFit: "contain",
        },
      }}
    />
  </Tooltip>
);

export default AvatarListItem;
