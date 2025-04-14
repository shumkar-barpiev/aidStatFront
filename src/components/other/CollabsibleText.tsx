"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import { Typography, Button, Box, Modal, Paper, IconButton, Tooltip, Stack } from "@mui/material";

interface CollapsibleTextProps {
  header: string;
  text: string;
  maxChars?: number;
}

export const CollapsibleText: React.FC<CollapsibleTextProps> = ({ header, text, maxChars = 300 }) => {
  const { t } = useTranslation();
  const isLong = text.length > maxChars;
  const [modalOpen, setModalOpen] = useState(false);
  const previewText = isLong ? text.slice(0, maxChars) + "…" : text;

  return (
    <>
      <Box sx={{ position: "relative", mb: 3 }}>
        <Typography variant="body1" color="text.primary" sx={{ textAlign: "justify", whiteSpace: "pre-line" }}>
          {previewText}
        </Typography>

        {isLong && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <Button
              onClick={() => setModalOpen(true)}
              size="small"
              startIcon={<AutoStoriesOutlinedIcon />}
              sx={{
                px: 1,
                py: 0.5,
                minHeight: 0,
                lineHeight: 1,
                fontSize: "0.75rem",
                textTransform: "none",
              }}
            >
              {t("more")}
            </Button>
          </Box>
        )}
      </Box>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          p: 2,
        }}
      >
        <Paper
          sx={{
            width: "100%",
            maxWidth: { xs: "90%", sm: "90%", md: "80%", lg: "70%" },
            maxHeight: "80vh",
            position: "relative",
            p: 3,
            overflow: "hidden",
          }}
        >
          <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} mb={1}>
            <Typography variant="h6" fontWeight="bold">
              {header}
            </Typography>
            <Tooltip title={t("close")} arrow>
              <IconButton
                onClick={() => setModalOpen(false)}
                sx={{
                  zIndex: 2,
                }}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          <Box
            sx={{
              overflowY: "auto",
              maxHeight: "calc(80vh - 60px)",
              pb: 4,
              pr: 1,
            }}
          >
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                textAlign: "justify",
                whiteSpace: "pre-line",
              }}
            >
              {text}
            </Typography>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};
