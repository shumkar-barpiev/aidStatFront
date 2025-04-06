import { useState, useEffect } from "react";
import { useProjectsStore } from "@/stores/projects/projects-for-map.ts";
import { useLocationNamesStore } from "@/stores/location-names/location-names.ts";
import { useSectorsStore } from "@/stores/sectors/sectors.ts";
import { useDonorsStore } from "@/stores/donors/donors.ts";

export const useMapViewModel = () => {
  // const { projects, fetchProjects, filteredProjects } = useProjectsStore();
  // const { locationNames, fetchLocationNames } = useLocationNamesStore();
  // const { sectors, fetchSectors } = useSectorsStore();
  // const { donors, fetchDonors } = useDonorsStore();
  //
  // const [isLoading, setIsLoading] = useState(true);
  // const [center, setCenter] = useState<[number, number]>([41.2044, 74.7661]); // Координаты КР
  //
  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       await Promise.all([fetchLocationNames(), fetchSectors(), fetchDonors(), fetchProjects()]);
  //     } catch (error) {
  //       console.error("Ошибка при загрузке данных:", error);
  //       setIsLoading(false);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //
  //   loadData();
  // }, [fetchProjects]);
  //
  // return { projects, locationNames, sectors, donors, isLoading, center, setCenter };
};
