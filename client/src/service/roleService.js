import axios from "axios";
import { URL } from "../config";

export const getRoleService = () => {
  return axios.get(`${URL}getRole`);
};
