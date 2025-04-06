import React from "react";
import { Avatar, Tooltip } from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";

interface Base64AvatarProps {
  base64String: string;
  alt?: string;
  size?: number;
}
export const Base64Avatar: React.FC<Base64AvatarProps> = ({ base64String, alt = "Avatar", size = 40 }) => {
  const isValidBase64 = (str: string) => {
    try {
      return Buffer.from(str, "base64").toString("base64") === str;
    } catch (e) {
      return false;
    }
  };

  if (!base64String || !isValidBase64(base64String)) {
    return (
      <Tooltip title="No image available">
        <Avatar sx={{ width: size, height: size }}>
          <PersonIcon />
        </Avatar>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={`${alt}`}>
      <Avatar src={`data:image/jpeg;base64,${base64String}`} alt={alt} sx={{ width: size, height: size }} />
    </Tooltip>
  );
};
