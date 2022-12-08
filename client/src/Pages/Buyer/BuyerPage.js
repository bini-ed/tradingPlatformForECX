import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../../components/Carousel";
import CustomTable from "../../components/CustomTable";
import CustomToast from "../../components/CustomToast";
import Header from "../../components/Header";
import {
  addUserToAuctionService,
  getAllProductInAuctionRoomService,
} from "../../service/auctionService";

const BuyerPage = () => {
  const [auction, setAuction] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const getAllProduct = async () => {
    try {
      const { data } = await getAllProductInAuctionRoomService();
      if (data) setAuction(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async (auctionId, productId) => {
    setMessage("");
    setLoading(true);
    const token = localStorage.getItem("userInfo");
    try {
      const { data } = await addUserToAuctionService(
        auctionId,
        productId,
        token
      );

      if (data) {
        setMessage(data);
        handleOpen();
        getAllProduct();
      }
    } catch (error) {
      CustomToast("error", error.response.data || error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div>
      <Header ref={[]} />
      <Link
        to={"/auction"}
        className="p-3 my-3 w-fit absolute right-3 bg-[green] rounded-md text-white text-right font-semibold text-[18px]"
      >
        Join Auction
      </Link>
      <div className="px-[50px]">
        <h2 className="text-xl font-semibold my-10 text-left text-[#996D6D]">
          Upcoming Auction
        </h2>
        <Carousel
          message={message}
          handleAddUser={handleAddUser}
          loading={loading}
          auction={auction}
          open={open}
          setOpen={setOpen}
        />
        <h2 className="text-xl font-semibold my-10 text-left text-[#996D6D]">
          My Products
        </h2>
        <CustomTable auction={auction} count={auction.length} />
      </div>
    </div>
  );
};

export default BuyerPage;
