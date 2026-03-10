import React from "react";
import { Marker, Popup, SVGOverlay } from "react-leaflet";

const LocationPin = ({ location }) => {
  console.log(location);
  return (
    <>
      <Marker position={[location.lat, location.long]}>
        <Popup>Mabuhay! This is Manila.</Popup>
      </Marker>
    </>
  );
};

export default LocationPin;
