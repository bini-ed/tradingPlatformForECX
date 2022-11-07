import React from "react";

function Header() {
  const navBar = [
    { name: "Home" },
    { name: "About" },
    { name: "What We Do" },
    { name: "Contact Us" },
    { name: "Sign Up" },
  ];
  return (
    <div className="flex flex-row bg-[#DEF2E6] justify-between items-center p-[20px]">
      <h2 className="text-[#074E40]">ECX eTrading</h2>
      <div className="flex flex-row items-center">
        {navBar.map((nav, index) => (
          <div
            className={`text-[#074E40] mx-2 items-center ${
              index == 4 ? "bg-green-600 text-white p-2 rounded-lg" : ""
            }`}
          >
            {nav.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Header;
