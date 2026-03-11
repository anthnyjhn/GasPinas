import { useState, useEffect } from "react";
import {
  useMap,
  Marker,
  MapContainer,
  TileLayer,
  useMapEvents,
  Popup,
} from "react-leaflet";

import MapTileLayer from "./MapTileLayer";
import LocationPin from "../components/LocationPin";

import "leaflet/dist/leaflet.css";
import "../style/Map.css";

// mock db
const locations = [
  {
    brand: "shell",
    stationLogo: "https://cdn.fuelcheck.nsw.gov.au/nsw/brands/bp_logo.png",
    stationName: "Shell Dagupan",
    address: "2 sample street, town, city",
    location: { lat: 14.5995, lng: 120.9842 },
    fuel: [
      { Type: "Diesel", Price: 40.99 },
      { Type: "Unleaded", Price: 40.99 },
      { Type: "Premium", Price: 40.99 },
    ],
  },
  {
    brand: "shell",
    stationName: "station2",
    address: "2 sample street, town, city",
    location: { lat: 11.5995, lng: 121.9842 },
    fuel: [
      { Type: "Diesel", Price: 40.99 },
      { Type: "Unleaded", Price: 40.99 },
      { Type: "Premium", Price: 40.99 },
    ],
  },
];

function UserLocation({ setUserPosition }) {
  const map = useMap();

  // useEffect(() => {
  //   map.locate();
  // }, [map]);

  useMapEvents({
    locationfound(e) {
      setUserPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return null;
}

function Map() {
  const defaultZoom = 13;
  const canScrollWheelZoom = true;
  const manila_pos = { lat: 14.5995, lng: 120.9842 }; // default position
  const [userPosition, setUserPosition] = useState(manila_pos);

  return (
    <div className="w-screen h-screen">
      <MapContainer
        className="h-full w-full rounded-xl"
        center={userPosition}
        zoom={defaultZoom}
        scrollWheelZoom={canScrollWheelZoom}
      >
        <MapTileLayer />
        <Marker position={userPosition}>
          <Popup>You are here!</Popup>
        </Marker>

        <UserLocation setUserPosition={setUserPosition} />

        {locations.map((station) => (
          <LocationPin key={station.stationName} station={station} />
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
