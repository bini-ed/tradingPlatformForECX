import axios from "axios";
import { URL } from "../config";

export const addProductService = (value, token) => {
  return axios.post(`${URL}addProduct`, value, {
    headers: {
      "x-auth-token": token,
    },
  });
};
export const getAllProductService = (token) => {
  return axios.get(`${URL}getAllProduct`, {
    headers: {
      "x-auth-token": token,
    },
  });
};
export const getMyProductService = (token) => {
  return axios.get(`${URL}getMyProduct`, {
    headers: {
      "x-auth-token": token,
    },
  });
};
export const getSpecificProductService = (id) => {
  return axios.get(`${URL}getSpecificProduct/${id}`);
};
