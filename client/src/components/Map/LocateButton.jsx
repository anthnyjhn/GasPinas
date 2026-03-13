import React from "react";
import { useMap } from "react-leaflet";
import LocateIcon from "../../assets/images/loc.svg";

const LocateButton = ({ setUserLocation }) => {
  const map = useMap();

  const locateUser = () => {
    map.locate();
  };

  map.on("locationfound", (e) => {
    setUserLocation(e.latlng);
    map.flyTo(e.latlng, map.getZoom(), {
      animate: true,
      duration: 1.5,
    });
  });

  return (
    <div className="absolute top-0 right-0 z-1000 m-5">
      <div className="backdrop-blur-md p-2.5 bg-[rgba(36,36,36,0.9)] w-9 h-9 rounded-xl shadow text-center flex justify-center items-center">
        <button onClick={locateUser}>
          <span className="fa fa-location-arrow text-[#AEAEAE] hover:text-white shadow"></span>
        </button>
      </div>
    </div>
  );
};

export default LocateButton;
