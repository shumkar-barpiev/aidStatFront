"use client";

import { useEffect, useState } from "react";
import { useDocumentsStore } from "@/stores/documents/documents";

export const useDocumentsViewModel = () => {
  const documentsStore = useDocumentsStore();
  const [allDocuments, setAllDocuments] = useState<Record<string, any>[]>([]);

  const downloadDocument = (id: number) => {
    documentsStore.downloadDocument(id, (blob: any, filename: string) => {
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      a.remove();
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
