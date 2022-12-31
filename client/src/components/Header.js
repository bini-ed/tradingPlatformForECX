import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [height, setHeight] = useState(window.scrollY);
  useEffect(() => {
    window.addEventListener("scroll", () => setHeight(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setHeight());
    };
  }, []);

  return (
    <div
      className={`flex justify-around bg-[#ffffff] items-center p-5 drop-shadow-md
      ${height > 50 && "sticky w-full top-0 z-10 bg-[#d4f6e2]"}
      `}
    >
      <Link
        to="/"
        className="text-[#074E40] px-[20px] text-left hover:cursor-pointer text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-bold"
      >
        ECX eTrading
      </Link>

      <div className=" w-[50%] md:w-[70%] flex justify-end">
        <Link
          to={"/userInfo"}
          className="text-slate-600 cursor-pointer hover:animate-pulse p-2 font-semibold text-[14px] sm:text-[16px] md:text-[18px] mx-2"
        >
          My Profile
        </Link>
        <p
          onClick={() => {
            localStorage.removeItem("userInfo");
            window.location = "/";
          }}
          className="text-slate-600 cursor-pointer hover:animate-pulse p-2 font-semibold text-[14px] sm:text-[16px] md:text-[18px] mx-2"
        >
          Log out
        </p>
      </div>
    </div>
  );
};
export default Header;
