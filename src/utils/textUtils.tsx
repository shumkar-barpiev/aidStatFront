"use client";
import { Tooltip } from "@mui/material";

export const renderEllipsisText = (
  text: string | undefined,
  maxWidth: string | number = "100%",
  tooltipPlacement: "top" | "bottom" | "left" | "right" = "top"
) => {
  if (text == undefined) return null;

  return (
    <Tooltip title={text} placement={tooltipPlacement} enterDelay={500} arrow>
      <div
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          display: "block",
          maxWidth: maxWidth,
          cursor: "pointer",
        }}
      >
        {text}
      </div>
    </Tooltip>
  );
};
