import React, { forwardRef, useEffect, useState } from "react";

const Header = forwardRef(({ onBackClick }, ref) => {
  const [height, setHeight] = useState(window.scrollY);
  const [width, setWidth] = useState(window.innerWidth);
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => setHeight(window.scrollY));
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener("scroll", () => setHeight());
      window.removeEventListener("resize", () => setWidth());
    };
  }, []);

  const navBar = [
    { name: "Home", ref: ref[0] },
    { name: "About", ref: ref[1] },
    { name: "What We Do", ref: ref[2] },
    { name: "Contact Us", ref: ref[0] },
    { name: "Sign Up", ref: ref[0] },
  ];
  useEffect(() => {
    window.innerWidth < 768 ? setShowNavBar(true) : setShowNavBar(false);
  }, [width]);
  return (
    <div
      className={`flex bg-[#DEF2E6] items-center p-[20px] drop-shadow-md
      ${height > 50 ? "sticky top-0 z-[1] bg-[#ffffff]" : ""}
      ${width > 768 ? "flex-row justify-between items-center" : "flex-col"}
      `}
    >
      <div className="w-full md:w-[60%] lg:w-[100%]">
        {width < 768 && showNavBar ? (
          <p
            // src={Menu}
            onClick={() => setShowNavBar(!showNavBar)}
            // style={{ width: 50, height: 50 }}
            className="text-[#074E40] hover:cursor-pointer text-[20px] font-bold"
          >
            ECX eTrading
          </p>
        ) : (
          <h2
            onClick={() => {
              setShowNavBar(!showNavBar);
            }}
            className="text-[#074E40] hover:cursor-pointer text-[20px] font-bold"
          >
            ECX eTrading
          </h2>
        )}
      </div>

      <div
        className={`flex  ${
          showNavBar && width < 768 ? "hidden " : "flex-col w-full "
        } 
      `}
      >
        <div
          className={`flex hover:cursor-pointer ${
            width < 768 ? "flex-col justify-center items-center" : "flex-row"
          }`}
        >
          {navBar.map((nav, index) => (
            <p
              onClick={() => {
                onBackClick(nav.ref);
                setShowNavBar(!showNavBar);
              }}
              className={`flex justify-center items-center text-[14px] md:text-[16px] p-2 rounded-lg hover:bg-[#60c4b0] hover:text-white text-[#074E40]  font-semibold mx-2 ${
                index == 4 ? "bg-green-600 text-white p-2 rounded-lg" : ""
              } 
              ${
                width < 768
                  ? "my-2 w-[100%] bg-[#38ab94] hover:bg-[#074E40] p-2 rounded-md text-white"
                  : ""
              }
              `}
            >
              {nav.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Header;
