import axios from "axios";
import { URL } from "../config";

export const placeBidService = (value, token) => {
  return axios.post(`${URL}placeBid`, value, {
    headers: { "x-auth-token": token },
  });
};
export const getBidsForSpecificAuctionService = (auctionId) => {
  return axios.get(`${URL}getAllBid/${auctionId}`);
};
export const getWinnerForSpecificAuction = (auctionId) => {
  return axios.get(`${URL}getWinner/${auctionId}`);
};
