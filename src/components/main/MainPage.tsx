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
import { RenderEllipsisText } from "@/utils/textUtils";
import React, { useState, useEffect, useRef } from "react";
import { useProjectsStore } from "@/stores/projects/projects";
import { TProjectModel } from "@/models/project/ProjectModel";
import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";
import { plainBtnStyle } from "@/components/navigation-bar/NavigationBar";
import { NotSpecifiedText } from "@/components/projects/show/ShowProject";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { useProjectsViewModel } from "@/viewmodels/projects/useProjectsViewModel";
import { containerMargins, containerWidths, NAVBAR_HEIGHT } from "@/utils/constants";
import { StatsSection } from "@/components/widgets/StatsSection";

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
  const projectsStore = useProjectsStore();
  const boxRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState<boolean>(false);
  const { getProjectSectorsTitle } = useProjectsViewModel();

  useEffect(() => {
    setIsClient(true);

    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  if (!isClient) return null;

  return (
    <Box>
      <Box
        sx={{
          mt: `${NAVBAR_HEIGHT}px`,
          position: "relative",
          width: "100%",
          height: `calc(100dvh - ${NAVBAR_HEIGHT}px)`,
          backgroundImage: `url(/assets/images/pages/main-page-1-version-2.png)`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom center",
          display: "flex",
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
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        />
        <Box
          sx={{
            mt: 24,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
            color: "white",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{
              maxWidth: "60%",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              textShadow: "2px 1px 2px rgba(0, 0, 0, 1)",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
            }}
          >
            {t("mainPage.heroSectionTitle")}
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{
              width: "90%",
              textShadow: "2px 1px 2px rgba(0, 0, 0, 0.7)",
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
            }}
          >
            {t("mainPage.heroSectionDescription")}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => {
              router.push("/projects");
            }}
          >
            {t("mainPage.goToProjectsBtn")}
          </Button>
        </Box>
      </Box>

      <Box ref={boxRef} sx={{ width: containerWidths, mx: containerMargins, p: 2, minHeight: "100vh" }}>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ textAlign: "left" }}>
            {t("mainPage.projectsBlockTitle")}
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
            {t("common.showAll")}
          </Button>
        </Stack>
        <Divider sx={{ mb: 4, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
        <Grid container spacing={3}>
          {projectsStore.items &&
            projectsStore.items.slice(0, 4).map((project: TProjectModel, index) => {
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
                      <Typography key={index} variant="subtitle1" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                        <RenderEllipsisText text={t(getProjectSectorsTitle(project.sectors ?? []))} />
                      </Typography>
                    ) : (
                      <NotSpecifiedText />
                    )}

                    <button
                      onClick={() => {
                        router.push(`/projects/show/${project.name}#${project.id}`);
                      }}
                      style={plainBtnStyle}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          textAlign: "left",
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
                    </button>

                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                      <Stack direction={"column"} alignItems={"left"}>
                        <Typography variant="body2" sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                          {t("common.endDate")}:
                        </Typography>
                        <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
                          {project.endDate && convertToRussianDateFormat(project.endDate)}
                        </Typography>
                      </Stack>

                      <Tooltip title={t("common.more")}>
                        <IconButton
                          sx={{ border: `1px solid ${Colors.darkBlue}` }}
                          onClick={() => {
                            router.push(`/projects/show/${project.name}#${project.id}`);
                          }}
                        >
                          <ArrowForwardOutlinedIcon sx={{ color: `${Colors.darkBlue}` }} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Card>
                </Grid>
              );
            })}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Card
            sx={{
              display: "flex",
              maxWidth: 1,
              bgcolor: "#F0F4F7",
              alignItems: "stretch",
              flexDirection: { xs: "column-reverse", sm: "column-reverse", md: "row" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: 2,
                width: "100%",
                minHeight: { xs: 250, sm: 300, md: 350 },
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" sx={{ fontWeight: "bold" }}>
                  {t("mainPage.mainBlockTitle")}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitLineClamp: 5,
                    textAlign: "justify",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {t("mainPage.mainBlockDescription")}
                </Typography>
                <Button
                  size="small"
                  endIcon={<ArrowForwardOutlinedIcon />}
                  sx={{ mt: 1 }}
                  onClick={() => {
                    router.push("/contacts");
                  }}
                >
                  {t("common.more")}
                </Button>
              </CardContent>
            </Box>

            <CardMedia
              component="img"
              image="/assets/images/pages/main-page-2.png"
              alt="Main Page"
              sx={{
                width: { xs: "100%", sm: "100%", md: 600, lg: 750, xl: 800 },
                height: { xs: 250, sm: 300, md: 350 },
                objectFit: "contain",
                pt: 1,
              }}
            />
          </Card>
        </Box>
        <StatsSection />
      </Box>
    </Box>
  );
}
