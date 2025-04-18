"use client";

import { useEffect, useState } from "react";
import { getCurrentDateTimestamp } from "@/utils/date";
import { useDocumentsStore } from "@/stores/documents/documents";

export const useDocumentsViewModel = () => {
  const documentsStore = useDocumentsStore();
  const [allDocuments, setAllDocuments] = useState<Record<string, any>[]>([]);

  const sanitizeFilename = (name: string): string =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, "_")
      .substring(0, 50);

  const downloadDocument = (doc: Record<string, any>, extension: string) => {
    const id = doc.documentId;
    const cleanName = sanitizeFilename(doc.name);
    const timestamp = getCurrentDateTimestamp();
    const fileName = `${cleanName}_${timestamp}_${id}.${extension}`;

    documentsStore.downloadDocument(id, (blob: any) => {
      const url = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;

      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      window.URL.revokeObjectURL(url);
    });
  };

  useEffect(() => {
    documentsStore.getDocuments((data: any) => {
      setAllDocuments(data);
    });
  }, []);

  return {
    allDocuments,
    downloadDocument,
  };
};
