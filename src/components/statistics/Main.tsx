"use client";

import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import CustomTabPanel from "@/components/tabs/CustomTabPanel.tsx";
import ProjectsTab from "@/components/statistics/ProjectsTab.tsx";
import ContractsTab from "@/components/statistics/ContractsTab.tsx";

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

export default function Main() {
  const [tab, setTab] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: 1 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Карта проектов" {...a11yProps(0)} />
          <Tab label="Карта контрактов" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tab} index={0}>
        <ProjectsTab />
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={1}>
        <ContractsTab />
      </CustomTabPanel>
    </Box>
  );
}
