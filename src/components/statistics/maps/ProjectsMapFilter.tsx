import React from "react";
import { Box } from "@mui/material";
import { useStatisticsProjectsMapViewModel } from "@/viewmodels/statistics/map/useStatisticsProjectsMapViewModel.ts";
import FilterSelect, { Option } from "@/components/select/FilterSelect.tsx";
import { useSectorsViewModel } from "@/viewmodels/sectors/useSectorsViewModel.ts";
import { useRegionsViewModel } from "@/viewmodels/regions/useRegionsViewModel.ts";
import { usePartnersViewModel } from "@/viewmodels/partners/usePartnersViewModel.ts";
import { TPartnerModel } from "@/models/partner/partner.ts";

const ProjectsMapFilter = () => {
  const { handleRegionChange, handleSectorChange, handlePartnerChange } = useStatisticsProjectsMapViewModel();
  const { sectors, sectorsGroup } = useSectorsViewModel();
  const { regions } = useRegionsViewModel();
  const { allPartners } = usePartnersViewModel();
  const sectorOptions = sectors.concat(sectorsGroup);

  const handleOptions = (dataArray: TPartnerModel[]) => {
    return dataArray
      .filter(
        (p): p is Required<Pick<typeof p, "id" | "name" | "projectCount">> =>
          typeof p.name === "string" && typeof p.projectCount === "number"
      )
      .map((p) => ({
        id: p.id,
        name: p.name,
        projectCount: p.projectCount,
      }));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: "16px", padding: "20px 0" }}>
      <FilterSelect labelName="Регион" onChange={handleRegionChange} options={handleOptions(regions)} value="-1" />
      <FilterSelect labelName="Сектор" onChange={handleSectorChange} options={handleOptions(sectorOptions)} value="-1" />
      <FilterSelect labelName="Партнер" onChange={handlePartnerChange} options={handleOptions(allPartners)} value="-1" />
    </Box>
  );
};

export default ProjectsMapFilter;