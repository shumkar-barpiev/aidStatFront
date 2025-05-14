import React from "react";
import { LayerGroup, LayersControl, Pane, WMSTileLayer } from "react-leaflet";

const HeatLayer = () => {
  return (
    <Pane name="boundaryLayer">
      <WMSTileLayer
        url="https://agro.brisklyminds.com/geoserver/agromap/wms?"
        version="1.1.0"
        layers="agromap:KG_interpolated2"
        format="image/png"
        transparent={true}
        opacity={1}
      />
    </Pane>
  );
};

export default React.memo(HeatLayer);
