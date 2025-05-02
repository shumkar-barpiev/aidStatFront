"use client";

import React, { useEffect, useState } from "react";
import L from "leaflet";
import { GeoJSON, MapContainer, TileLayer, useMap } from "react-leaflet";
import { Feature, FeatureCollection } from "geojson";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import geojsonData from "@/utils/map/statesGeoJSON.json";
import batkenRegion from "@/utils/map/statesBatkenRegion.json";
import djalalAbadRegion from "@/utils/map/statesDjalalAbadRegion.json";
import narynRegion from "@/utils/map/statesNarynRegion.json";
import talasRegion from "@/utils/map/statesTalasRegion.json";
import oshRegion from "@/utils/map/statesOshRegion.json";
import chuyRegion from "@/utils/map/statesChuyRegion.json";
import issykKulRegion from "@/utils/map/statesIssykKulRegion.json";
import bishkekCity from "@/utils/map/statesBishkekCity.json";
import oshCity from "@/utils/map/statesOshCity.json";
import HeatLayer from "@/components/statistics/maps/HeatLayer.tsx";
import MapWithClusters from "@/components/statistics/maps/MapWithClusters.tsx";
import MapWithDistricts from "@/components/statistics/maps/MapWithDistricts.tsx";
import HeatLayerLegend from "@/components/statistics/maps/HeatLayerLegend.tsx";

const districtsMap: Record<string, any> = {
  "Баткенская область": batkenRegion,
  "Джалал-Абадская область": djalalAbadRegion,
  "Нарынская область": narynRegion,
  "Таласская область": talasRegion,
  "Чуйская область": chuyRegion,
  "Иссык-Кульская область": issykKulRegion,
  "Ошская область": oshRegion,
  "г. Бишкек": bishkekCity,
  "г. Ош": oshCity,
};

const defaultMapCenter: [number, number] = [41.2, 74.649991];

const ProjectsMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [districtsData, setDistrictsData] = useState<FeatureCollection | null>(null);
  const [center, setCenter] = useState<[number, number]>(defaultMapCenter);
  const ResponsiveZoom = () => {
    const map = useMap();

    const getZoomByWidth = () => {
      const width = window.innerWidth;
      if (width < 600) return 5;
      if (width < 768) return 6;
      if (width < 1200) return 6;
      return 7;
    };

    useEffect(() => {
      const handleResize = () => {
        const newZoom = getZoomByWidth();
        map.setZoom(newZoom);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [map]);

    return null;
  };

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
          e.target.setStyle({
            fillOpacity: 0,
            color: "#3b4b60",
          });
        },
        click: (e: any) => {
          const bounds = e.target.getBounds();
          map.fitBounds(bounds, { padding: [60, 60], animate: true, duration: 2.0 });
          loadDistricts(feature.id as string);
        },
      });
    };

    return (
      <GeoJSON
        data={geojsonData as FeatureCollection}
        pointToLayer={() => L.circleMarker([999, 999])}
        onEachFeature={onEachFeature}
        style={() => ({
          weight: 1,
          fillOpacity: 0,
          color: "#3b4b60",
        })}
      />
    );
  };
  const MemoizedMapWithRegions = React.memo(MapWithRegions);

  const loadDistricts = (regionName: string) => {
    if (regionName === selectedRegion) return;
    console.log(regionName);
    const geojson = districtsMap[regionName];
    setDistrictsData(geojson);
    setSelectedRegion(regionName);
  };

  return (
    <MapContainer
      center={center}
      zoom={window.innerWidth < 768 ? 5 : 7}
      scrollWheelZoom={true}
      style={{ flex: 1, width: "100%" }}
      maxZoom={12}
      minZoom={5}
    >
      <ResponsiveZoom />
      <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=99425f3c-24bb-4e1e-94fc-c257d13c34a5" />
      <MapWithClusters />
      <HeatLayerLegend />
      <HeatLayer />
      <MemoizedMapWithRegions />
      <MapWithDistricts
        key={selectedRegion}
        districtsData={districtsData}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
    </MapContainer>
  );
};

export default React.memo(ProjectsMap);
