import { Tooltip as LeafletTooltip } from "react-leaflet";

const Tooltip = ({ station, markerRef }) => {
  const handleTooltipClick = () => {
    markerRef?.current?.openPopup();
  };

  return (
    <LeafletTooltip
      permanent
      direction="top"
      eventHandlers={{ click: handleTooltipClick }}
      className="h-[55px] w-[50px] bg-white "
    >
      <div className="h-full w-full rounded-b-sm">
        <div className="bg-[#242424] h-[20px] text-white text-center w-12.5 rounded-t-sm">
          <b>₱</b> {station.price}
        </div>

        <div className="flex justify-center bg-white text-center w-[50px] h-[35px] rounded-b-sm items-center">
          {/* <img
            className="p-1"
            src={station.stationLogo}
            alt={station.stationName}
          /> */}
        </div>
      </div>
    </LeafletTooltip>
  );
};

export default Tooltip;
