"use client";

import React from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import TelegramIcon from "../../../public/assets/images/icons/social-media-icons/telegram.png";
import WhatsAppIcon from "../../../public/assets/images/icons/social-media-icons/whatsapp.png";
import FacebookIcon from "../../../public/assets/images/icons/social-media-icons/facebook.png";
import Image from "next/image";

export const ShareButtons = () => {
  const url = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const text = encodeURIComponent("Интересная ссылка — загляни:");

  const shareLinks = {
    telegram: `https://t.me/share/url?url=${url}&text=${text}`,
    whatsapp: `https://api.whatsapp.com/send?text=${text}%20${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  };

  return (
    <Box my={3}>
      <Typography variant="subtitle1" gutterBottom>
        Поделиться в соцсетях:
      </Typography>

      <Box display="flex" gap={1} alignItems="center">
        <Tooltip title="Поделиться в Telegram">
          <IconButton
            component="a"
            href={shareLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          >
            <Image src={TelegramIcon} alt="telegram-icon" width={50} height={50} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Поделиться в WhatsApp">
          <IconButton
            component="a"
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            color="success"
          >
            <Image src={WhatsAppIcon} alt="whatsapp-icon" width={50} height={50} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Поделиться в Facebook">
          <IconButton component="a" href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" color="info">
            <Image src={FacebookIcon} alt="facebook-icon" width={50} height={50} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
