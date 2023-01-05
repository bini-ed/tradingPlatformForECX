import React, { useEffect, useState } from "react";
import CustomToast from "../components/CustomToast";
import {
  getNotificationService,
  updateNotification,
} from "../service/notificationService";
import Loader from "../components/Loader";
const Notification = () => {
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("userInfo");
      const { data } = await getNotificationService(token);
      if (data) setNotification(data);
    } catch (error) {
      console.log(error.response.data);
      CustomToast("error", error.response.data);
    }
    setLoading(false);
  };
  const handleShowNotification = async (id) => {
    setLoading(true);
    try {
      console.log(id);
      const { data } = await updateNotification(id);
      if (data) getNotification();
    } catch (error) {
      console.log(error.response.data);
      CustomToast("error", error.response.data);
    }
    setLoading(false);
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="px-20">
          {notification.map((not) => (
            <div
              onClick={() => handleShowNotification(not._id)}
              className={`${
                not.seen ? "bg-slate-100" : "bg-red-100"
              }  my-10 p-2 rounded-lg hover:bg-slate-200`}
            >
              <p>
                {not.message} on {new Date(not.date).toDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;
