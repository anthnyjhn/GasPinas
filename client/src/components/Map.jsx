import { useState, useEffect } from "react";
import { useMap, MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import LocationPin from "../components/LocationPin";

// Fix for default marker icons not showing in React
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const DefaultZoom = 13;
const canScrollWheelZoom = true;

const locations = [
  {
    brand: "shell",
    stationName: "station1",
    address: "2 sample street, town, city",
    location: { lat: 11.5995, long: 120.9842 },
    fuel: {
      Diesel: 40.99,
      Unleaded: 40.99,
      Premium: 99.99,
    },
  },
  {
    brand: "shell",
    stationName: "station2",
    address: "2 sample street, town, city",
    location: { lat: 11.5995, long: 121.9842 },
    fuel: {
      Diesel: 40.99,
      Unleaded: 40.99,
      Premium: 99.99,
    },
  },
];

function UserLocation({ setUserPosition }) {
  const map = useMap();

  useEffect(() => {
    map.locate();
  }, [map]);

  useMapEvents({
    locationfound(e) {
      setUserPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return null;
}

function Map() {
  const [userPosition, setUserPosition] = useState({
    lat: 12.8797,
    lng: 121.774,
  });

  return (
    <div className="w-full h-screen overflow-hidden">
      <MapContainer
        className="h-full w-full"
        center={userPosition}
        zoom={DefaultZoom}
        scrollWheelZoom={canScrollWheelZoom}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <UserLocation setUserPosition={setUserPosition} />

        {locations.map((station) => (
          <LocationPin
            key={station.stationName}
            location={{
              lat: station.location.lat,
              long: station.location.long,
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
