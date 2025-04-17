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
import DownloadIcon from "@mui/icons-material/Download";
import GridViewIcon from "@mui/icons-material/GridView";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { containerWidths, containerMargins } from "@/utils/constants";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useDocumentsViewModel } from "@/viewmodels/documents/useDocumentsViewModel";

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

  return (
    <Box sx={{ width: containerWidths, mx: containerMargins, p: 2 }}>
      <Box>
        <Box display="flex" justifyContent="space-between" mb={2} sx={{ alignItems: "center", gap: 3 }}>
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

        <Divider sx={{ mb: 2, borderColor: Colors.darkBlue, borderBottomWidth: 2 }} />
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
                          sx={{ px: 3, pt: 2 }}
                        >
                          <Box>
                            <Typography variant="subtitle1" fontWeight={550} gutterBottom noWrap>
                              {doc.name}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" gutterBottom>
                              {doc.documentType.toUpperCase()} | {doc.documentSize}
                            </Typography>
                          </Box>

                          {getFileVisual(doc.documentType)}
                        </Stack>
                        <Box sx={{ px: 3 }}>
                          {doc.description && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              {doc.description}
                            </Typography>
                          )}

                          <Box py={2}>
                            <Button
                              fullWidth
                              variant="outlined"
                              startIcon={<DownloadIcon />}
                              onClick={() => {
                                downloadDocument(doc.documentId);
                              }}
                            >
                              {t("download")}
                            </Button>
                          </Box>
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
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <Box mr={2}>{getFileVisual(doc.documentType)}</Box>
                      <ListItemText
                        primary={doc.name}
                        secondary={`${doc.documentType.toUpperCase()} | ${doc.documentSize}`}
                      />
                    </Box>

                    <Button
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      onClick={() => {
                        downloadDocument(doc.documentId);
                      }}
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
