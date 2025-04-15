import React from "react";
import { Avatar, CardMedia, Tooltip } from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";

interface Base64AvatarProps {
  base64String: string;
  alt?: string;
  size?: number;
}
export const Base64Avatar: React.FC<Base64AvatarProps> = ({ base64String, alt = "Avatar", size = 50 }) => {
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
      <Avatar
        src={`data:image/jpeg;base64,${base64String}`}
        alt={alt}
        sx={{
          width: size,
          height: size,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.45)",
          "& .MuiAvatar-img": {
            objectFit: "contain",
          },
        }}
      />
    </Tooltip>
  );
};

export const getPartnerAvatar = (name: string, image: string | null, size: number = 20) => {
  if (!image) {
    const initials = name ? name.substring(0, 2).toUpperCase() : "";

    return (
      <Tooltip key={name} title={`${name}`}>
        <Avatar sx={{ width: "auto", height: size, backgroundColor: "blue" }}>{initials}</Avatar>
      </Tooltip>
    );
  }

  return <Base64Avatar key={name} base64String={`${image ?? ""}`} alt={name} size={size} />;
};

export const getAvatarAsCardMedia = (name: string, image: string | null, size: number = 20) => {
  if (!image) {
    const initials = name ? name.substring(0, 2).toUpperCase() : "";

    return (
      <Tooltip key={name} title={`${name}`}>
        <Avatar sx={{ width: "auto", height: size, backgroundColor: "blue" }}>{initials}</Avatar>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={name}>
      <CardMedia
        component="img"
        image={`data:image/jpeg;base64,${image}`}
        alt={name}
        sx={{
          width: size,
          height: size,
          objectFit: "contain",
        }}
      />
    </Tooltip>
  );
};
