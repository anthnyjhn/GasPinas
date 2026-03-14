import React from "react";
import { Circle } from "react-leaflet";
const DistanceRadius = ({ userLocation, radius }) => {
  return (
    <Circle
      center={userLocation}
      radius={radius}
      pathOptions={{
        color: "#b0b0b0",
        fillColor: "#AEAEAE}",
        fillOpacity: 0.1,
      }}
    />
  );
};

export default DistanceRadius;
