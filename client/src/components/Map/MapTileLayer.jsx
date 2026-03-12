import React from "react";
import { TileLayer } from "react-leaflet";
const MapTileLayer = () => {
  return (
    <TileLayer
      attribution="&copy; OpenStreetMap contributors"
      url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
    />
  );
};

export default MapTileLayer;
