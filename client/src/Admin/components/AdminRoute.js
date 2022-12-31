import React from "react";
import { Route, Routes } from "react-router-dom";
import AddPrice from "../Page/AddPrice";
import AddProductName from "../Page/AddProductName";
import AddRoles from "../Page/AddRoles";
import AddWarehouseOfficer from "../Page/addWarehouseOfficer";
import AdminPanel from "../Page/AdminPanel";
import Completed from "../Page/Completed";
import Deactivated from "../Page/Deactivated";
import EditPrice from "../Page/EditPrice";
import EditProductName from "../Page/EditProductName";
import OnGoing from "../Page/OnGoing";
import Price from "../Page/Price";
import Products from "../Page/Products";
import ProductName from "../Page/ProdutName";
import RegisterProduct from "../Page/RegisterProduct";
import TrasnactionDetail from "../Page/TrasnactionDetail";

const AdminRoute = () => {
  return (
    <AdminPanel>
      <Routes>
        <Route path="" element={<p>Welcome to admin panel</p>}></Route>
        <Route path="/ongoing" element={<OnGoing />}></Route>
        <Route path="/price" element={<Price />}></Route>
        <Route path="/price/addPrice" element={<AddPrice />}></Route>
        <Route path="/price/editPrice/:priceId" element={<EditPrice />}></Route>
        <Route path="/productName" element={<ProductName />}></Route>
        <Route
          path="/productName/addProductName"
          element={<AddProductName />}
        ></Route>
        <Route
          path="/productName/editProductName/:productNameId"
          element={<EditProductName />}
        ></Route>
        <Route path="/addRole" element={<AddRoles />}></Route>
        <Route path="/warehouse" element={<AddWarehouseOfficer />}></Route>

        <Route
          path="/ongoing/detail/:transactionId/:warehouseId"
          element={<TrasnactionDetail />}
        ></Route>

        <Route path="/deactivated" element={<Deactivated />}></Route>

        <Route path="/completed" element={<Completed />}></Route>

        <Route path="/register" element={<RegisterProduct />}></Route>
        <Route path="/product" element={<Products />}></Route>
      </Routes>
    </AdminPanel>
  );
};

export default AdminRoute;
