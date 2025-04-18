import { useEffect, useCallback } from "react";
import { useProjectsMapStore } from "@/stores/projects/projects-for-map.ts";

export const useStatisticsProjectsMapViewModel = () => {
  const {
    fetchProjects,
    filters,
    setFilters,
    loading,
    error,
    projects,
  } = useProjectsMapStore();

  const handleRegionChange = useCallback((regionId: number) => {
    const updatedFilters = {
      ...filters,
      regionIds: regionId === -1 ? null : [regionId],
    };

    setFilters(updatedFilters);
    fetchProjects(updatedFilters);
  }, [filters, setFilters, fetchProjects]);

  const handleSectorChange = useCallback((sectorId: number) => {
    const updatedFilters = {
      ...filters,
      sectorIds: sectorId === -1 ? null : [sectorId],
    };
    setFilters(updatedFilters);
    fetchProjects(updatedFilters);
  }, [filters, setFilters, fetchProjects]);

  const handlePartnerChange = useCallback((partnerId: number) => {
    const updatedFilters = {
      ...filters,
      partnerIds: partnerId === -1 ? null : [partnerId],
    };
    setFilters(updatedFilters);
    fetchProjects(updatedFilters);
  }, [filters, setFilters, fetchProjects]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    loading,
    error,
    projects,
    filters,
    handleRegionChange,
    handleSectorChange,
    handlePartnerChange,
  };
};
