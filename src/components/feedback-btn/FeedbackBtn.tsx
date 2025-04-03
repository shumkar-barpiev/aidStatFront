import React from "react";

import { Fab, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { useMediaQueryWithSsr } from "@/hooks/useMediaQuery";

export const FeedbackBtn = () => {
  const { t } = useTranslation();
  const { matches: isDesktop, mounted } = useMediaQueryWithSsr("md");

  if (!mounted) return null;

  const handleClick = () => {
    console.log("Feedback button clicked!");
  };

  return (
    <Tooltip title={t("feedbackBtnLabel")} arrow>
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
        {isDesktop && t("feedbackBtnLabel")}
      </Fab>
    </Tooltip>
  );
};
