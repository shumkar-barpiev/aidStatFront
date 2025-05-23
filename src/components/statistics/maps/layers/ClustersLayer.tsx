import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";
import { useProjectsMapStore } from "@/stores/projects/projects-for-map";
import { ProjectForMap } from "@/types/types";
import { sectorIcons } from "@/utils/map/sectorIcons";
import ProjectPopup from "@/components/statistics/maps/marker/MarkerPopUp";
import Colors from "@/styles/colors";

const ClustersLayer = () => {
  const map = useMap();
  const { projects } = useProjectsMapStore();

  useEffect(() => {
    const markerClusterGroup: L.MarkerClusterGroup = L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      spiderfyDistanceMultiplier: 2,
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();

        let backgroundColor = Colors.primary; // default color (purple)
        if (count >= 10 && count < 30) {
          backgroundColor = "#4f46e5";
        } else if (count >= 30) {
          backgroundColor = Colors.darkBlue;
        }

        return L.divIcon({
          html: `<div style="background-color: ${backgroundColor}; border-radius: 50%; color: white; text-align: center; line-height: 30px; font-size: 14px; width: 30px; height: 30px;">${count}</div>`,
          className: "custom-cluster-icon",
          iconSize: L.point(40, 40),
        });
      },
    });

    const createMarker = (project: ProjectForMap, coords: [number, number]) => {
      const projectIcon =
        project.sectors.length > 1 ? sectorIcons["Много секторов"] : sectorIcons[project.sectors[0].name];

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

      if (validAddresses.length === 0 || !Array.isArray(project.sectors) || project.sectors.length === 0) {
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

export default ClustersLayer;
