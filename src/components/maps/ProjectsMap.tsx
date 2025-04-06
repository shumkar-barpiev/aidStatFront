"use client";

import React, { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import MapFilterSelect from "@/components/select/MapFilterSelect.tsx";
import { useProjectsStore } from "@/stores/projects/projects-for-map.ts";
import { useLocationNamesStore } from "@/stores/location-names/location-names.ts";
import { useSectorsStore } from "@/stores/sectors/sectors.ts";
import { useDonorsStore } from "@/stores/donors/donors.ts";
import L from "leaflet";
import { GeoJSON, MapContainer, TileLayer, useMap } from "react-leaflet";
import { Feature, FeatureCollection } from "geojson";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import geojsonData from "../../utils/map/statesGeoJSON.json";
import batkenRegion from "../../utils/map/statesBatkenRegion.json";
import djalalAbadRegion from "../../utils/map/statesDjalalAbadRegion.json";
import narynRegion from "../../utils/map/statesNarynRegion.json";
import talasRegion from "../../utils/map/statesTalasRegion.json";
import oshRegion from "../../utils/map/statesOshRegion.json";
import chuyRegion from "../../utils/map/statesChuyRegion.json";
import issykKulRegion from "../../utils/map/statesIssykKulRegion.json";
import bishkekCity from "../../utils/map/statesBishkekCity.json";
import oshCity from "../../utils/map/statesOshCity.json";
import HeatLayer from "@/components/maps/HeatLayer.tsx";
import MapWithClusters from "@/components/maps/MapWithClusters.tsx";

const districtsMap: Record<string, any> = {
  batkenRegion,
  djalalAbadRegion,
  narynRegion,
  talasRegion,
  chuyRegion,
  issykKulRegion,
  oshRegion,
  bishkekCity,
  oshCity,
};

const ProjectsMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [districtsData, setDistrictsData] = useState<FeatureCollection | null>(null);
  const [center, setCenter] = useState<[number, number]>([41.2, 74.649991]); // Координаты КР (центрирует при первой прорисовке)

  const {
    setFilterByLocationName,
    setFilterBySector,
    setFilterByDonor,
    projects,
    fetchProjects,
    filteredProjects,
    filterByLocationName,
    filterBySector,
    filterByDonor,
  } = useProjectsStore();
  const { locationNames, fetchLocationNames } = useLocationNamesStore();
  const { sectors, fetchSectors } = useSectorsStore();
  const { donors, fetchDonors } = useDonorsStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          // fetchLocationNames(),
          // fetchSectors(),
          // fetchDonors(),
          // fetchProjects(),
        ]);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    fetchData();
  }, []);

  // Создание слоя Областей и её логика поведения
  const MapWithRegions = () => {
    const map = useMap();

    const onEachFeature = (feature: Feature, layer: any) => {
      layer.on({
        mouseover: (e: any) => {
          e.target.setStyle({
            fillOpacity: 0.1,
            color: "#2F70AF",
          });
        },
        mouseout: (e: any) => {
          // const isSelected = selectedRegion === feature.id;
          e.target.setStyle({
            fillOpacity: 0,
            color: "#3b4b60",
          });
        },
        click: (e: any) => {
          const bounds = e.target.getBounds();
          map.fitBounds(bounds, { padding: [60, 60], animate: true, duration: 2.0 });
          loadDistricts(feature.id as string); // Загружаем районы выбранной области
        },
      });
    };

    return (
      <GeoJSON
        data={geojsonData as FeatureCollection}
        pointToLayer={(feature, latlng) => L.circleMarker([999, 999])}
        onEachFeature={onEachFeature}
        style={(feature) => ({
          weight: 1,
          fillOpacity: 0,
          color: "#3b4b60",
        })}
      />
    );
  };
  const MemoizedMapWithRegions = React.memo(MapWithRegions);

  // Подгрузка районов при выборе области
  const loadDistricts = (regionName: string) => {
    if (regionName === selectedRegion) return;

    const geojson = districtsMap[regionName];
    setDistrictsData(geojson);
    setSelectedRegion(regionName);
  };

  // Настройка слоя районов и её логика поведения
  const MapWithDistricts = () => {
    const map = useMap();

    if (!districtsData) return null;

    return (
      <GeoJSON
        data={districtsData}
        pointToLayer={(feature, latlng) => L.circleMarker([999, 999])}
        onEachFeature={(feature, layer) => {
          layer.on({
            mouseover: (e: any) => {
              e.target.setStyle({
                fillOpacity: 0.3,
                color: "#3b4b60",
              });
            },
            mouseout: (e: any) => {
              e.target.setStyle({
                fillOpacity: selectedRegion === feature.id ? 0.5 : 0.2,
                color: selectedRegion === feature.id ? "#ff5722" : "#3b4b60",
              });
            },
            click: (e: any) => {
              setSelectedRegion(feature.id as string);
              const bounds = e.target.getBounds();
              map.fitBounds(bounds, { padding: [60, 60], animate: true, duration: 2.0 });
            },
          });
        }}
        style={(feature) => ({
          color: selectedRegion === feature?.id ? "#ff5722" : "#3b4b60",
          weight: 1,
          fillOpacity: selectedRegion === feature?.id ? 0.5 : 0,
        })}
      />
    );
  };

  const MemoizedMapWithDistricts = React.memo(MapWithDistricts);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "semibold",
          color: "#3b4b60",
          letterSpacing: 1.5,
          textTransform: "uppercase",
          padding: "20px 0",
        }}
      >
        Мониторинг проектов для создания и развития инфраструктуры КР
      </Typography>
      <Box sx={{ display: "flex", gap: "16px", padding: "20px 0" }}>
        <MapFilterSelect
          labelName="Регион"
          onChange={(e) => setFilterByLocationName(e.target.value)}
          options={locationNames}
          value={filterByLocationName ? filterByLocationName : ""}
        />
        <MapFilterSelect
          labelName="Сектор"
          onChange={(e) => setFilterBySector(e.target.value)}
          options={sectors}
          value={filterBySector ? filterBySector : ""}
        />
        <MapFilterSelect
          labelName="Партнер"
          onChange={(e) => setFilterByDonor(e.target.value)}
          options={donors}
          value={filterByDonor ? filterByDonor : ""}
        />
      </Box>

      <Box sx={{ width: "100%", height: "650px", margin: "auto" }}>
        <Paper sx={{ display: "flex", width: "100%", height: "100%" }} elevation={3}>
          <MapContainer
            center={center}
            zoom={7}
            scrollWheelZoom={true}
            style={{ flex: 1, width: "100%" }}
            maxZoom={10}
            minZoom={7}
          >
            <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />
            <MapWithClusters />
            <HeatLayer />
            <MemoizedMapWithRegions />
            <MemoizedMapWithDistricts />
          </MapContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default React.memo(ProjectsMap);
