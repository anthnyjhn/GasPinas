import React from "react";

const Header = () => {
  return (
    <div className="absolute top-0 left-0 w-full z-[1000] p-4 ">
      <div className="bg-[#242424] backdrop-blur-md p-3 backdrop-blur-md bg-[rgba(10,10,10,0.81)] rounded-xl shadow text-center">
        <h1 className="text-lg font-semibold text-white">
          <a href="/">
            {" "}
            <b>Gas</b>Pinas
          </a>
        </h1>
      </div>
    </div>
  );
};

export default Header;
