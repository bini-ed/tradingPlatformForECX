import axios from "axios";
import { URL } from "../config";

export const signupService = (value) => {
  return axios.post(`${URL}signup`, value);
};

export const getUserInformationService = (token) => {
  return axios.get(`${URL}getInformation`, {
    headers: {
      "x-auth-token": token,
    },
  });
};

export const loginService = (value) => {
  return axios.post(`${URL}login`, value);
};
