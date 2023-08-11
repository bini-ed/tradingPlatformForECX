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
import {
  approveUser,
  approveUserService,
  getUserById,
} from "../../../service/userService";

const UserDetail = () => {
  const { userId } = useParams();
  const { state } = useLocation();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = async () => {
    setLoading(true);
    try {
      const { data } = await getUserById(userId);
      if (data) setUser(data);
    } catch (error) {
      console.log(error.response.data ? error.response.data : error.message);
    }
    setLoading(false);
  };

  const approveUser = async () => {
    setLoading(true);
    try {
      const { data } = await approveUserService(userId);
      if (data) CustomToast("success", data);
    } catch (error) {
      CustomToast(
        "error",
        error.response.data ? error.response.data : error.message
      );
    }
    setLoading(false);
  };

  console.log(user);

  return (
    <div className="flex flex-col ">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-evenly flex-col md:flex-row flex-wrap px-20 ">
            <LabelWithField label={"First Name"} value={user?.firstName} />
            <LabelWithField label={"Last Name"} value={user?.lastName} />
            <LabelWithField label={"Email"} value={user?.email} />
            <LabelWithField label={"Phone Number"} value={user?.phoneNumber} />

            <div className="flex flex-col my-10 w-[87%] p-2">
              <p className="text-left text-[20px]  text-slate-500">
                Transaction Picture
              </p>
              <a href={`${URL + user?.payment}`} target="_blank">
                <img
                  style={{
                    width: 500,
                    height: 400,
                    aspectRatio: "16/9",
                    objectFit: "contain",
                  }}
                  src={`${URL + user?.payment}`}
                  className="h-full w-full object-cover drop-shadow-xl"
                />
              </a>
            </div>
          </div>

          <p
            onClick={approveUser}
            className={`self-center my-10 cursor-pointer bg-[#256025] w-[20%] rounded-md text-white p-2`}
          >
            Approve
          </p>
        </>
      )}
    </div>
  );
};

export default UserDetail;
