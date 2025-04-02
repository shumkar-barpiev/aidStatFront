"use client";

import { useState } from "react";
import { NavItem } from "@/models/nav-item/NavItem";

export const useNavViewModel = () => {
  const [navItems] = useState<NavItem[]>([
    { label: "Projects", i18n: "projectsPage", path: "/projects" },
    { label: "Statistics", i18n: "statisticsPage", path: "/statistics" },
    { label: "Partners", i18n: "partnersPage", path: "/partners" },
    // { label: "Documents", i18n: "documentsPage", path: "/documents" },
    // { label: "About Us", i18n: "aboutUsPage", path: "/about-us" },
  ]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return {
    navItems,
    isMobileMenuOpen,
    toggleMobileMenu,
  };
};
