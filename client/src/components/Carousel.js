import React, { useContext, useEffect, useRef, useState } from "react";
import moment from "moment";

import AuthContext from "../context/AuthContext";
import CustomModal from "../utils/CustomModal";
import Loader from "./Loader";

const Carousel = ({
  auction,
  message,
  loading,
  handleAddUser,
  open,
  setOpen,
}) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClose = () => setOpen(false);
  const { user } = useContext(AuthContext);
  const carousel = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div>
      <div className="relative overflow-hidden">
        {loading ? (
          <Loader />
        ) : (
          <CustomModal
            handleClose={handleClose}
            open={open}
            description={message}
          />
        )}
        <div className="flex justify-between absolute top left w-full h-full">
          <button
            onClick={movePrev}
            className="hover:bg-green-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled("prev")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>

            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="hover:bg-green-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled("next")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
        >
          {auction.map((resource, index) => {
            return (
              <div
                key={index}
                className="carousel-item flex flex-col rounded-[20px] w-72 mx-5 snap-start"
              >
                {console.log(resource)}
                <div className="p-5 flex flex-col bg-[#DEEFE3] w-72 h-48 rounded-t-[10px]">
                  <h3 className="text-xl font-semibold text-left text-[#074E40]">
                    {resource?.product?.product?.productName}
                  </h3>
                  <div className="h-full w-full flex flex-col items-start my-5">
                    <p className="text-[16px] font-mono text-[#3D5833]">
                      Type: {resource?.product?.product?.productType}
                    </p>

                    {resource?.product?.grade && (
                      <p className="text-[16px] font-mono text-[#3D5833]">
                        Grade: {resource?.product?.product?.grade}
                      </p>
                    )}
                    <p className="text-[16px] font-mono text-[#3D5833]">
                      Quantity: {resource?.product?.productQuantity}
                    </p>
                    <p className="text-[16px] font-mono text-[#3D5833]">
                      Location: {resource?.product?.product?.location}
                    </p>
                  </div>
                </div>

                <div className="z-[10] w-full h-24 px-5 flex flex-col bg-[#3E363F] rounded-b-[10px]">
                  <p className="text-white text-left font-mono">
                    Starts at {moment(resource?.date).format("D-MMM-YYYY")}
                  </p>

                  {(() => {
                    const checkuser = resource?.users?.find(
                      (users) => users._id == user.id
                    );

                    if (checkuser)
                      return (
                        <p
                          onClick={() =>
                            handleAddUser(resource._id, resource?.product?._id)
                          }
                          className="font-semibold bg-[#509666] cursor-pointer text-[#ffffff] my-5 self-end rounded-md py-2 w-[70%]"
                        >
                          Registerd
                        </p>
                      );
                    else
                      return (
                        <p
                          onClick={() =>
                            handleAddUser(resource._id, resource?.product?._id)
                          }
                          className="font-semibold bg-[#ffffff] cursor-pointer text-[#074E40] my-5 self-end rounded-md py-2 w-[70%]"
                        >
                          Register for Auction
                        </p>
                      );
                  })()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
