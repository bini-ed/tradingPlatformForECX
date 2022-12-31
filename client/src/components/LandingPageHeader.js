import React, { forwardRef, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const LandingPageHeader = forwardRef(({ onBackClick }, ref) => {
  const authContext = useContext(AuthContext);
  const { user, setUser } = authContext;
  const navBar = [
    { name: "Home", ref: ref[0] ?? "" },
    { name: "About", ref: ref[1] ?? "" },
    { name: "Procedures", ref: ref[2] ?? "" },
    { name: "Contact Us", ref: ref[0] ?? "" },
  ];

  const [height, setHeight] = useState(window.scrollY);
  const [width, setWidth] = useState(window.innerWidth);
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => setHeight(window.scrollY));
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      window.innerWidth < 768 ? setShowNavBar(true) : setShowNavBar(false);
    });

    return () => {
      window.removeEventListener("scroll", () => setHeight());
      window.removeEventListener("resize", () => setWidth());
    };
  }, [width]);

  return (
    <div
      className={`flex bg-[#ffffff] items-center p-[20px] drop-shadow-md
      ${width > 768 ? "flex-row justify-between items-center" : "flex-col"}
      ${height > 50 && "sticky w-full top-0 z-10 bg-[#d4f6e2]"}
      `}
    >
      <div className="w-full  md:w-[40%] pl-[20px] flex">
        {width < 768 && showNavBar ? (
          <Link
            to="/"
            onClick={() => setShowNavBar(!showNavBar)}
            className="text-[#074E40] text-left hover:cursor-pointer text-[20px] md:text-[18px] lg:text-[20px] font-bold"
          >
            ECX eTrading
          </Link>
        ) : (
          <Link
            to={"/"}
            onClick={() => {
              setShowNavBar(!showNavBar);
            }}
            className="text-[#074E40] hover:cursor-pointer text-[20px] md:text-[18px] lg:text-[20px] font-bold"
          >
            ECX eTrading
          </Link>
        )}
      </div>

      <div
        className={`flex ${
          showNavBar && width < 770 ? "hidden " : "flex-col w-full "
        } 
      `}
      >
        <div
          className={`flex hover:cursor-pointer ${
            width < 770
              ? "flex-col justify-center items-center"
              : "flex-row justify-end "
          }`}
        >
          {navBar.map((nav, index) => (
            <p
              onClick={() => {
                if (index == 4) {
                  window.location = "/signup";
                } else {
                  onBackClick(nav.ref);
                }
                setShowNavBar(!showNavBar);
              }}
              className={`text-[14px] md:text-[15px] lg:text-[16px] p-2 rounded-lg  text-[#074E40] font-semibold lg:mx-2 ${
                index == 4 ? "bg-green-600 text-[#ffffff] p-2 rounded-lg" : ""
              } 
            ${
              width < 768
                ? "my-2 w-[100%] bg-[#38ab94] hover:bg-[#074E40] hover:text-[white] p-2 rounded-md text-white"
                : "hover:text-[#ad8942]"
            }
            `}
            >
              {nav.name}
            </p>
          ))}

          {user?.firstName ? (
            <div
              className={`flex ${
                width > 768
                  ? "flex-row justify-between items-center"
                  : "flex-col"
              }`}
            >
              <p
                onClick={() => {
                  window.location = "/seller";
                }}
                className={`text-[14px] md:text-[15px] lg:text-[16px] bg-orange-300 hover:bg-[#60c4b0] hover:text-white  font-semibold lg:mx-2 text-white px-2 py-1 rounded-lg  ${
                  width < 768
                    ? "my-2 w-[100%] hover:bg-[#074E40] p-2 rounded-md text-white"
                    : ""
                }`}
              >
                Sell Product
              </p>

              <p
                onClick={() => {
                  window.location =
                    user.role.toLowerCase() == "admin" ||
                    user.role.toLowerCase() == "warehouse"
                      ? `/admin`
                      : "/buyer";
                }}
                className={`text-[14px] md:text-[15px] lg:text-[16px] text-[#60c4b0] font-semibold lg:mx-2  p-2 rounded-lg  ${
                  width < 768
                    ? "my-2 w-[100%]  hover:bg-[#074E40] p-2 rounded-md hover:text-white"
                    : "hover:text-[#ad8942]"
                }`}
              >
                Welcome {user?.firstName}
              </p>
            </div>
          ) : (
            <p
              onClick={() => {
                window.location = "/signup";
              }}
              className={`text-[14px] md:text-[15px] lg:text-[16px]   hover:bg-[#60c4b0] hover:text-white  font-semibold lg:mx-2 bg-green-600 text-[#ffffff] p-2 rounded-lg  ${
                width < 768
                  ? "my-2 w-[100%] bg-[#38ab94] hover:bg-[#074E40] p-2 rounded-md text-white"
                  : ""
              }`}
            >
              Sign up
            </p>
          )}
        </div>
      </div>
    </div>
  );
});
export default LandingPageHeader;
