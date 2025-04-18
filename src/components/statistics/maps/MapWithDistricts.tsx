import { GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import React from "react";
import { FeatureCollection } from "geojson";

interface Props {
  districtsData: FeatureCollection | null;
  selectedRegion: string | null;
  setSelectedRegion: (id: string | null) => void;
}

const MapWithDistricts: React.FC<Props> = ({ districtsData, selectedRegion, setSelectedRegion }) => {
  const map = useMap();

  if (!districtsData) return null;

  return (
    <GeoJSON
      data={districtsData}
      pointToLayer={() => L.circleMarker([999, 999])}
      onEachFeature={(feature, layer) => {
        layer.on({
          mouseover: (e: any) => {
            e.target.setStyle({
              fillOpacity: 0.3,
              color: "#ff5722",
            });
          },
          mouseout: (e: any) => {
            e.target.setStyle({
              fillOpacity: 0.1,
              color: "#3b4b60",
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
        color: "#3b4b60",
        weight: 1,
        fillOpacity: selectedRegion === feature?.id ? 0.5 : 0,
      })}
    />
  );
};

export default React.memo(MapWithDistricts);