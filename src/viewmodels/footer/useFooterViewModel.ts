"use client";

import { useState } from "react";
import { NavItem } from "@/models/nav-item/NavItem";

export const useFooterViewModel = () => {
  const [primaryFooterNavItems] = useState<NavItem[]>([
    { label: "Главная", i18n: "mainPage", path: "/" },
    { label: "Новости", i18n: "newsPage", path: "https://minfin.kg/pages/show/page/press-tsentr" },
    { label: "Проекты", i18n: "projectsPage", path: "/projects" },
    { label: "Партнеры", i18n: "partners", path: "/partners" },
    // { label: "Документы", i18n: "documentsPage", path: "/documents" },
    { label: "Статистика", i18n: "statisticsPage", path: "/statistics" },
    // { label: "Контакты", i18n: "contactsPage", path: "/contacts" },
  ]);

  const [secondaryFooterNavItems] = useState<NavItem[]>([
    { label: "Условия использования", i18n: "useTermsPage", path: "/use-terms" },
    { label: "Политика конфиденциальности", i18n: "privacyPolicyPage", path: "/privacy-policy" },
    { label: "Сookie Policy", i18n: "cookiePolicyPage", path: "/cookie-policy" },
  ]);

  return {
    primaryFooterNavItems,
    secondaryFooterNavItems,
  };
};
