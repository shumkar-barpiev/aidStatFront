"use client";

import React from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export const ShareButtons = () => {
  const { t } = useTranslation();
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
        {t("ui.shareBtns.title")}:
      </Typography>

      <Box display="flex" gap={1} alignItems="center">
        <Tooltip title={t("ui.shareBtns.shareInTG")}>
          <IconButton
            component="a"
            href={shareLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          >
            <Image
              src="/assets/images/icons/social-media-icons/telegram.png"
              alt="telegram-icon"
              width={50}
              height={50}
            />
          </IconButton>
        </Tooltip>

        <Tooltip title={t("ui.shareBtns.shareInWA")}>
          <IconButton
            component="a"
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            color="success"
          >
            <Image
              src="/assets/images/icons/social-media-icons/whatsapp.png"
              alt="whatsapp-icon"
              width={50}
              height={50}
            />
          </IconButton>
        </Tooltip>

        <Tooltip title={t("ui.shareBtns.shareInFB")}>
          <IconButton component="a" href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" color="info">
            <Image
              src="/assets/images/icons/social-media-icons/facebook.png"
              alt="facebook-icon"
              width={50}
              height={50}
            />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
