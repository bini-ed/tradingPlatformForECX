import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CustomToast from "../../../components/CustomToast";
import Loader from "../../../components/Loader";
import { URL } from "../../../config";
import { getBidById } from "../../../service/bidService";
import LabelWithField from "../../components/LabelWithField";
import {
  approveTransactionService,
  getTransactionDetailService,
  penalizeUserService,
} from "../../service/transactionService";

const DeactivatedDetail = () => {
  const { transactionId, warehouseId } = useParams();
  console.log(transactionId);
  const [bid, setBid] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTransactionDetal();
  }, []);

  const getTransactionDetal = async () => {
    setLoading(true);
    try {
      const { data } = await getBidById(transactionId);
      if (data) setBid(data);
    } catch (error) {
      console.log(error.response.data ? error.response.data : error.message);
    }
    setLoading(false);
  };

  const penalizeUser = async () => {
    setLoading(true);
    try {
      const { data } = await penalizeUserService(transactionId);
      if (data) CustomToast("success", data);
    } catch (error) {
      CustomToast(
        "error",
        error.response.data ? error.response.data : error.message
      );
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col ">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-evenly flex-col md:flex-row flex-wrap px-20 ">
            <LabelWithField
              label={"Auction"}
              value={bid?.auctionId?.product?.product?.productName}
            />
            <LabelWithField
              label={"Product Grade"}
              value={bid?.auctionId?.product?.product?.grade}
            />
            <LabelWithField
              label={"Product Quantity"}
              value={bid?.auctionId?.product?.productQuantity + " KG"}
            />
            <LabelWithField
              label={"Auction Date"}
              value={moment(bid?.auctionId?.date).format("DD-MMM-YYYY")}
            />
            {/*
            <LabelWithField
              label={"Winner Bid"}
              value={
                transaction?.bids[transaction?.bids?.length - 1]?.amount +
                " ETB"
              }
            />

            <LabelWithField
              label={"Winner"}
              value={
                transaction?.bids[transaction?.bids.length - 1]?.buyerId
                  ?.firstName
              }
            /> 
            */}

            <LabelWithField
              label={"Expected to pay before"}
              value={moment(bid?.created_at)
                .add(3, "day")
                .format("DD-MMM-YYYY")}
            />
            <div className="w-[90%] md:w-[40%] my-5 h-[40px]"></div>
          </div>

          <p
            onClick={penalizeUser}
            className={`self-center my-10 cursor-pointer bg-[#de4028]
             w-[20%] rounded-md text-white p-2`}
          >
            Penalize User
          </p>
        </>
      )}
    </div>
  );
};

export default DeactivatedDetail;
