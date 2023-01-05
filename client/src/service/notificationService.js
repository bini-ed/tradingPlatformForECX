import axios from "axios";
import { URL } from "../config";

export const getNotificationService = (token) => {
  return axios.get(`${URL}getNotification`, {
    headers: {
      "x-auth-token": token,
    },
  });
};

export const updateNotification = (id) => {
  return axios.get(`${URL}updateNotification/${id}`);
};
