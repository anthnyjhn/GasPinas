import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-blue-500 h-[100px]">
      <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "normal" }}>
        <a href="/" style={{ textDecoration: "none", color: "white" }}>
          <b>GAS</b>PINAS
        </a>
      </h1>
    </header>
  );
};

export default Header;
