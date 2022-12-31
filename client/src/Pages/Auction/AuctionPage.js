import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import AuthContext from "../../context/AuthContext";
import { getEnrolledInAuctionRoomService } from "../../service/auctionService";

const AuctionPage = () => {
  const { productId } = useParams();
  const { user } = useContext(AuthContext);
  const [enrolledAuction, setEnrolledAuction] = useState([]);
  const [laoding, setLoading] = useState(false);

  useEffect(() => {
    getEnrolledInAuctionRoom();
  }, []);

  const getEnrolledInAuctionRoom = async () => {
    const token = localStorage.getItem("userInfo");
    setLoading(true);
    try {
      const { data } = await getEnrolledInAuctionRoomService(token);
      if (data) setEnrolledAuction(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <div className="px-10">
        {laoding ? (
          <Loader />
        ) : (
          <>
            <div className="flex mt-5 rounded-md items-center justify-between bg-slate-100">
              <p className="mx-1 text-slate-700 p-2 w-[25%] font-semibold">
                Product Name
              </p>
              <p className="mx-1 text-slate-700 p-2 w-[25%] font-semibold">
                Location
              </p>
              <p className="mx-1 text-slate-700 p-2 w-[25%] font-semibold">
                Product Type
              </p>
              <p className="mx-1 text-slate-700 p-2 w-[25%] font-semibold">
                Grade
              </p>
              <p className="mx-1 text-slate-700 p-2 w-[25%] font-semibold">
                No of users registered
              </p>
              <p className="mx-1 text-slate-700 p-2 w-[25%]"></p>
            </div>
            {enrolledAuction.map((items) => {
              return (
                <div
                  key={items._id}
                  className="flex mt-5 rounded-md items-center justify-between bg-slate-200"
                >
                  <p className="mx-1 text-slate-700 p-2  w-[25%]">
                    {items?.product?.product?.productName}
                  </p>
                  <p className="mx-1 text-slate-700 p-2  w-[25%]">
                    {items?.product?.product?.location}
                  </p>
                  <p className="mx-1 text-slate-700 p-2  w-[25%]">
                    {items?.product?.product?.productType}
                  </p>
                  <p className="mx-1 text-slate-700 p-2  w-[25%]">
                    {items?.product?.product?.grade}
                  </p>
                  <p className="mx-1 text-slate-700 p-2  w-[25%]">
                    {items?.users?.length}
                  </p>

                  {!items?.isStarted ? (
                    !items?.isCompleted ? (
                      <p className="text-white p-2 bg-[#ce8961] w-[25%]">
                        Not started
                      </p>
                    ) : (
                      <p className="text-white p-2 bg-[#ce8961] w-[25%]">
                        Completed
                      </p>
                    )
                  ) : (
                    <Link
                      to={`/joinAuction/${items._id}/${items?.product?._id}`}
                      className="cursor-pointer hover:bg-[#59e959] text-white p-2 bg-[#61ce61] w-[25%]"
                    >
                      Join Auction
                    </Link>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default AuctionPage;
