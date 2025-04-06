import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";
import { useProjectsStore } from "@/stores/projects/projects-for-map.ts";

const MapWithClusters = () => {
  const map = useMap();
  const { filteredProjects } = useProjectsStore();

  useEffect(() => {
    // Создание объекта с типом 'L.MarkerClusterGroup'
    const markerClusterGroup: L.MarkerClusterGroup = L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
    });

    filteredProjects.forEach((project) => {
      // Проверка, что геометрия является точкой
      if (!project.properties) return null;
      const [longitude, latitude] = project.geometry.coordinates;

      // Создаём маркер и привязываем всплывающее окно
      const marker = L.marker([latitude, longitude], {
        title: project.properties.name, // или project.properties.title и т.д.
        zIndexOffset: 2000,
      }).bindPopup(`
        <strong>${project.properties.name}</strong><br>
        Total Financing: ${project.properties.totalFinancingUsd}<br>
        Donor: ${project.properties.donors}<br>
        Sector: ${project.properties.sectors}<br>
        End Date: ${project.properties.endDate || "N/A"}
      `);

      markerClusterGroup.addLayer(marker);
    });

    map.addLayer(markerClusterGroup);

    return () => {
      map.removeLayer(markerClusterGroup); // чтобы при обновлении данных не дублировались кластеры
    };
  }, [filteredProjects, map]);

  return null;
};

export default React.memo(MapWithClusters);
