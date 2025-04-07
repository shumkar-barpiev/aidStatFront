import React from "react";
import { LayerGroup, LayersControl, Pane, WMSTileLayer } from "react-leaflet";

const HeatLayer = () => {
  return (
    <Pane name="boundaryLayer">
      <LayersControl position="topright">
        <LayersControl.Overlay checked name="WMS Слой">
          <LayerGroup>
            <WMSTileLayer
              url="https://agro.brisklyminds.com/geoserver/agromap/wms?"
              version="1.1.0"
              layers="agromap:KG_interpolated2"
              format="image/png"
              transparent={true}
              opacity={0.5}
            />
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </Pane>
  );
};

export default React.memo(HeatLayer);
