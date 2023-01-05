import axios from "axios";
import { URL } from "../config";

export const getProductFromWareHouse = (token) => {
  return axios.get(`${URL}getWarehouse`, {
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

export const getProductInWarehouse = () => {
  return axios.get(`${URL}getProductInWarehouse`);
};
export const getSpecififcProductInWarehouseService = (id) => {
  return axios.get(`${URL}getSpecificProductInWarehouse/${id}`);
};
