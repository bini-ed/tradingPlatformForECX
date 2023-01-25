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
      className={`flex  bg-[#FFFFFFe6] items-center p-[8px] max-lg:p-[2px] drop-shadow-md sticky top-0 left-0 right-0 
      ${width > 768 ? "flex-row justify-between items-center" : "flex-row"}
      ${user?.firstName ? "flex-row justify-around items-center w-full" : ""}
      ${height > 50 && "sticky w-full top-0 z-10 bg-[#ffffffe6]"}
      `}
    >
      <div className="w-full ml-8 pl-[40px] md:w-[50%] pt-0 flex max-lg:hidden">
        {width < 768 && showNavBar ? (
          <Link
            to="/"
            onClick={() => setShowNavBar(!showNavBar)}
            className="text-[#000000] text-left hover:cursor-pointer text-[20px] md:text-[18px] lg:text-[20px] font-bold"
          >
            ECX <p className="text-[#31de79] inline">eTRADING</p>
          </Link>
        ) : (
          <Link
            to={"/"}
            onClick={() => {
              setShowNavBar(!showNavBar);
            }}
            className="text-[#000000] hover:cursor-pointer text-[20px] md:text-[18px] lg:text-[20px] font-bold"
          >
            ECX <p className="text-[#31de79] inline">eTRADING</p>{" "}
          </Link>
        )}
      </div>

      <div
        className={`flex ${showNavBar && width < 770 ? "" : "flex-row  "} 
      `}
      >
        <div
          className={`flex hover:cursor-pointer ${
            width < 770
              ? "flex-row justify-center items-center"
              : "flex-row justify-end"
          }`}
        >
          {width > 1024 &&
            navBar.map((nav, index) => (
              <p
                onClick={() => {
                  if (index === 4) {
                    window.location = "/signup";
                  } else {
                    onBackClick(nav.ref);
                  }
                  setShowNavBar(!showNavBar);
                }}
                className={`text-[14px] md:text-[15px] lg:text-[16px] px-5 pt-4 rounded-lg  text-[#000000] font-light lg:mx-2 ${
                  index === 3 ? "" : ""
                } 
            ${width < 768 ? "" : "hover:text-[#ad8942]"}
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
                  : "flex-row justify-between items-center"
              }`}
            >
              {user?.role !== "admin" && user?.role !== "warehouse" ? (
                <p
                  onClick={() => {
                    window.location = "/seller";
                  }}
                  className={`text-[12px] md:text-[15px] lg:text-[16px] text-[black]    font-light lg:mx-2  px-2 py-1 rounded-lg  ${
                    width < 768
                      ? "my-2 w-[100%] hover:bg-[#074E40] p-2 rounded-md text-white"
                      : "hover:text-[#ad8942]"
                  }`}
                >
                  Offer
                </p>
              ) : (
                ""
              )}

              <p
                onClick={() => {
                  window.location =
                    user.role.toLowerCase() === "admin" ||
                    user.role.toLowerCase() === "warehouse"
                      ? `/admin`
                      : "/buyer";
                }}
                className={`text-[12px] md:text-[15px] lg:text-[16px] text-[#000000] font-light lg:mx-2  p-4 rounded-lg  ${
                  width < 768
                    ? "my-2 w-[100%]  hover:bg-[#074E40] p-2 rounded-md hover:text-white"
                    : "hover:text-[#ad8942]"
                }`}
              >
                Welcome {user?.firstName}
              </p>
            </div>
          ) : (
            ""
            /*  <p
              onClick={() => {
                window.location = "/signup";
              }}
              className={`text-[10px] md:text-[12px] lg:text-[12px]   hover:bg-[#60c4b0] hover:text-white  font-semibold lg:mx-2 bg-green-600 text-[#ffffff] p-2  rounded-lg  ${
                width < 768
                  ? "my-2 w-[100%] bg-[#38ab94] hover:bg-[#074E40]  rounded-md text-white"
                  : ""
              }`}
            >
              Sign up
            </p> */
          )}
        </div>
      </div>
    </div>
  );
});
export default LandingPageHeader;
