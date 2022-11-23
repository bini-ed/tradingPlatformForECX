import React, { useRef } from "react";
import Header from "../components/Header";
import Coffee from "../asset/coffee.png";
import Footer from "../components/Footer";
import Wheat from "../asset/wheat.jpg";
import Maize from "../asset/maize.jpeg";
import CoffeeFarm from "../asset/coffeFarm.jpg";
import Teff from "../asset/teff.jpg";

import AnimatedCoffee from "../asset/animated/coffee.png";
import AnimatedChickpeas from "../asset/animated/chickpeas.png";
import AnimatedCorn from "../asset/animated/corn.png";
import AnimatedSesame from "../asset/animated/sesame.png";
import AnimatedWheat from "../asset/animated/wheat.png";

function LandingPage() {
  const products = [
    { name: "Coffee", pic: AnimatedCoffee },
    { name: "Chickpeas", pic: AnimatedChickpeas },
    { name: "Wheat", pic: AnimatedWheat },
    { name: "Maize", pic: AnimatedCorn },
    { name: "Sesame", pic: AnimatedSesame },
  ];
  const aboutRef = useRef(null);
  const whatRef = useRef(null);
  const homeRef = useRef(null);

  const executeScroll = (ref) => {
    console.log(ref);
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };
  const farm = [
    { name: "Wheat", pic: Wheat },
    { name: "Maize", pic: Maize },
    { name: "Coffee", pic: CoffeeFarm },
    { name: "Teff", pic: Teff },
  ];
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
      <Header
        ref={[homeRef, aboutRef, whatRef]}
        onBackClick={executeScroll}
      ></Header>
      <div className="flex flex-col  bg-[#DEF2E6] pb-[600px] sm:pb-[500px] md:pb-[400px] ">
        <div className="flex flex-col md:flex-row justify-evenly items-center bg-[#DEF2E6] min-h-[30vh] md:min-h-[60vh]">
          <div
            ref={homeRef}
            className="flex flex-col justify-center items-center px-[20px]"
          >
            <h3 className="text-[#074E40] text-[25px] sm:text-[35px] md:text-[40px] lg:text-[50px] font-semibold">
              Welcome to ECX eTrading
            </h3>
            <p className="text-[#074E40] text-left text-[15px] sm:text-[20px] md:text-[20px] font-semibold">
              The simplest eTrading platform for agricultural products
            </p>
            <p className="bg-[#074E40] my-5 text-[18px] w-[60%] sm:w-[40%] md:w-[40%] max-w-[200px] text-white rounded-[20px] p-2">
              see autctions
            </p>
          </div>
          <img
            className="md:flex hidden"
            src={Coffee}
            style={{ width: "50%" }}
          ></img>
        </div>

        <div className="bg-[#cce2d4]">
          <div className="flex animate-marquee whitespace-nowrap items-center flex-row justify-center ">
            {products.map((product, index) => (
              <div
                className={`flex flex-col justify-center items-center rounded-lg w-[90%] my-2 md:w-[15%]                 // index % 2 == 0 ? "bg-[#EBFED3]" : "bg-[#E5FEEF]"
            `}
              >
                <img
                  src={product.pic}
                  className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] md:w-[40px] md:h-[40px]"
                ></img>
                <p className="text-[#074E40] text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] font-semibold">
                  {product.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between  min-h-[40vh] px-24 bg-[#ffffff] ">
          <p className="text-[16px] sm:text-[20px] lg:text-[25px] my-5 text-left w-[90%] text-[#074E40] font-semibold ">
            Our Product
          </p>
          <div className="min-h-[40vh] flex flex-col flex-wrap md:flex-row md:justify-around items-center">
            {farm.map((farms) => (
              <div className="flex flex-col w-[100%] md:w-[40%] lg:w-[20%]">
                <img
                  className="w-[100%] min-w-[150px] rounded-lg md:h-[250px] lg:h-[250px] xl:h-[300px]"
                  src={farms.pic}
                ></img>
                <p className="text-[16px] sm:text-[20px] lg:text-[30px] w-[90%] text-[#074E40] font-semibold ">
                  {farms.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={aboutRef}
          className="flex flex-col justify-center items-start min-h-[40vh] px-5 md:px-24"
        >
          <p className="text-[16px] md:text-[20px] lg:text-[25px] text-[#074E40] font-semibold ">
            About Us
          </p>
          <p className="text-left md:text-[20px]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid
            eos obcaecati ullam quaerat tempore! Esse facere debitis quasi
            eveniet ipsum nihil consectetur. Culpa totam, explicabo ab inventore
            consequuntur minima quae? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Praesentium quos corrupti rerum vero tempora. Amet
            ab, fugiat vero sint modi deserunt magnam, deleniti reiciendis rerum
            tempora, voluptas accusamus doloribus itaque!
          </p>
        </div>
        <div
          ref={whatRef}
          className="flex flex-col justify-center items-start min-h-[60vh] bg-[#01493b] p-10 md:px-[24px]"
        >
          <p className="text-[16px] md:text-[20px] lg:text-[25px] text-[#ffffff] font-semibold">
            Procedures
          </p>
          <div className="w-full flex flex-wrap justify-evenly">
            {procedure.map((procedures, index) => (
              <div
                key={index}
                className="border-[1.5px] border-[#ade2ce] border-solid flex flex-col justify-around m-2 rounded-lg p-5 md:w-[45%] lg:w-[30%]"
              >
                <div className="flex flex-row justify-between items-center">
                  <p className="text-left text-[16px] sm:text-[18px] md:text-[20px] text-[#ffffff] font-semibold">
                    {procedures.title}
                  </p>
                  <p className="bg-slate-300 p-2 rounded-lg">{index + 1}</p>
                </div>
                <p className="text-left text-[#ffffff] md:text-[18px]">
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
