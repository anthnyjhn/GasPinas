import React from "react";
import { Marker, Popup } from "react-leaflet";
const UserLocationPin = ({ userLocation }) => {
  return (
    <Marker position={userLocation}>
      <Popup offset={[0, -30]}>You are here!</Popup>
    </Marker>
  );
};

export default UserLocationPin;
