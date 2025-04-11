"use client";

import { Table, Paper, Button, TableRow, TableBody, TableCell, Typography, TableContainer } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DownloadIcon from "@mui/icons-material/Download";
import { useProjectsStore } from "@/stores/projects/projects";

export const ProjectDocuments = () => {
  const { t } = useTranslation();
  const projectStore = useProjectsStore();
  const [documents, setDocuments] = useState<Record<string, any>[]>([]);

  const handleDownload = (doc: Record<string, any>) => {
    projectStore.fetchDocument(doc.id, (data: any) => {
      console.log("here");
      downloadFileFromBinary(data, doc.name);
    });
  };

  const downloadFileFromBinary = (binaryData: BlobPart, fileName: string) => {
    const blob = new Blob([binaryData], { type: "application/octet-stream" });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);
  };

  useEffect(() => {
    if (projectStore.item?.id) {
      projectStore.fetchProjectDocuments(projectStore.item.id, (data: Record<string, any>[]) => {
        if (data?.length > 0) setDocuments(data);
      });
    }
  }, [projectStore.item]);

  if (documents.length === 0) {
    return <Typography>{t("noDocumentsAvailable")}</Typography>;
  }

  return (
    documents && (
      <TableContainer component={Paper} elevation={1}>
        <Table sx={{ minWidth: 400 }} aria-label="documents table">
          <TableBody>
            {documents?.map((doc) => (
              <TableRow key={doc.id} sx={{ height: "40px" }}>
                <TableCell>
                  <div style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>{doc.name}</div>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<DownloadIcon />}
                    onClick={() => handleDownload(doc)}
                  >
                    {t("download")}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
};
