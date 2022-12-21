import React from "react";

const CustomModal = ({ text, onClick }) => {
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%]">
          <div className="rounded-lg shadow-lg relative flex flex-col items-center w-full bg-[white] outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5  rounded-t">
              <p2 className="text-xl text-center text-[#a71b1b] font-semibold">
                Oops, You have lost on this auction try again with another
                auction
              </p2>
            </div>
            <div className="bg-[#074E40] rounded-md cursor-pointer p-2 my-5">
              <p onClick={onClick} className="text-white">
                Go back to auctions
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-10 bg-black"></div>
    </div>
  );
};

export default CustomModal;
