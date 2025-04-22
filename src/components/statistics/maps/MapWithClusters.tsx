import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";
import { useProjectsMapStore } from "@/stores/projects/projects-for-map.ts";
import { ProjectForMap } from "@/types/types";
import { sectorIcons } from "@/utils/map/sectorIcons.ts";
import ProjectPopup from "@/components/statistics/maps/marker/MarkerPopUp.tsx";

const MapWithClusters = () => {
  const map = useMap();
  const { projects } = useProjectsMapStore();

  useEffect(() => {
    const markerClusterGroup: L.MarkerClusterGroup = L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      spiderfyDistanceMultiplier: 2,
    });

    const createMarker = (project: ProjectForMap, coords: [number, number]) => {
      const projectIcon =
        project.sectors.length > 1
          ? sectorIcons["Много секторов"]
          : sectorIcons[project.sectors[0].name];

      const [lng, lat] = coords;

      const marker = L.marker([lat, lng], {
        icon: projectIcon,
        title: project.name,
        zIndexOffset: 2000,
      });

      const popupContainer = document.createElement("div");
      ReactDOM.createRoot(popupContainer).render(<ProjectPopup project={project} />);
      marker.bindPopup(popupContainer);

      markerClusterGroup.addLayer(marker);
    };

    projects?.data.forEach((project: ProjectForMap) => {
      if (!project || !Array.isArray(project.address)) return;

      const validAddresses = project.address.filter(
        (addr) =>
          Array.isArray(addr.coordinates) &&
          addr.coordinates.length === 2 &&
          typeof addr.coordinates[0] === "number" &&
          typeof addr.coordinates[1] === "number"
      );

      if (
        validAddresses.length === 0 ||
        !Array.isArray(project.sectors) ||
        project.sectors.length === 0
      ) {
        console.log("❌ Пропущен проект (нет валидных координат или секторов):", project.name);
        return;
      }

      validAddresses.forEach((addr) => {
        createMarker(project, addr.coordinates as [number, number]);
      });
    });

    map.addLayer(markerClusterGroup);

    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [projects, map]);

  return null;
};

export default MapWithClusters;
