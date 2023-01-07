import axios from "axios";
import { URL } from "../../config";

export const addTransactionService = (bidId, value) => {
  return axios.post(`${URL}addTransaction/${bidId}`, value);
};
export const getAllTransactionService = () => {
  return axios.get(`${URL}getAllTransaction`);
};
export const getUnApprovedTransactionService = () => {
  return axios.get(`${URL}getUnApprovedTransaction`);
};
export const getApprovedTransactionService = () => {
  return axios.get(`${URL}getApprovedTransaction`);
};
export const getDelayedTransactionService = () => {
  return axios.get(`${URL}getDelayedTransaction`);
};
export const getTransactionDetailService = (transactionId) => {
  return axios.get(`${URL}getTransactionDetail/${transactionId}`);
};
export const approveTransactionService = (warehouseId, transactionId) => {
  return axios.post(`${URL}approveTransaction/${warehouseId}/${transactionId}`);
};
export const penalizeUserService = (transactionId) => {
  return axios.get(`${URL}penalizeUser/${transactionId}`);
};
