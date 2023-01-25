import axios from "axios";
import { URL } from "../config";

export const getAllProductInAuctionRoomService = () => {
  // return axios.get(`${URL}getAllProductInAuctionRoom`);
  return axios.get(`${URL}getAuction`);
};

export const addProductToAuctionService = (
  productId,
  productQuantity,
  minPrice,
  owner,
  token
) => {
  return axios.get(
    `${URL}addProductToAuction/${productId}/${productQuantity}/${owner}/${minPrice}`,
    {
      headers: { "x-auth-token": token },
    }
  );
};

export const addUserToAuctionService = (
  token,
  date,
  auctionRoomId,
  productId
) => {
  const config = {
    headers: {
      "x-auth-token": token,
    },
  };
  return axios.post(
    `${URL}addUserToAuction`,
    { date, auctionRoomId, productId },
    config
  );
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
export const getAuctionRoomUsingProductIdService = (productId) => {
  return axios.get(`${URL}getAuction/${productId}`);
};
export const getAuctionUsingAuctionRoomService = (auctionRoomId) => {
  return axios.get(`${URL}findAuctionByAuctionRoom/${auctionRoomId}`);
};
