import { useRef, React } from "react";
import { Marker, Popup } from "react-leaflet";
import Tooltip from "./Tooltip";
import L from "leaflet";

const hiddenIcon = L.divIcon({
  className: "hidden-marker",
  html: "",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

const StationLocationPin = ({ station }) => {
  const markerRef = useRef();

  return (
    <>
      <Marker icon={hiddenIcon} position={station.location} ref={markerRef}>
        <Tooltip station={station} markerRef={markerRef} />
        <Popup offset={[0, -50]}>
          <h1>Station Name</h1>
          <p>13 San Isidro Norte, Binmaley, Pangasinan</p>
          <div>
            <ul>
              <li>U91</li>
              <li>U95</li>
              <li>Diesel</li>
            </ul>
          </div>
        </Popup>
      </Marker>
    </>
  );
};

export default StationLocationPin;
