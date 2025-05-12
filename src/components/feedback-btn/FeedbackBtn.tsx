"use client";

import { Fab, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { useMediaQueryWithSsr } from "@/hooks/useMediaQuery";
import { useRouter } from "next/navigation";

export const FeedbackBtn = () => {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState<boolean>(false);
  const { matches: isDesktop, mounted } = useMediaQueryWithSsr("md");
  const router = useRouter();

  const handleClick = () => {
    router.push("/feedback");
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !mounted) return null;

  return (
    <Tooltip title={t("ui.feedbackBtnLabel")} arrow>
      <Fab
        color="primary"
        variant={isDesktop ? "extended" : "circular"}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 15,
          zIndex: 1000,
          backgroundColor: (theme) => theme.palette.primary.main,
          "&:hover": { backgroundColor: (theme) => theme.palette.primary.main[500] },
        }}
        onClick={handleClick}
      >
        <FeedbackIcon sx={{ mr: isDesktop ? 1 : 0 }} />
        {isDesktop && t("ui.feedbackBtnLabel")}
      </Fab>
    </Tooltip>
  );
};
