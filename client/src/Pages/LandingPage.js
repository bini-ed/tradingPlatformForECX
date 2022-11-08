import React, { useRef } from "react";
import Header from "../components/Header";
import Coffee from "../asset/coffee.png";
import Footer from "../components/Footer";

function LandingPage() {
  const products = [
    { name: "COFEE", pic: Coffee },
    { name: "BEAN", pic: Coffee },
    { name: "WHEAT", pic: Coffee },
    { name: "MAIZE", pic: Coffee },
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
  return (
    <div className="min-h-screen relative pb-[350px]">
      <Header
        ref={[homeRef, aboutRef, whatRef]}
        onBackClick={executeScroll}
      ></Header>
      <div className="flex flex-col  ">
        <div className="flex flex-col md:flex-row justify-evenly items-center bg-[#DEF2E6] min-h-[30vh] md:min-h-[60vh]">
          <div
            ref={homeRef}
            className="flex flex-col justify-center items-center px-[20px]"
          >
            <h3 className="text-[#074E40] text-[25px] sm:text-[35px] md:text-[50px] font-semibold">
              Welcome to ECX eTrading
            </h3>
            <p className="text-[#074E40] text-left text-[15px] sm:text-[20px] md:text-[20px] font-semibold">
              The simplest eTrading platform for agricultural products
            </p>
            <p className="bg-[#074E40] my-5 text-[18px] w-[60%] sm:w-[40%] md:w-[30%] text-white rounded-[20px] p-2">
              see autctions
            </p>
          </div>
          <img
            className="md:flex hidden"
            src={Coffee}
            style={{ width: "50%" }}
          ></img>
        </div>
        <div className="flex flex-col items-center md:flex-row md:justify-evenly my-10">
          {products.map((product, index) => (
            <div
              className={`flex flex-col justify-center items-center rounded-lg w-[90%] my-2 md:w-[15%]  ${
                index % 2 == 0 ? "bg-[#EBFED3]" : "bg-[#E5FEEF]"
              }`}
            >
              <p className="text-[#074E40] text-[20px] font-semibold">
                {product.name}
              </p>
              <img src={product.pic} style={{ width: 150, height: 150 }}></img>
            </div>
          ))}
        </div>
        <div
          ref={aboutRef}
          className="flex flex-col justify-center items-start min-h-[40vh] bg-[#DEF0DB] px-24"
        >
          <p className="text-[30px] text-[#074E40] font-bold ">About Us</p>
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
          className="flex flex-col justify-center items-start min-h-[70vh] bg-[#ffffff] px-24"
        >
          <p className="text-[30px] text-[#074E40] font-bold ">What we do</p>
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
        <div className="w-full absolute bottom-0 ">
          <Footer
            ref={[homeRef, aboutRef, whatRef]}
            onBackClick={executeScroll}
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
