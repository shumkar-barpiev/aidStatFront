"use client";

import {
  Box,
  Card,
  Grid,
  List,
  Stack,
  ListItem,
  Typography,
  CardContent,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Colors from "@/styles/colors";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ListIcon from "@mui/icons-material/List";
import FolderIcon from "@mui/icons-material/Folder";
import GridViewIcon from "@mui/icons-material/GridView";
import { containerWidths, containerMargins } from "@/utils/constants";

import DescriptionIcon from "@mui/icons-material/Description";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ArticleIcon from "@mui/icons-material/Article";
import GridOnIcon from "@mui/icons-material/GridOn";

enum DocumentsView {
  LIST = "LIST",
  GRID = "GRID",
}

export const Main = () => {
  const documents = [
    {
      id: "1",
      name: "Project Proposal.pdf",
      type: "pdf",
      dateUploaded: "2025-04-14",
    },
    {
      id: "2",
      name: "SitePhoto.png",
      type: "image/png",
      dateUploaded: "2025-04-12",
      thumbnailUrl: "/images/site-photo.png",
    },
  ];

  const { t } = useTranslation();
  const [view, setView] = useState<DocumentsView>(DocumentsView.GRID);

  const handleViewChange = (_event: React.MouseEvent<HTMLElement>, nextView: DocumentsView | null) => {
    if (nextView) setView(nextView);
  };

  const getFileVisual = (type: string) => {
    const baseType = type.split("/")[1] || type;

    switch (baseType.toLowerCase()) {
      case "pdf":
        return <PictureAsPdfIcon sx={{ fontSize: 84, color: "#d32f2f" }} />;
      case "png":
      case "jpg":
      case "jpeg":
        return <ImageIcon sx={{ fontSize: 84, color: "#1976d2" }} />;
      case "doc":
      case "docx":
        return <ArticleIcon sx={{ fontSize: 84, color: "#512da8" }} />;
      case "xls":
      case "xlsx":
        return <GridOnIcon sx={{ fontSize: 84, color: "#388e3c" }} />;
      default:
        return <InsertDriveFileIcon sx={{ fontSize: 84, color: "#607d8b" }} />;
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

        {view === DocumentsView.GRID ? (
          <Grid container spacing={2}>
            {documents.map((doc) => (
              <Grid item xs={12} sm={6} md={4} key={doc.id}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height={160}
                    sx={{
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                  >
                    {getFileVisual(doc.type)}
                  </Box>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={500} gutterBottom noWrap>
                      {doc.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {doc.type.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Uploaded: {doc.dateUploaded}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <List>
            {documents.map((doc) => (
              <ListItem key={doc.id}>
                <Box display="flex" alignItems="center" mr={2}>
                  {getFileVisual(doc.type)}
                </Box>
                <ListItemText primary={doc.name} secondary={`Type: ${doc.type} | Uploaded: ${doc.dateUploaded}`} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};
