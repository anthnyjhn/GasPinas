import React, { useEffect, useState } from "react";

const BottomToolbar = () => {
  const [searchRadius, setSearchRadius] = useState(5);
  const [fuelType, setFuelType] = useState("u91");

  const refreshMap = () => {
    console.log(searchRadius, fuelType);
  };

  const handlerSliderChange = (e) => {
    let range = e.target.value;
    if (range >= 5 && range <= 150) {
      setSearchRadius(range);
    }
  };

  const handleFuelTypeChange = (e) => {
    const selectedFuelType = e.target.value;
    setFuelType(selectedFuelType);
  };

  useEffect(() => {
    refreshMap();
  }, [fuelType, searchRadius]);

  return (
    <div className="absolute w-full bottom-8 sm:mb-5 z-1000 flex justify-center">
      <div className="bg-[#242424] backdrop-blur-md p-2.5 h-20 rounded-4xl w-[90vw] shadow sm:w-3xl grid grid-cols-2">
        <div className=" flex items-center justify-center border-r-2 border-[#333333] pr-2">
          <select
            name="fuelTypeInput"
            id=""
            className=" w-full h-4/5 text-center text-[#AEAEAE] bg-[#242424] appearance-auto"
            onChange={handleFuelTypeChange}
            defaultValue={0}
          >
            <option value="u91" className="bg-[#242424]">
              Unleaded 91
            </option>
            <option value="u95" className="bg-[#242424]">
              Unleaded 95 - Premium
            </option>
            <option value="dl" className="bg-[#242424] active:bg-white ">
              Diesel
            </option>
          </select>
        </div>
        <div className="pl-2 mx-2">
          <div className="mb-1">
            <p className="text-[#AEAEAE] text-center">
              Search Radius ({searchRadius}km)
            </p>
          </div>
          <div className="flex justify-center items-center max-w-full">
            <p className="text-[#939393]">5</p>
            <input
              type="range"
              name="searchRadius"
              id="searchRadiusInput"
              min={5}
              max={150}
              className="mx-1 min-w-9/12 accent-[#AEAEAE]"
              onChange={handlerSliderChange}
              defaultValue={5}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            />
            <p className="text-[#AEAEAE]">150</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomToolbar;
