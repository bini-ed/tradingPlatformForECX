import axios from "axios";
import { URL } from "../config";

export const getRoleService = () => {
  return axios.get(`${URL}getRole`);
};
export const addRoleService = (value) => {
  return axios.post(`${URL}addRole`, value);
};
