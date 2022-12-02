import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center my-2">
      <div className="flex items-center justify-center ">
        <div className="w-[50px] h-[50px] border-b-[2px] border-t-[2px]  border-slate-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export default Loader;
