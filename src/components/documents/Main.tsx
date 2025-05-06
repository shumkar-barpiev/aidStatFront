"use client";

import {
  Box,
  Card,
  Grid,
  List,
  Stack,
  Button,
  Divider,
  ListItem,
  Typography,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Colors from "@/styles/colors";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ListIcon from "@mui/icons-material/List";
import ImageIcon from "@mui/icons-material/Image";
import FolderIcon from "@mui/icons-material/Folder";
import GridOnIcon from "@mui/icons-material/GridOn";
import ArticleIcon from "@mui/icons-material/Article";
import { RenderEllipsisText } from "@/utils/textUtils";
import DownloadIcon from "@mui/icons-material/Download";
import GridViewIcon from "@mui/icons-material/GridView";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { containerWidths, containerMargins } from "@/utils/constants";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useDocumentsViewModel } from "@/viewmodels/documents/useDocumentsViewModel";

import Image from "next/image";

enum DocumentsView {
  LIST = "LIST",
  GRID = "GRID",
}

export const Main = () => {
  const { t } = useTranslation();
  const { allDocuments, downloadDocument } = useDocumentsViewModel();
  const [view, setView] = useState<DocumentsView>(DocumentsView.GRID);

  const handleViewChange = (_event: React.MouseEvent<HTMLElement>, nextView: DocumentsView | null) => {
    if (nextView) setView(nextView);
  };

  const getFileVisual = (type: string) => {
    const baseType = type.split("/")[1] || type;

    switch (baseType.toLowerCase()) {
      case "pdf":
        return <PictureAsPdfIcon sx={{ fontSize: 64, color: "#d32f2f" }} />;
      case "png":
      case "jpg":
      case "jpeg":
        return <ImageIcon sx={{ fontSize: 64, color: "#1976d2" }} />;
      case "doc":
      case "docx":
        return <ArticleIcon sx={{ fontSize: 64, color: "#512da8" }} />;
      case "xls":
      case "xlsx":
        return <GridOnIcon sx={{ fontSize: 64, color: "#388e3c" }} />;
      default:
        return <InsertDriveFileIcon sx={{ fontSize: 64, color: "#607d8b" }} />;
    }
  };

  const getFileExtensionFromMime = (mimeType: string): string => {
    const map: Record<string, string> = {
      "application/pdf": "pdf",
      "image/png": "png",
      "image/jpeg": "jpg",
      "image/jpg": "jpg",
      "application/msword": "doc",
      "application/vnd.ms-excel": "xls",
      "application/vnd.ms-powerpoint": "ppt",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
    };

    return map[mimeType.toLowerCase()] || "";
  };

  return (
    <Box sx={{ width: containerWidths, mx: containerMargins, px: 2, mb: 2 }}>
      <Stack
        alignItems={"center"}
        direction={{ xs: "column", sm: "column", md: "row", lg: "row", xl: "row" }}
        spacing={3}
        sx={{
          width: "85%",
          mx: "auto",
          height: { xs: "50vh", sm: "50vh", md: "auto" },
          color: Colors.darkBlue,
          pt: 5,
          mb: 6,
        }}
        justifyContent={{ xs: "center", sm: "center", md: "space-between", lg: "space-between" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", sm: "center", md: "flex-start" },
            textAlign: { xs: "center", sm: "center", md: "left" },
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              maxWidth: { xs: "100%", md: "90%" },
              fontSize: { xs: "2rem", md: "3rem" },
              mt: { xs: 3, md: 0 },
            }}
          >
            {t("documentsPageTitle")}
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            gutterBottom
            sx={{ maxWidth: "100%", fontSize: { xs: "0.85rem", md: "1rem" } }}
          >
            {t("documentsPageDescription")}
          </Typography>
        </Box>

        <Box sx={{ position: "relative", width: "100%", maxWidth: "350px", height: "auto", aspectRatio: "1" }}>
          <Image
            fill
            alt="Project1"
            style={{ objectFit: "cover" }}
            src="/assets/images/pages/documents-page-1.png"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            priority
          />
        </Box>
      </Stack>

      <Box>
        <Box display="flex" justifyContent="space-between" mb={3} sx={{ alignItems: "center", gap: 3 }}>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <FolderIcon fontSize="large" sx={{ color: Colors.darkBlue }} />
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                color: Colors.darkBlue,
                maxWidth: "100%",
              }}
            >
              {t("documentsPage")}
            </Typography>
          </Stack>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            sx={{
              backgroundColor: "#f5f5f5",
              height: "30px",
              "& .MuiToggleButton-root": {
                border: "none",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
                "&.Mui-selected": {
                  backgroundColor: Colors.darkBlue,
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: Colors.darkBlue,
                  },
                },
              },
            }}
          >
            <ToggleButton value={DocumentsView.GRID}>
              <GridViewIcon sx={{ color: view === DocumentsView.GRID ? "#fff" : Colors.darkBlue }} fontSize="medium" />
            </ToggleButton>
            <ToggleButton value={DocumentsView.LIST}>
              <ListIcon sx={{ color: view === DocumentsView.LIST ? "#fff" : Colors.darkBlue }} fontSize="medium" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Divider sx={{ mb: 4, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
        {allDocuments?.length > 0 ? (
          <Box>
            {view === DocumentsView.GRID ? (
              <Grid container spacing={2}>
                {allDocuments.map((doc) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} key={doc.id}>
                      <Card
                        sx={{
                          borderRadius: 2,
                          boxShadow: 3,
                          transition: "0.3s",
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                          "&:hover": { boxShadow: 6 },
                        }}
                      >
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                          sx={{ width: 1, px: 3, pt: 2 }}
                        >
                          <Box sx={{ width: "80%" }}>
                            <Typography variant="subtitle1" fontWeight={550} gutterBottom>
                              <RenderEllipsisText text={doc.name} maxWidth={"100%"} />
                            </Typography>

                            <Typography variant="body1" color="text.secondary" gutterBottom>
                              {getFileExtensionFromMime(doc.documentType).toUpperCase()} | {doc.documentSize}
                            </Typography>
                          </Box>

                          {getFileVisual(getFileExtensionFromMime(doc.documentType))}
                        </Stack>

                        <Box sx={{ px: 3, flexGrow: 1 }}>
                          {doc.description && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              {doc.description}
                            </Typography>
                          )}
                        </Box>

                        <Box sx={{ px: 3, pt: 2, pb: 3 }}>
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<DownloadIcon />}
                            onClick={() => downloadDocument(doc, getFileExtensionFromMime(doc.documentType))}
                          >
                            {t("download")}
                          </Button>
                        </Box>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <List>
                {allDocuments.map((doc) => (
                  <ListItem
                    key={doc.id}
                    sx={{
                      border: "1px solid lightgray",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <Box mr={2}>{getFileVisual(getFileExtensionFromMime(doc.documentType))}</Box>
                      <ListItemText
                        primary={doc.name}
                        secondary={`${getFileExtensionFromMime(doc.documentType).toUpperCase()} | ${doc.documentSize}`}
                        primaryTypographyProps={{ style: { fontWeight: 550 } }}
                      />
                    </Box>

                    <Button
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      onClick={() => downloadDocument(doc, getFileExtensionFromMime(doc.documentType))}
                    >
                      {t("download")}
                    </Button>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        ) : (
          <Box>no file</Box>
        )}
      </Box>
    </Box>
  );
};
