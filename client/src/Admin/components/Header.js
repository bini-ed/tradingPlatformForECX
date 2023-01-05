import React from "react";
import { Link } from "react-router-dom";

function Header({ user }) {
  return (
    <div className="w-full bg-slate-800 p-5">
      <div className="flex flex-row justify-between items-center">
        <Link to="/" className="text-white font-mono">
          ECX {user?.role} panel
        </Link>
        <div className="flex w-[40%] md:w-[30%] lg:w-[20%] justify-evenly items-center">
          <p className="text-white">
            Welcome {user ? user?.firstName : "Admin"}
          </p>
          <p
            className="bg-slate-300 cursor-pointer px-2 rounded-md"
            onClick={() => {
              localStorage.removeItem("userInfo");
              window.location = "/";
            }}
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
