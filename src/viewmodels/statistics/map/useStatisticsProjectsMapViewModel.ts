import { useEffect, useCallback } from "react";
import { useProjectsMapStore } from "@/stores/projects/projects-for-map";

export const useStatisticsProjectsMapViewModel = () => {
  const { fetchProjects, mapFilters, setFilters, loading, error, projects } = useProjectsMapStore();

  const handleRegionChange = useCallback(
    (regionId: number) => {
      const updatedFilters = {
        ...mapFilters,
        regionIds: regionId === -1 ? null : [regionId],
      };

      setFilters(updatedFilters);
      fetchProjects(updatedFilters);
    },
    [mapFilters, setFilters, fetchProjects]
  );

  const handleSectorChange = useCallback(
    (sectorId: number) => {
      const updatedFilters = {
        ...mapFilters,
        sectorIds: sectorId === -1 ? null : [sectorId],
      };
      setFilters(updatedFilters);
      fetchProjects(updatedFilters);
    },
    [mapFilters, setFilters, fetchProjects]
  );

  const handlePartnerChange = useCallback(
    (partnerId: number) => {
      const updatedFilters = {
        ...mapFilters,
        partnerIds: partnerId === -1 ? null : [partnerId],
      };
      setFilters(updatedFilters);
      fetchProjects(updatedFilters);
    },
    [mapFilters, setFilters, fetchProjects]
  );

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    loading,
    error,
    projects,
    mapFilters: mapFilters,
    handleRegionChange,
    handleSectorChange,
    handlePartnerChange,
  };
};
