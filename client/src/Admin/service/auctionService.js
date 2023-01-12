import axios from "axios";
import { URL } from "../../config";

export const getAuctionService = () => {
  return axios.get(`${URL}getAllAuction`);
};
export const startAuctionService = (auctionRoomId) => {
  return axios.get(`${URL}startAuction/${auctionRoomId}`);
};
