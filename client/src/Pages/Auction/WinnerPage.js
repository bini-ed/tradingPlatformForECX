import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { getSpecificProductInAuctionRoomService } from "../../service/auctionService";

const WinnerPage = () => {
  const { productId, amount } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProductInforamtion();
    return () => {
      setProduct({});
    };
  }, []);

  const getProductInforamtion = async () => {
    try {
      const { data } = await getSpecificProductInAuctionRoomService(productId);
      if (data) setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(product);
  return (
    <div className="flex flex-col bg-[#2d5e54]  min-h-[calc(100vh-84px)] justify-center items-center">
      <div className="flex flex-col flex-1 px-20">
        <h3 className="text-white font-mono text-2xl">
          Congratulation you have won the auction
        </h3>
        <div className="bg-[#eee799] my-5 rounded-md w-[100%]">
          <p className="font-mono text-3xl ">
            {product?.product?.product?.productName}
          </p>
          <p className="font-mono text-lg ">
            {product?.product?.product?.productType}
          </p>
          <p className="font-mono text-lg ">
            {product?.product?.product?.location}
          </p>
          <p className="font-mono text-lg ">
            {product?.product?.product?.grade}
          </p>
          <div className="border-t-[#367836] border-t-2">
            <p>
              Seller {product?.product?.product?.seller.firstName}{" "}
              {product?.product?.product?.seller.lastName}
            </p>
          </div>
        </div>
        <p className="text-white text-3xl animate-bounce font-mono">
          Sold for {amount} ETB
        </p>
        <Link to={"/seller"}>
          <p className="bg-green-300 rounded-lg p-2 text-slate-800 font-semibold">
            Please pay the required amount
          </p>
        </Link>
      </div>
    </div>
  );
};

export default WinnerPage;
