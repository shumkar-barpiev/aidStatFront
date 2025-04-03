"use client";

import { useState } from "react";
import { TPartnerModel } from "@/models/partner/partner";
export const usePartnersViewModel = () => {
  const [partners] = useState<TPartnerModel[]>([
    {
      id: 1,
      name: "Smart City Initiative",
      description: "In Progress",
    },
    {
      id: 2,
      name: "Green Energy Solutions",
      description: "Completed",
    },
    {
      id: 3,
      name: "Digital Education Program",
      description: "Ongoing",
    },
    {
      id: 4,
      name: "Healthcare for All",
      description: "In Progress",
    },
    {
      id: 5,
      name: "Sustainable Agriculture Project",
      description: "Completed",
    },
    {
      id: 6,
      name: "Tech Innovation Hub",
      description: "Ongoing",
    },
    {
      id: 7,
      name: "Women in STEM Initiative",
      description: "In Progress",
    },
    {
      id: 8,
      name: "AI Research Collaboration",
      description: "Completed",
    },
    {
      id: 9,
      name: "Climate Change Mitigation",
      description: "Ongoing",
    },
    {
      id: 10,
      name: "Urban Development Plan",
      description: "In Progress",
    },
  ]);

  return {
    partners,
  };
};
