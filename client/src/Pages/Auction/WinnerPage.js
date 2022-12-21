import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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

  return (
    <div className="flex flex-col  min-h-screen">
      <Header ref={[]} />

      <div className="flex flex-col flex-1 bg-[#074E40] px-20">
        {/* <h3 className="text-white font-mono text-2xl">
          Congratulation you have won the auction
        </h3> */}
        <div className="bg-[#eee799] my-5 rounded-md w-[90%] md:w-[40%] lg:w-[20%]">
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
      </div>
    </div>
  );
};

export default WinnerPage;
