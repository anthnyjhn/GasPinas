import React from "react";
import { useMap } from "react-leaflet";
import LocateIcon from "../../assets/images/loc.svg";

const MapControl = ({ setUserLocation }) => {
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
    <div className="absolute top-0 right-0 z-[1000] m-[20px]">
      <div className="bg-[#242424] backdrop-blur-md p-2.5 backdrop-blur-md bg-[rgba(10,10,10,0.81)] w-9 h-9 rounded-xl shadow text-center flex justify-center items-center">
        <button onClick={locateUser}>
          <img src={LocateIcon} alt="loc" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default MapControl;
