"use client";
import { Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

export const RenderEllipsisText = ({
  text,
  maxWidth = "100%",
  tooltipPlacement = "top",
}: {
  text: string | undefined;
  maxWidth?: string | number;
  tooltipPlacement?: "top" | "bottom" | "left" | "right";
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsOverflowed(el.scrollWidth > el.clientWidth);
    }
  }, [text]);

  if (text === undefined) return null;

  const content = (
    <div
      ref={textRef}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        display: "block",
        maxWidth,
        cursor: isOverflowed ? "pointer" : "default",
      }}
    >
      {text}
    </div>
  );

  return isOverflowed ? (
    <Tooltip title={text} placement={tooltipPlacement} enterDelay={500} arrow>
      {content}
    </Tooltip>
  ) : (
    content
  );
};
