import React from "react";

function Header({ user }) {
  return (
    <div className="w-full bg-slate-800 p-5">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-white font-mono">ECX staff panel</h2>
        <div className="flex w-[40%] md:w-[30%] lg:w-[20%] justify-evenly items-center">
          <p className="text-white">
            Welcome {user ? user.firstName : "Admin"}
          </p>
          <p className="bg-slate-300 px-2 rounded-md">Logout</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
