"use client";

import Colors from "@/styles/colors";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect, useRef } from "react";
import { Card, Typography, Grid, Box, Button, Divider } from "@mui/material";
import { useMainPageViewModel } from "@/viewmodels/main-page/useMainPageViewModel";
import { containerMargins, containerWidths, NAVBAR_HEIGHT } from "@/utils/constants";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";

const convertToRussianDateFormat = (date: string | undefined) => {
  if (!date) return;

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("ru-RU", options).format(new Date(date));
};

export default function Home() {
  const { t } = useTranslation();
  const { projects } = useMainPageViewModel();
  const boxRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState<boolean>(false);

  const handleScrollToBox = () => {
    if (boxRef.current) {
      const yOffset = -NAVBAR_HEIGHT;
      const y = boxRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Box height={"100%"}>
      <Box
        sx={{
          mt: "-10px",
          position: "relative",
          width: "100%",
          height: "95vh",
          backgroundImage: `url(https://pce.sandiego.edu/wp-content/uploads/2023/02/GettyImages-1411195926-scaled.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        />
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "white",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{
              maxWidth: "60%",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            {t("mainPageText")}
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            gutterBottom
            sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)" }}
          >
            {t("mainPageDescription")}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleScrollToBox}>
            {t("mainPageBtn")}
          </Button>
        </Box>
      </Box>

      <Box ref={boxRef} sx={{ width: containerWidths, mx: containerMargins, p: 2, minHeight: "100vh" }}>
        <Typography variant="h4" fontWeight="bold" sx={{ my: 3, textAlign: "left" }}>
          {t("projects")}
        </Typography>
        <Divider sx={{ mb: 6, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} sx={{ height: "230px" }} key={project.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 2,

                  transition: "box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-5px)",
                    cursor: "pointer",
                  },
                }}
              >
                <Typography variant="subtitle1" color="textSecondary" sx={{ fontWeight: "bold" }}>
                  {project.sector}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    mt: 1,
                    display: "box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    textOverflow: "ellipsis",
                  }}
                >
                  {project.title}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
                  <Typography variant="body2" color="textSecondary" sx={{ whiteSpace: "nowrap" }}>
                    {t("deadline")}: {convertToRussianDateFormat(project.deadline)}
                  </Typography>
                </Box>
                <Button variant="outlined" endIcon={<ExpandCircleDownOutlinedIcon />} size="small">
                  {t("showMore")}
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
