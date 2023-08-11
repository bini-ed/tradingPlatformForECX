import React, { useEffect, useState } from "react";
import CustomToast from "../../components/CustomToast";
import Loader from "../../components/Loader";
import AuctionTable from "../components/AuctionTable";
import {
  getAuctionService,
  startAuctionService,
} from "../service/auctionService";

const Auctions = () => {
  const [auctions, setAuction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getAuction();
  }, []);

  const getAuction = async () => {
    setLoading(true);
    try {
      const { data } = await getAuctionService();

      setAuction(data);
    } catch (error) {
      console.log(error.response.data);
    }
    setLoading(false);
  };
  const startAuction = async (id) => {
    setLoading(true);
    try {
      const { data } = await startAuctionService(id);
      if (data) {
        getAuction();
        CustomToast("success", "Auction started");
      }
    } catch (error) {
      CustomToast("error", error?.response?.data || error.message);
    }
    setLoading(false);
  };

  // let filteredProduct = auctions?.filter(
  //   (field) =>
  //     field?.product?.product?.productName?.match(new RegExp(filter, "i")) ||
  //     field?.product?.productQuantity?.match(new RegExp(filter, "i"))
  // );
  return (
    <div>
      {loading ? (
        <Loader />
      ) : auctions.length ? (
        <AuctionTable
          count={auctions.length}
          field={auctions}
          filter={filter}
          setFilter={setFilter}
          handler={startAuction}
        />
      ) : (
        <p className="text-[brown] font-mono">No Auction Found</p>
      )}
    </div>
  );
};

export default Auctions;
