import axios from "axios";
import { URL } from "../config";

export const getProductFromWareHouse = (token) => {
  return axios.get(`${URL}getInformation`, {
    headers: {
      "x-auth-token": token,
    },
  });
};

export const getSpecificProductOfSellerService = (productId, token) => {
  return axios.get(`${URL}getSpecificSellerProduct/${productId}`, {
    headers: {
      "x-auth-token": token,
    },
  });
};
export const getSellerProductService = (token) => {
  return axios.get(`${URL}getSellerProduct`, {
    headers: {
      "x-auth-token": token,
    },
  });
};
