import React, { forwardRef } from "react";
import Ethiopia from "../asset/ethiopia.png";

const Footer = forwardRef(({ onBackClick }, ref) => {
  const date = new Date();

  const navBar = [
    { name: "Home", ref: ref[0] },
    { name: "About", ref: ref[1] },
    { name: "What We Do", ref: ref[2] },
    { name: "Contact Us", ref: ref[0] },
    { name: "Sign Up", ref: ref[0] },
  ];
  return (
    <div className="bg-[#DEF2E6] flex flex-col items-center justify-evenly min-h-[350px] relative">
      <div className="flex flex-row justify-evenly">
        <div className="w-[25%] flex flex-col justify-start items-start">
          <p className="text-[green] font-semibold">ECX eTrading</p>
          <p className="w-[100%] text-left">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            quos ipsa hic nisi excepturi, quo in consequatur eius molestiae unde
            eaque veritatis, dolorem incidunt dignissimos sit officiis nihil?
            Exercitationem, veritatis.
          </p>
          <div className="flex items-center">
            <img src={Ethiopia} style={{ width: 30, height: 30 }}></img>
            <p className="mx-[5px]">Ethiopia, Addis Ababa</p>
          </div>
        </div>
        <div className=" w-[25%] flex flex-col justify-center items-center">
          <p className="text-[green] font-semibold">Pages</p>
          <div className={`flex flex-col w-full items-center`}>
            <div
              className={`flex hover:cursor-pointer flex-col justify-start  items-start
               `}
            >
              {navBar.map((nav, index) => (
                <p
                  onClick={() => {
                    onBackClick(nav.ref);
                  }}
                  className={`flex justify-center items-center text-[14px] md:text-[16px] py-2 rounded-lg  text-[#074E40] font-semibold                  
                  } 
              
              `}
                >
                  {nav.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[25%]">
          <p className="text-[green] font-semibold">Commodities</p>
          <p className="w-[100%]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            quos ipsa hic nisi excepturi, quo in consequatur eius molestiae unde
            eaque veritatis, dolorem incidunt dignissimos sit officiis nihil?
            Exercitationem, veritatis.
          </p>
        </div>
      </div>
      <p className="bg-[#a4d1a4] w-[100%] text-[20px] text-white py-[10px]">
        @{date.getFullYear()}
      </p>
    </div>
  );
});

export default Footer;
