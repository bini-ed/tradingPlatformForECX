import React, { useEffect, useRef, useState } from "react";
import Carousel from "../../components/Carousel";
import CustomTable from "../../components/CustomTable";
import Header from "../../components/Header";

const BuyerPage = () => {
  const [auction, setAuction] = useState([
    { name: "Sidama Coffee", type: "Washed", grade: "A", basePrice: "200/KG" },
    { name: "Harar Coffee", type: "Washed", grade: "A", basePrice: "200/KG" },
    { name: "Jima Coffee", type: "Washed", grade: "A", basePrice: "200/KG" },
    { name: "Jima Coffee", type: "Washed", grade: "A", basePrice: "200/KG" },
    { name: "Jima Coffee", type: "Washed", grade: "A", basePrice: "200/KG" },
    { name: "Jima Coffee", type: "Washed", grade: "A", basePrice: "200/KG" },
    { name: "Jima Coffee", type: "Washed", grade: "A", basePrice: "200/KG" },
    { name: "Jima Coffee", type: "Washed", grade: "A", basePrice: "200/KG" },
    { name: "Jima Coffee", type: "Washed", grade: "A", basePrice: "200/KG" },
    { name: "Jima Coffee", type: "Washed", grade: "A", basePrice: "200/KG" },
    { name: "Jima Coffee", type: "Washed", grade: "A", basePrice: "200/KG" },
  ]);
  return (
    <div>
      <Header ref={[]} />
      <div className="px-[50px]">
        <h2 className="text-xl font-semibold my-10 text-left text-[#996D6D]">
          Upcoming Auction
        </h2>
        <Carousel auction={auction} />
        <h2 className="text-xl font-semibold my-10 text-left text-[#996D6D]">
          My Products
        </h2>
        <CustomTable auction={auction} count={auction.length} />
      </div>
    </div>
  );
};

export default BuyerPage;
