"use client";

import { useState } from "react";
import { TProjectModel } from "@/models/project/ProjectModel";

export const useProjectsViewModel = () => {
  const [projects] = useState<TProjectModel[]>([
    {
      id: 1,
      title: "Smart City Initiative",
      partners: "TechCorp, CityGov",
      sector: "Technology",
      startDate: "2024-05-10",
      budget: "10,000,000 USD",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Renewable Energy Expansion",
      partners: "GreenPower Inc.",
      sector: "Energy",
      startDate: "2023-09-15",
      budget: "25,000,000 USD",
      status: "Completed",
    },
    {
      id: 3,
      title: "Digital Healthcare System",
      partners: "MediTech Solutions",
      sector: "Healthcare",
      startDate: "2024-01-20",
      budget: "15,500,000 USD",
      status: "In Progress",
    },
    {
      id: 4,
      title: "Education for Future",
      partners: "EduSmart",
      sector: "Education",
      startDate: "2023-07-05",
      budget: "8,000,000 USD",
      status: "Ongoing",
    },
    {
      id: 5,
      title: "Affordable Housing Project",
      partners: "Urban Development Fund",
      sector: "Real Estate",
      startDate: "2022-12-12",
      budget: "30,000,000 USD",
      status: "Completed",
    },
    {
      id: 6,
      title: "Agricultural Innovation Hub",
      partners: "AgriTech Solutions",
      sector: "Agriculture",
      startDate: "2023-04-22",
      budget: "12,500,000 USD",
      status: "In Progress",
    },
    {
      id: 7,
      title: "Financial Inclusion Program",
      partners: "Banking Network",
      sector: "Finance",
      startDate: "2024-06-01",
      budget: "5,000,000 USD",
      status: "Planned",
    },
    {
      id: 8,
      title: "AI Research & Development",
      partners: "AI Global Lab",
      sector: "Technology",
      startDate: "2023-10-30",
      budget: "18,000,000 USD",
      status: "Ongoing",
    },
  ]);

  return {
    projects,
  };
};
