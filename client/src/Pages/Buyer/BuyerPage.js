import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../../components/Carousel";
import CustomAppTable from "../../components/CustomAppTable";
import CustomTable from "../../components/CustomTable";
import CustomToast from "../../components/CustomToast";
import Header from "../../components/Header";
import {
  addUserToAuctionService,
  getAllProductInAuctionRoomService,
} from "../../service/auctionService";
import moment from "moment";

const BuyerPage = () => {
  const [auction, setAuction] = useState([]);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("");
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

  let filteredAuction = auction?.filter((role) =>
    role?.productName?.match(new RegExp(filter, "i"))
  );

  return (
    <div>
      <Header ref={[]} />

      <Link
        style={{ pointerEvents: auction.length ? "" : "none" }}
        to={"/auction"}
        className={`p-3 my-3 w-fit absolute right-3 ${
          auction.length ? "bg-[green]" : "bg-[grey]"
        } rounded-md text-white text-right font-semibold text-[18px]`}
      >
        Join Auction
      </Link>
      <div className="px-[50px]">
        <h2 className="text-2xl font-semibold mt-10 text-left text-[#996D6D]">
          Upcoming Auction
        </h2>
        {auction.map((auctions, index) => (
          <div key={index}>
            {auctions?.auctionRoom?.length ? (
              <Carousel
                key={index}
                message={message}
                handleAddUser={handleAddUser}
                loading={loading}
                auction={auctions?.auctionRoom}
                open={open}
                setOpen={setOpen}
                date={moment(auctions?.auctionRoom[0]?.date).format("dddd")}
              />
            ) : (
              <p className="text-[brown] font-mono text-lg">
                No upcoming auction at the moment
              </p>
            )}
          </div>
        ))}
        <h2 className="text-xl font-semibold my-10 text-left text-[#996D6D]">
          My Products
        </h2>

        <CustomAppTable
          column={[
            {
              productName: "Product Name",
              scoreValue: "Score Value",
              fee: "Fee to join",
            },
          ]}
          field={filteredAuction}
          count={filteredAuction.length}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
    </div>
  );
};

export default BuyerPage;
