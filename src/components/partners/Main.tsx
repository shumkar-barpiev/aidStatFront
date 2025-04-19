import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { containerMargins, containerWidths } from "@/utils/constants";
import CustomTabPanel from "@/components/tabs/CustomTabPanel";
import PartnersTab from "@/components/partners/PartnersTab";
import AgenciesTab from "@/components/partners/AgenciesTab";
import { a11yProps } from "@/utils/tab/a11yProps.ts";
import { useQueryTab } from "@/utils/tab/useQueryTab.ts";

export default function Main() {
  const { currentTab, handleTabChange } = useQueryTab();

  return (
    <Box sx={{ width: containerWidths, mx: containerMargins, p: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={currentTab} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Партнеры" {...a11yProps(0)} />
          <Tab label="Агентства" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={currentTab} index={0}>
        <PartnersTab />
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={1}>
        <AgenciesTab />
      </CustomTabPanel>
    </Box>
  );
}
