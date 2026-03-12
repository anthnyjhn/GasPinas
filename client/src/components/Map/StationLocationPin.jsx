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
      </Marker>
    </>
  );
};

const LocationPin = ({ station }) => {
  const markerRef = useRef();

  console.log(station);
  return (
    <>
      <Marker icon={hiddenIcon} position={station.location} ref={markerRef}>
        <Tooltip station={station} markerRef={markerRef} />
      </Marker>
    </>
  );
};

{
  /* <Popup offset={[0, -50]}>
          <h1>{station.stationName}</h1>
          <p>{station.address}</p>
          {station.fuel.map((fuel, index) => (
            <li key={index}>
              {fuel.Type}: ₱{fuel.Price}
            </li>
          ))}
        </Popup> */
}

export default StationLocationPin;
