import { useState, useEffect } from "react";
import { useMap, MapContainer, useMapEvents, ZoomControl } from "react-leaflet";

import MapTileLayer from "./MapTileLayer";
import StationLocationPin from "./StationLocationPin";
import UserLocationPin from "./UserLocationPin";
import MapControl from "./MapControl";

import "leaflet/dist/leaflet.css";
import "../../style/Map.css";

// GET /stations?lat=&lng=&radius=&fuelType= response sample
const nearbyStations = [
  {
    id: 1,
    location: { lat: 14.5995, lng: 120.995 },
    fuelType: "U95",
    price: 63.44,
  },
  {
    id: 2,
    location: { lat: 14.5995, lng: 120.99 },
    fuelType: "U95",
    price: 61.44,
  },
];

function UserLocation({ setUserLocation }) {
  const map = useMap();

  map.locate({ enableHighAccuracy: true });

  useMapEvents({
    locationfound(e) {
      setUserLocation(e.latlng);
      map.flyTo(e.latlng, map.getZoom(), { animate: true, duration: 1.5 });
    },
  });

  return null;
}

function Map() {
  const defaultZoom = 13;
  const canScrollWheelZoom = true;
  const manila_coordinates = { lat: 14.5995, lng: 120.9842 }; // default location
  const [userLocation, setUserLocation] = useState(manila_coordinates);
  const philippinesBounds = [
    [4.5, 116.9], // South-West
    [21.5, 126.6], // North-East
  ];

  return (
    <div className="w-screen h-[100dvh] relative">
      <MapContainer
        className="h-full w-full"
        center={userLocation}
        zoom={defaultZoom}
        maxBounds={philippinesBounds}
        maxBoundsViscosity={1.0}
        minZoom={5}
        scrollWheelZoom={canScrollWheelZoom}
        zoomControl={false}
        zoomAnimation={true}
        markerZoomAnimation={true} // Markers will scale/fade during zoom
        fadeAnimation={true} // Tile layers will cross-fade
        inertia={true} // Adds "momentum" when dragging the map
        inertiaResistance={3000} // How quickly the map stops sliding
      >
        <MapTileLayer />

        <UserLocationPin userLocation={userLocation} />
        <MapControl setUserLocation={setUserLocation} />

        {nearbyStations.map((station) => (
          <StationLocationPin key={station.id} station={station} />
        ))}

        <ZoomControl
          position="bottomright"
          className="bg-red-50 backdrop-blur-md"
        />
      </MapContainer>
    </div>
  );
}

export default Map;
