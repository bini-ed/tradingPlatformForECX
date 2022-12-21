import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getSpecificProductService } from "../../service/productService";

import AuthContext from "../../context/AuthContext";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import { getSpecificProductInAuctionRoomService } from "../../service/auctionService";
import { getBidsForSpecificAuctionService } from "../../service/bidService";
import CustomModal from "../../components/CustomModal";
import CustomToast from "../../components/CustomToast";

const JoinAuction = ({ socket }) => {
  const navigate = useNavigate();
  const { auctionRoomId, productId } = useParams();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [bidLoading, setBidLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [currentBidder, setCurrentBidders] = useState({});
  const [chat, setChat] = useState("");
  const [bids, setBids] = useState({});
  const [modal, setModal] = useState(false);
  const [countDown, setCountDown] = useState();

  useEffect(() => {
    getProuctInformation();
  }, []);

  useEffect(() => {
    socket.emit("joinAuctionRoom", {
      user: user,
      auctionRoomId,
    });

    return () => {
      // socket.emit("leaveAuctionRoom", { auctionRoomId, user });
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("auctionDone", ({ auctionDone, winner }) => {
      if (auctionDone && winner?.bids[0]?.buyerId == user.id) {
        navigate(`/winner/${productId}/${winner?.bids[0]?.amount}`);
      } else {
        setModal(true);
      }
    });

    return () => {
      // socket.emit("leaveAuctionRoom", { auctionRoomId, user });
      socket.off();
    };
  }, []);

  useEffect(() => {
    getBidsForSpecificAuction();
  }, [msg]);

  useEffect(() => {
    socket.on("recieveBid", ({ savedBid }) => {
      const length = savedBid.bids.length;
      if (savedBid) {
        setMsg(savedBid.bids[length - 1].amount);
        setCurrentBidders(savedBid.bids[length - 1]?.buyerId);
        // setBids([
        //   ...bids,
        //   {
        //     currentBidder: savedBid.bids[length - 1]?.buyerId,
        //     amount: savedBid.bids[length - 1].amount,
        //   },
        // ]);
      }
    });
  }, []);

  useEffect(() => {
    socket.on("getTimer", (data) => {
      setCountDown(data.countdown);
    });
  }, []);

  useEffect(() => {
    socket.on("messageError", (data) => {
      CustomToast("error", data);
    });
  }, []);

  const getProuctInformation = async () => {
    setLoading(true);
    try {
      const { data } = await getSpecificProductInAuctionRoomService(productId);
      if (data) {
        console.log(data);
        setProduct(data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const getBidsForSpecificAuction = async () => {
    setBidLoading(true);
    try {
      const { data } = await getBidsForSpecificAuctionService(auctionRoomId);
      if (data) {
        setBids(data);
      }
    } catch (error) {
      console.log(error);
    }
    setBidLoading(false);
  };

  const handleMsg = async () => {
    await socket.emit("sendBid", {
      auctionRoomId,
      chat,
      user,
      productId,
      productQuantity: product?.product?.productQuantity,
      seller: product?.product?.product?.seller,
    });
    // socket.emit("requestTimer", {
    //   auctionRoomId,
    // });
    setChat("");
  };

  return (
    <div className=" min-h-screen">
      <Header ref={[]} />
      {loading || bidLoading ? (
        <Loader />
      ) : (
        <div
          className={`flex ${
            countDown < 10 && countDown != null
              ? "transition linear infinite ease-in-out border-[2px] border-[red] duration-300 animate-border"
              : ""
          }  flex-col w-full justify-between min-h-[50vh] px-20 py-10 `}
        >
          <div className="flex flex-row justify-center w-full">
            {currentBidder?.firstName && (
              <>
                <p className="font-mono text-[30px] ">
                  {currentBidder?.firstName}
                  bids :
                </p>
                <p className="font-mono text-[30px] ">{msg ? msg : 0} ETB</p>
              </>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col w-[50%]">
              <h3 className="text-3xl font-semibold text-left my-2 text-[#074E40]">
                Seller {product?.product?.product.seller?.firstName}
              </h3>
              <div className="p-5 flex flex-col justify-center items-center bg-[#DEEFE3] w-full  lg:w-[60%] py-10 rounded-[10px]">
                <h3 className="text-2xl font-semibold text-left text-[#074E40]">
                  {product?.product?.product?.productName}
                </h3>
                <div className="h-full w-full flex flex-col items-start my-5">
                  <p className="text-[18px] font-mono text-[#3D5833]">
                    Type: {product?.product?.product.productType}
                  </p>

                  {product?.grade && (
                    <p className="text-[18px] font-mono text-[#3D5833]">
                      Grade: {product?.product?.product.grade}
                    </p>
                  )}
                  <p className="text-[18px] font-mono text-[#3D5833]">
                    Quantity: {product?.product?.productQuantity}
                  </p>
                  <p className="text-[18px] font-mono text-[#3D5833]">
                    Location: {product?.product?.product.location}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col transition ease-in-out delay-150 duration-300  origin-top transform">
              <p
                className={`text-[100px] ${
                  countDown > 30 && countDown < 60
                    ? "text-[green]"
                    : countDown <= 30 && countDown > 10
                    ? "text-[#caca4e]"
                    : "text-[brown]"
                } animate-bounce`}
              >
                {countDown}
              </p>
              <p className="text-[#074E40] font-semibold">Auction ends in</p>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <input
              type={"number"}
              placeholder="Enter bid amount"
              value={chat}
              className="outline-[lightblue] py-2 border border-[lightblue] mx-5 rounded-md px-2"
              onChange={(e) => setChat(e.currentTarget.value)}
            ></input>

            <p
              className="cursor-pointer px-4 bg-[#074E40] text-white rounded-md"
              onClick={handleMsg}
            >
              Bid
            </p>
          </div>
          {bids?._id ? (
            <>
              <h4 className="text-3xl font-semibold text-left my-2 text-[#074E40]">
                Bid History
              </h4>
              <div className="overflow-y-scroll h-[300px] w-full md:w-[50%] lg:w-[30%]">
                {bids?.bids?.map((bid, index) => (
                  <div
                    className={`flex py-2 rounded-md my-2 ${
                      index % 2 == 0 ? "bg-[#dffadf]" : "bg-[#eeeeff]"
                    }`}
                  >
                    <p className="mx-2 text-slate-700 font-mono">
                      {bid?.buyerId?.firstName}
                    </p>
                    <p className="mx-2 text-slate-700 font-mono">
                      {bid.amount}
                    </p>
                  </div>
                ))}
              </div>
              {modal && (
                <CustomModal
                  onClick={() => {
                    window.location = "/auction";
                    setTimeout(() => setModal(false), 2000);
                  }}
                />
              )}
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default JoinAuction;
