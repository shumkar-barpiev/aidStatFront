"use client";

import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  Divider,
  Tooltip,
  CardMedia,
  IconButton,
  Typography,
  CardContent,
} from "@mui/material";
import Colors from "@/styles/colors";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect, useRef } from "react";
import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { useProjectsViewModel } from "@/viewmodels/projects/useProjectsViewModel";
import { containerMargins, containerWidths, NAVBAR_HEIGHT } from "@/utils/constants";

const convertToRussianDateFormat = (date: string | undefined) => {
  if (!date) return;

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("ru-RU", options).format(new Date(date));
};

export default function MainPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { projects } = useProjectsViewModel();
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

    return () => {
      window.scrollTo(0, 0);
    };
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
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
          <Typography variant="h4" fontWeight="bold" sx={{ my: 1, textAlign: "left" }}>
            {t("projects")}
          </Typography>
          <Button
            startIcon={<ReadMoreOutlinedIcon fontSize="large" sx={{ color: "inheir" }} />}
            onClick={() => router.push("/projects", { scroll: false })}
            sx={{
              backgroundColor: "white",
              color: Colors.darkBlue,
              "&:hover": { color: "white", backgroundColor: Colors.darkBlue },
            }}
          >
            {t("showAll")}
          </Button>
        </Stack>
        <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
        <Grid container spacing={3}>
          {projects.slice(0, 4).map((project, index) => {
            return (
              <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                <Card
                  sx={{
                    height: "282px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: "20px",
                    borderRadius: "0px",
                    overflow: "hidden",
                    backgroundColor: "#F0F4F7",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#e6ecf0",
                      boxShadow: 6,
                      transform: "translateY(-5px)",
                      cursor: "pointer",
                    },
                  }}
                >
                  {project?.sectors ? (
                    <Typography key={index} variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {project?.sectors?.map((sector: Record<string, any>, index: number) => {
                        return sector.name;
                      })}
                    </Typography>
                  ) : (
                    <Box></Box>
                  )}

                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 550,
                      fontFamily: "sans-serif",
                      fontSize: "1.25rem",
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      textOverflow: "ellipsis",

                      "&:hover": {
                        color: "#2E4B6D",
                        transition: "color 0.3s ease",
                      },
                    }}
                  >
                    {project?.name}
                  </Typography>

                  <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Stack direction={"column"} alignItems={"left"}>
                      <Typography variant="body2" sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                        {t("endDate")}:
                      </Typography>
                      <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
                        {project.endDate && convertToRussianDateFormat(project.endDate)}
                      </Typography>
                    </Stack>

                    <Tooltip title={t("more")}>
                      <IconButton sx={{ border: `1px solid ${Colors.darkBlue}` }}>
                        <ArrowForwardOutlinedIcon sx={{ color: `${Colors.darkBlue}` }} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Box sx={{ mt: 2 }}>
          <Card sx={{ display: "flex", maxWidth: 1, pl: 1, bgcolor: "#F3F2F8" }}>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", p: 2, width: "100%" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" sx={{ fontWeight: "bold" }}>
                  {t("aidStatInfoTitle")}
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", textAlign: "justify" }}>
                  {t("aidStatInfoDescription")}
                </Typography>
                <Button size="small" endIcon={<ArrowForwardOutlinedIcon />} sx={{ mt: 1 }}>
                  {t("more")}
                </Button>
              </CardContent>
            </Box>
            <CardMedia
              sx={{ width: { xs: 600, sm: 650, md: 700, lg: 750, xl: 800 }, height: 350, objectFit: "contain" }}
              image="/assets/images/pages/main-page-1.jpg"
              title="green iguana"
            />
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
