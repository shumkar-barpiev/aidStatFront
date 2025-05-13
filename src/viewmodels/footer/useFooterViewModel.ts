"use client";

import { useState } from "react";
import { NavItem } from "@/models/nav-item/NavItem";

export const useFooterViewModel = () => {
  const [primaryFooterNavItems] = useState<NavItem[]>([
    { label: "Главная", i18n: "pages.main", path: "/" },
    { label: "Новости", i18n: "pages.news", path: "https://minfin.kg/pages/show/page/press-tsentr" },
    { label: "Проекты", i18n: "pages.projects", path: "/projects" },
    { label: "Партнеры", i18n: "pages.partners", path: "/partners" },
    // { label: "Документы", i18n: "documentsPage", path: "/documents" },
    { label: "Статистика", i18n: "pages.statistics", path: "/statistics" },
    // { label: "Контакты", i18n: "contactsPage", path: "/contacts" },
  ]);

  const [secondaryFooterNavItems] = useState<NavItem[]>([
    { label: "Условия использования", i18n: "pages.useTerms", path: "/use-terms" },
    { label: "Политика конфиденциальности", i18n: "pages.privacyPolicy", path: "/privacy-policy" },
    { label: "Сookie Policy", i18n: "pages.cookiePolicy", path: "/cookie-policy" },
  ]);

  return {
    primaryFooterNavItems,
    secondaryFooterNavItems,
  };
};
