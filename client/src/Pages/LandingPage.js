import React, { useContext, useRef, useState } from "react";
import Coffee from "../asset/coff.jpg";
import Footer from "../components/Footer";
import { Govern, Laws, Message, Works } from "./About";

import LandingPageHeader from "../components/LandingPageHeader";
import AuthContext from "../context/AuthContext";

function LandingPage() {
  const { user, setUser } = useContext(AuthContext);

  const [width, setWidth] = useState(window.innerWidth);

  const aboutRef = useRef(null);
  const whatRef = useRef(null);
  const homeRef = useRef(null);

  const [message, setMessage] = useState("");
  const [laws, setLaws] = useState("laws");
  const [govern, setGovern] = useState("");
  const [works, setWorks] = useState("");
  const [touched, setTouched] = useState(Works);

  const lawsClickHandler = () => {
    setLaws(Laws);
    setTouched(Laws);
  };
  const governanceClickHandler = () => {
    setGovern(Govern);
    setTouched(Govern);
  };
  const worksClickHandler = () => {
    setWorks(Works);
    setTouched(Works);
  };
  const messageClickHandler = () => {
    setMessage(Message);
    setTouched(Message);
  };

  const executeScroll = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  const procedure = [
    {
      title: "Register",
      description:
        "Every user should register before participating in any auction. Signup form will be provided to allow users to register.",
    },
    {
      title: "Active autcions",
      description:
        "After you have been registered you need to login to the system and will be able to see available auctions",
    },
    {
      title: "How to join auctions",
      description:
        "Autcion date and time will be displayed in upcoming auctions tab where you can view upcoming auctions.",
    },
    {
      title: "Joining an auction",
      description:
        "After you find your desired auction, press participate in the auction button. You can only join an auction if its state is active",
    },
    {
      title: "Start bidding",
      description:
        "You can start bidding only when the auction is started by the admins it'll notify the user when the auction is started",
    },
    {
      title: "Complete Auction",
      description:
        "The auction will be done when the allocated time is reached and the system automatically selctes the highest bid",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <LandingPageHeader
        ref={[homeRef, aboutRef, whatRef]}
        onBackClick={executeScroll}
      ></LandingPageHeader>
      <div className="flex flex-col  bg-[#ffffff] pb-[600px] sm:pb-[500px] md:pb-[400px] ">
        <div className="flex flex-col sm:flex-col max-lg:mt-20 lg:flex-row justify-start items-center bg-[#FFFFFF] min-h-[30vh] md:min-h-[60vh]">
          <h3
            className="text-[#0000004d] lg:text-left text-[14px]  sm:text-[14px] md:text-[16px] lg:text-[18px] font-semilight font-Nunito-sans ml-7 lg:flex hidden"
            style={{
              "writing-mode": "vertical-lr",
            }}
          >
            WELCOME TO ECX ETRADING
          </h3>
          <div ref={homeRef} className=" px-[35px]">
            <h3 className="text-[#31de79] lg:text-left text-[14px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-bold font-Nunito-sans">
              WELCOME TO ECX ETRADING
            </h3>
            <h3 className="text-[#000000] lg:text-left text-[20px] sm:text-[35px] md:text-[50px] font-semibold mb-1">
              Trust Worthy, Cost Effective{" "}
              <span className="font-light">and </span>
              <span className="text-[#195219]">Robust</span>{" "}
              <span className="font-light"> Trading System </span>
            </h3>
            <p className="text-[#000000] lg:text-left text-[15px] sm:text-[20px] md:text-[20px] font-semibold">
              The simplest eTrading platform for coffee.
            </p>
            {user?.firstName ? (
              ""
            ) : (
              <p
                onClick={() => {
                  window.location = "/signup";
                }}
                className={`text-[14px] md:text-[18px] lg:text-[18px] lg:text-left  hover:bg-[#60c4b0] hover:text-white cursor-pointer font-semibold mt-8 bg-[rgb(24,36,0)] bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-[#ffffff] py-4 px-10 inline-block  rounded-lg  ${
                  width < 768
                    ? "my-2 w-[100%] bg-[#38ab94] hover:bg-[#074E40]  rounded-md text-white"
                    : ""
                }`}
              >
                Sign up
              </p>
            )}
          </div>
          <img
            className=" h-screen max-lg:hidden  lg:flex w-1/2 "
            src={Coffee}
            /*  style={{ width: "50%", height: "100vh" }} */
            alt="coffee"
          ></img>
        </div>

        <div
          ref={aboutRef}
          className="flex flex-col justify-center items-start min-h-[40vh] px-5 md:px-24 max-lg:hidden"
        >
          <div className="text-[16px] md:text-[20px] lg:text-[25px]  flex flex-row ">
            <div className="bg-[#31de79] p-3 flex flex-col justify-start items-start text-[rgb(255,255,255,0.8)] pr-[4rem] min-w-[20rem] min-h-[40rem] z-10">
              <p
                className="text-[rgb(255,255,255,0.6] font-light  pb-[2rem] hover:cursor-pointer hover:font-extrabold"
                onClick={worksClickHandler}
              >
                HOW ECX WORKS
              </p>
              <p
                className="text-[rgb(255,255,255,0.6] font-light  pb-[2rem] hover:cursor-pointer hover:font-extrabold"
                onClick={messageClickHandler}
              >
                CEO'S MESSAGE
              </p>
              <p
                className="text-[rgb(255,255,255,0.6] font-light  pb-[2rem] hover:cursor-pointer hover:font-extrabold"
                onClick={lawsClickHandler}
              >
                LAWS AND RULES
              </p>
              <p
                className="text-[rgb(255,255,255,0.6] font-light   mb-[20rem] hover:cursor-pointer hover:font-extrabold"
                onClick={governanceClickHandler}
              >
                GOVERNANCE
              </p>
            </div>
            <div className="ml-[7rem] mt-[4rem] font-extralight text-[18px] text-left text-sm text-[rgb(255,255,255,0-8)] leading-relaxed ">
              {touched}
            </div>
          </div>
        </div>

        <div ref={whatRef} className=" min-h-[60vh] bg-coff  ">
          <p className="text-[16px] md:text-[20px] lg:text-[25px] text-[#ffffff] font-semibold">
            Procedures
          </p>
          <div className="w-full flex flex-col justify-center items-end ">
            {procedure.map((procedures, index) => (
              <div
                key={index}
                className="border-[1.5px] bg-[#ffffffe6] border-[#ade2ce] border-solid flex flex-col justify-around m-2 rounded-lg p-5 md:w-[45%] lg:w-[30%]"
              >
                <div className="flex flex-row justify-between items-center">
                  <p className="text-left text-[16px] text-[#31de79] sm:text-[18px] md:text-[20px] font-semibold">
                    {procedures.title}
                  </p>
                  <p className="bg-slate-300 p-2 rounded-lg">{index + 1}</p>
                </div>
                <p className="text-left text-[#000] md:text-[18px]">
                  {procedures.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full absolute bottom-0 ">
        <Footer
          ref={[homeRef, aboutRef, whatRef]}
          onBackClick={executeScroll}
        />
      </div>
    </div>
  );
}

export default LandingPage;
