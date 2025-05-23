"use client";

import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import CustomTabPanel from "@/components/tabs/CustomTabPanel";
import ProjectsTab from "@/components/statistics/tabs/ProjectsTab";
import ContractsTab from "@/components/statistics/tabs/ContractsTab";
import { a11yProps } from "@/utils/tab/a11yProps";
import { useQueryTab } from "@/utils/tab/useQueryTab";
import { useTranslation } from "react-i18next";

export default function Main() {
  const { currentTab, handleTabChange } = useQueryTab();
  const { t } = useTranslation();

  return (
    <Box sx={{ width: 1 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={currentTab} onChange={handleTabChange} aria-label="basic tabs">
          <Tab label={t("tabs.projects")} {...a11yProps(0)} />
          <Tab label={t("tabs.contracts")} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={currentTab} index={0}>
        <ProjectsTab />
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={1}>
        <ContractsTab />
      </CustomTabPanel>
    </Box>
  );
}
