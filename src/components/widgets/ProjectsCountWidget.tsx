'use client'

import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

interface StatWidgetProps {
  content: React.ReactNode;
  label: string;
  value: number;
  duration?: number;
}

export const StatWidget = ({ content, label, value, duration = 1500 }: StatWidgetProps) => {
  const [currentValue, setCurrentValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateValue(0, value, duration);
        }
      },
      { threshold: 0.6 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [value, duration]);

  const animateValue = (start: number, end: number, duration: number) => {
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCurrentValue(Math.floor(progress * (end - start) + start));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <Box
      ref={ref}
      sx={{
        textAlign: "center",
        p: 4,
        borderRadius: 4,
        boxShadow: 3,
        minWidth: 200,
      }}
    >
      {content}
      <Typography variant="h4" fontWeight={700} color="primary.main">
        {currentValue.toLocaleString()}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
};