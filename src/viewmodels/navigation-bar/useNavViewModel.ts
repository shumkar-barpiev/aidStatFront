"use client";

import { useState } from "react";
import { NavItem } from "@/models/nav-item/NavItem";

export const useNavViewModel = () => {
  const [navItems] = useState<NavItem[]>([
    { label: "Главная", i18n: "pages.main", path: "/" },
    { label: "Projects", i18n: "pages.projects", path: "/projects" },
    { label: "Statistics", i18n: "pages.statistics", path: "/statistics" },
    { label: "Partners", i18n: "pages.partners", path: "/partners" },
    { label: "Documents", i18n: "pages.documents", path: "/documents" },
    { label: "About Us", i18n: "pages.about", path: "/contacts" },
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
