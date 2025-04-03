"use client";

import { useState } from "react";
import { TProjectModel } from "@/models/project/ProjectModel";

export const useMainPageViewModel = () => {
  const [projects] = useState<TProjectModel[]>([
    { id: 1, title: "Техническая помощь проекту Камбаратинской ГЭС-1", sector: "Технологии", endDate: "2025-06-15" },
    { id: 2, title: "Развитие возобновляемой энергетики", sector: "Здравоохранение", endDate: "2025-07-10" },
    { id: 3, title: "Экстренная поддержка частного", sector: "Образование", endDate: "2025-08-20" },
    { id: 4, title: "Программа жилищного финансирования", sector: "Финансы", endDate: "2025-09-05" },
    { id: 5, title: "Предоставление оборудования для меди", sector: "Недвижимость", endDate: "2025-10-30" },
  ]);

  return {
    projects,
  };
};
