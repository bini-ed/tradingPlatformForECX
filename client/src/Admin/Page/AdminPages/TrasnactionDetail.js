import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CustomToast from "../../../components/CustomToast";
import Loader from "../../../components/Loader";
import { URL } from "../../../config";
import LabelWithField from "../../components/LabelWithField";
import {
  approveTransactionService,
  getTransactionDetailService,
  penalizeUserService,
} from "../../service/transactionService";

const TrasnactionDetail = () => {
  const { transactionId, warehouseId } = useParams();
  const { state } = useLocation();

  const [transaction, setTransaction] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTransactionDetal();
  }, []);

  const getTransactionDetal = async () => {
    setLoading(true);
    try {
      const { data } = await getTransactionDetailService(transactionId);
      if (data) setTransaction(data);
    } catch (error) {
      console.log(error.response.data ? error.response.data : error.message);
    }
    setLoading(false);
  };

  const approveTransaction = async () => {
    setLoading(true);
    try {
      const { data } = await approveTransactionService(
        warehouseId,
        transactionId
      );
      if (data) CustomToast("success", data);
    } catch (error) {
      CustomToast(
        "error",
        error.response.data ? error.response.data : error.message
      );
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
  console.log(transaction);

  return (
    <div className="flex flex-col ">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-evenly flex-col md:flex-row flex-wrap px-20 ">
            <LabelWithField
              label={"Auction"}
              value={transaction?.bid?.auctionId?.product?.product?.productName}
            />
            <LabelWithField
              label={"Product Grade"}
              value={transaction?.bid?.auctionId?.product?.product?.grade}
            />
            <LabelWithField
              label={"Product Quantity"}
              value={
                transaction?.bid?.auctionId?.product?.productQuantity + " KG"
              }
            />
            <LabelWithField
              label={"Auction Date"}
              value={moment(transaction?.bid?.auctionId?.date).format(
                "DD-MMM-YYYY"
              )}
            />
            <LabelWithField
              label={"Winner Bid"}
              value={
                transaction?.bid?.bids[transaction?.bid?.bids.length - 1]
                  .amount + " ETB"
              }
            />

            <LabelWithField
              label={"Winner"}
              value={
                transaction?.bid?.bids[transaction?.bid?.bids.length - 1]
                  ?.buyerId?.firstName
              }
            />
            {state?.delayed ? (
              <>
                <LabelWithField
                  label={"Expected to pay before"}
                  value={moment(transaction?.created_at)
                    .add(3, "day")
                    .format("DD-MMM-YYYY")}
                />
                <div className="w-[90%] md:w-[40%] my-5 h-[40px]"></div>
              </>
            ) : (
              <div className="flex flex-col my-10 w-[87%] p-2">
                <p className="text-left text-[20px]  text-slate-500">
                  Transaction Picture
                </p>
                <a href={`${URL + transaction?.price}`} target="_blank">
                  <img
                    style={{
                      width: 500,
                      height: 400,
                      aspectRatio: "16/9",
                      objectFit: "contain",
                    }}
                    src={`${URL + transaction?.price}`}
                    className="h-full w-full object-cover drop-shadow-xl"
                  />
                </a>
              </div>
            )}
          </div>
          {!state?.completed && (
            <p
              onClick={state?.delayed ? penalizeUser : approveTransaction}
              className={`self-center my-10 cursor-pointer ${
                state?.delayed ? "bg-[#de4028]" : "bg-[#256025]"
              } w-[20%] rounded-md text-white p-2`}
            >
              {state?.delayed ? "Penalize User" : "Approve"}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default TrasnactionDetail;
