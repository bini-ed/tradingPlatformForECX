import axios from "axios";
import { URL } from "../../config";

export const addProductNameService = (value) => {
  return axios.post(`${URL}addProductName`, value);
};
export const getAllProductNameService = () => {
  return axios.get(`${URL}getAllProductName`);
};
export const getProductNameById = (id) => {
  return axios.get(`${URL}getProductNameById/${id}`);
};
export const editProductNameService = (value) => {
  return axios.post(`${URL}editProductName`, value);
};
