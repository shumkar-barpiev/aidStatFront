"use client";

import { useState } from "react";
import { TProjectModel } from "@/models/project/ProjectModel";

export const useMainPageViewModel = () => {
  const [projects] = useState<TProjectModel[]>([
    { id: 1, title: "Техническая помощь проекту Камбаратинской ГЭС-1", sector: "Technology", deadline: "2025-06-15" },
    {
      id: 2,
      title: "Развитие возобновляемой энергетики ",
      sector: "Healthcare",
      deadline: "2025-07-10",
    },
    { id: 3, title: "Экстренная поддержка частного", sector: "Education", deadline: "2025-08-20" },
    {
      id: 4,
      title: "Программа жилищного финансирования",
      sector: "Finance",
      deadline: "2025-09-05",
    },
    {
      id: 5,
      title: "Предоставление оборудования для меди",
      sector: "Real Estate",
      deadline: "2025-10-30",
    },
  ]);

  return {
    projects,
  };
};
