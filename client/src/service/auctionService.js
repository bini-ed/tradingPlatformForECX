import axios from "axios";
import { URL } from "../config";

export const getAllProductInAuctionRoomService = () => {
  return axios.get(`${URL}getAllProductInAuctionRoom`);
};

export const addProductToAuctionService = (productId) => {
  return axios.post(`${URL}addProductToAuction/${productId}`);
};

export const addUserToAuctionService = (auctionId, productId, token) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      "x-auth-token": token,
    },
  };
  return axios.get(`${URL}addUserToAuction/${auctionId}/${productId}`, config);
};

export const getMyProductInAuctionService = (token) => {
  return axios.get(`${URL}getSellersProductInAuctionRoom`, {
    headers: { "x-auth-token": token },
  });
};
export const getSpecificProductInAuctionRoomService = (id) => {
  return axios.get(`${URL}getSpecificProductInAuctionRoom/${id}`);
};

export const getEnrolledInAuctionRoomService = (token) => {
  return axios.get(`${URL}getEnrolledInAuctionRoom`, {
    headers: { "x-auth-token": token },
  });
};
