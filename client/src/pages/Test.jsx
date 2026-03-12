import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Leaflet icon fix
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const RadiusMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 1. Get User Location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([14.5995, 120.9842]);
        fetchNearbyStations(14.5995, 120.9842);
      },
      (error) => console.error("Location access denied", error),
    );
  }, []);

  const fetchNearbyStations = async (lat, lon) => {
    setLoading(true);
    // Overpass "around" query (radius in meters, lat, lon)
    const query = `
            [out:json][timeout:25];
            area["name"="Philippines"]->.searchArea;
            (
              node["amenity"="fuel"](area.searchArea);
              way["amenity"="fuel"](area.searchArea);
            );
            out body;
            >;
            out skel qt;
        `;

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const processed = data.elements.map((item) => ({
        id: item.id,
        lat: item.lat,
        lon: item.lon,
      }));
      setStations(processed);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!userLocation) return <p>Requesting location access...</p>;

  return (
    <div style={{ height: "100vh" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 50,
            zIndex: 1000,
            background: "#fff",
            padding: "5px 10px",
            borderRadius: "4px",
          }}
        >
          Searching 10km radius...
        </div>
      )}

      <MapContainer center={userLocation} zoom={13} style={{ height: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Visual Circle showing the 10km radius */}
        <Circle
          center={userLocation}
          radius={5000}
          pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.1 }}
        />

        {/* User's current location marker */}
        <Marker position={userLocation}>
          <Popup>You are here</Popup>
        </Marker>

        {/* Fuel Station Markers */}
        {stations.map((station, i) => (
          <Marker
            key={station.id.toString() + i.toString()}
            position={[station.lat, station.lon]}
          >
            <Popup>
              <strong>{station.id}</strong>
              <br />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RadiusMap;
