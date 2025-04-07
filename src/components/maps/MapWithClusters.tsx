import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";
import { useProjectsStore } from "@/stores/projects/projects-for-map.ts";

const sectorIcons: { [key: string]: L.Icon } = {
  Здравоохранение: new L.Icon({
    iconUrl: "/assets/images/icons/map/markers/marker4.svg",
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  Образование: new L.Icon({
    iconUrl: "/assets/images/icons/map/markers/marker2.svg",
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  Транспорт: new L.Icon({
    iconUrl: "/assets/images/icons/map/markers/marker3.svg",
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  Энергетика: new L.Icon({
    iconUrl: "/assets/images/icons/map/markers/marker3.svg",
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  "Сельское хозяйство": new L.Icon({
    iconUrl: "/assets/images/icons/map/markers/marker1.svg",
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  "Информационные технологии": new L.Icon({
    iconUrl: "/assets/images/icons/map/markers/marker4.svg",
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  Экология: new L.Icon({
    iconUrl: "/assets/images/icons/map/markers/marker1.svg",
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  "Наука и технологии": new L.Icon({
    iconUrl: "/assets/images/icons/map/markers/marker2.svg",
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  "Городское развитие": new L.Icon({
    iconUrl: "/assets/images/icons/map/markers/marker5.svg",
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  Водоснабжение: new L.Icon({
    iconUrl: "/assets/images/icons/map/markers/marker6.svg",
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  "Чрезвычайная ситуация": new L.Icon({
    iconUrl: "/assets/images/icons/map/markers/marker6.svg",
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  "Социальные обеспечения": new L.Icon({
    iconUrl: "/assets/images/icons/map/markers/marker6.svg",
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  "Социальное жилье и ипотека": new L.Icon({
    iconUrl: "/assets/images/icons/map/markers/marker6.svg",
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  Инфраструктура: new L.Icon({
    iconUrl: "/assets/images/icons/map/markers/marker6.svg",
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  "Государственное управление": new L.Icon({
    iconUrl: "/assets/images/icons/map/markers/marker6.svg",
    iconSize: [50, 50],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
};

const MapWithClusters = () => {
  const map = useMap();
  const { filteredProjects } = useProjectsStore();

  useEffect(() => {
    const markerClusterGroup: L.MarkerClusterGroup = L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      spiderfyDistanceMultiplier: 2,
    });

    filteredProjects.forEach((project) => {
      if (!project.properties) return null;
      const [longitude, latitude] = project.geometry.coordinates;

      const sectors: string = Array.isArray(project.properties.sectors)
        ? project.properties.sectors[0]
        : project.properties.sectors;

      const projectIcon =
        sectorIcons[sectors] ||
        new L.Icon({
          iconUrl: "/assets/images/icons/map/markers/marker6.svg",
          iconSize: [50, 50],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });

      const marker = L.marker([latitude, longitude], {
        title: project.properties.name,
        icon: projectIcon,
        zIndexOffset: 2000,
      });

      // Создание всплывающего окна с данными проекта
      marker.bindPopup(`
        <div>
          <strong>${project.properties.name}</strong><br>
          <b>Total Financing:</b> ${project.properties.totalFinancingUsd}<br>
          <b>Donor:</b> ${project.properties.donors}<br>
          <b>Sector:</b> ${project.properties.sectors}<br>
          <b>End Date:</b> ${project.properties.endDate || "N/A"}
        </div>
      `);

      markerClusterGroup.addLayer(marker);
    });

    map.addLayer(markerClusterGroup);

    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [filteredProjects, map]);

  return null;
};

export default React.memo(MapWithClusters);
