import axios from "axios";
import { URL } from "../../config";

export const getStorageService = () => {
  return axios.get(`${URL}getStorage`);
};
export const getStorageByIdService = (id) => {
  return axios.get(`${URL}getStorageById/${id}`);
};
export const addStorageService = (value) => {
  return axios.post(`${URL}addStorage`, value);
};
export const editStorageService = (value) => {
  return axios.post(`${URL}updateStorage`, value);
};
export const getProductInStorageService = (name) => {
  return axios.get(`${URL}getProductFromStorage/${name}`);
};
