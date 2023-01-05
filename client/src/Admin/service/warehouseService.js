import axios from "axios";
import { URL } from "../../config";

export const releaseWarehouseService = (warehouseId) => {
  return axios.put(`${URL}releaseWarehouse/${warehouseId}`);
};
