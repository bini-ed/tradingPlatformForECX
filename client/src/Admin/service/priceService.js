import axios from "axios";
import { URL } from "../../config";

export const addPriceService = (value) => {
  return axios.post(`${URL}addPrice`, value);
};
export const getAllPriceService = () => {
  return axios.get(`${URL}getAllPrice`);
};
export const getPriceForTypeService = (type, grade) => {
  const washed = type.toLowerCase();
  return axios.get(`${URL}getPrice/${washed}/${grade}`);
};
export const getPriceByIdService = (id) => {
  return axios.get(`${URL}getPriceById/${id}`);
};
export const editPriceService = (value) => {
  return axios.post(`${URL}editPrice`, value);
};
