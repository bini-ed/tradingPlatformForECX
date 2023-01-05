import React from "react";
import { Route, Routes } from "react-router-dom";

import AddPrice from "../Page/Warehouse/Price/AddPrice";
import AddProductName from "../Page/Warehouse/Product/AddProductName";
import AddRoles from "../Page/AdminPages/AddRoles";
import AddWarehouseOfficer from "../Page/Warehouse/Warehouse/addWarehouseOfficer";
import AdminPanel from "../Page/AdminPanel";
import Completed from "../Page/AdminPages/Completed";
import Deactivated from "../Page/AdminPages/Deactivated";
import EditPrice from "../Page/Warehouse/Price/EditPrice";
import EditProductName from "../Page/Warehouse/Product/EditProductName";
import OnGoing from "../Page/AdminPages/OnGoing";
import Price from "../Page/Warehouse/Price/Price";
import Products from "../Page/Warehouse/Product/Products";
import ProductName from "../Page/Warehouse/Product/ProdutName";
import RegisterProduct from "../Page/Warehouse/Product/RegisterProduct";
import TrasnactionDetail from "../Page/AdminPages/TrasnactionDetail";
import Warehouse from "../Page/Warehouse/Warehouse/Warehouse";
import AddWarehouse from "../Page/Warehouse/Warehouse/AddWarehouse";
import EditWarehouse from "../Page/Warehouse/Warehouse/EditWarehouse";
import ProductDetail from "../Page/Warehouse/Product/ProductDetail";

const AdminRoute = () => {
  return (
    <AdminPanel>
      <Routes>
        <Route
          path=""
          element={
            <div className="min-h-[calc(100vh-100px)] flex justify-center items-center">
              <p className="text-lg font-mono font-semibold">Welcome to ECX</p>
            </div>
          }
        ></Route>
        <Route path="/ongoing" element={<OnGoing />}></Route>
        <Route path="/price" element={<Price />}></Route>
        <Route path="/price/addPrice" element={<AddPrice />}></Route>
        <Route path="/price/editPrice/:priceId" element={<EditPrice />}></Route>
        <Route path="/productName" element={<ProductName />}></Route>
        <Route path="/register" element={<RegisterProduct />}></Route>
        <Route
          path="/productName/addProductName"
          element={<AddProductName />}
        ></Route>
        <Route
          path="/productName/editProductName/:productNameId"
          element={<EditProductName />}
        ></Route>
        <Route path="/addRole" element={<AddRoles />}></Route>

        <Route
          path="/warehouseOfficer"
          element={<AddWarehouseOfficer />}
        ></Route>
        <Route path="/warehouse" element={<Warehouse />}></Route>
        <Route path="/addWarehouse" element={<AddWarehouse />}></Route>
        <Route
          path="/warehouse/editWarehouse/:warehouseId"
          element={<EditWarehouse />}
        ></Route>
        <Route
          path="/warehouse/product/:warehouseId"
          element={<Products />}
        ></Route>
        <Route
          path="/warehouse/productDetail/:warehouseId"
          element={<ProductDetail />}
        ></Route>

        <Route
          path="/ongoing/detail/:transactionId/:warehouseId"
          element={<TrasnactionDetail />}
        ></Route>
        <Route path="/deactivated" element={<Deactivated />}></Route>
        <Route path="/completed" element={<Completed />}></Route>
      </Routes>
    </AdminPanel>
  );
};

export default AdminRoute;
