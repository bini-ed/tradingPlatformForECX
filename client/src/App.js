import { Route, Router, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

import "./App.css";

import AdminNavigation from "./Admin/components/AdminNavigation";
import SideBar from "./Admin/components/SideBar";
import AdminPanel from "./Admin/Page/AdminPanel";
import AddWarehouseOfficer from "./Admin/Page/addWarehouseOfficer";
import Completed from "./Admin/Page/Completed";
import Deactivated from "./Admin/Page/Deactivated";
import OnGoing from "./Admin/Page/OnGoing";
import RegisterProduct from "./Admin/Page/RegisterProduct";
import BuyerPage from "./Pages/Buyer/BuyerPage";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import AuthContext from "./context/AuthContext";
import Products from "./Admin/Page/Products";
import SellerPage from "./Pages/Seller/SellerPage";
import AuctionPage from "./Pages/Auction/AuctionPage";
import JoinAuction from "./Pages/Auction/JoinAuction";
import { getLocalStorageData } from "./components/localStorage";
import { io } from "socket.io-client";
import { URL } from "./config";
import WinnerPage from "./Pages/Auction/WinnerPage";
import ProductDetail from "./Pages/Seller/ProductDetail";
import TrasnactionDetail from "./Admin/Page/TrasnactionDetail";
import AddTransaction from "./Pages/Buyer/AddTransaction";
import Price from "./Admin/Page/Price";
import AddPrice from "./Admin/Page/AddPrice";
import EditPrice from "./Admin/Page/EditPrice";
import AddRoles from "./Admin/Page/AddRoles";

const newSocket = io(URL);
const token = localStorage.getItem("userInfo");
function App() {
  const [user, setUser] = useState(token ? jwtDecode(token) : "");

  useEffect(() => {
    getUser();
  }, [user?.id]);

  const getUser = async () => {
    try {
      const token = getLocalStorageData();
      if (token) {
        const user = await jwtDecode(token);
        setUser(user);
      } else {
        setUser({});
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>

          <Route
            path="/admin"
            element={
              <AdminPanel>
                <p>Welcome to admin</p>
              </AdminPanel>
            }
          ></Route>

          <Route
            path="/admin/ongoing"
            element={
              <AdminPanel>
                <OnGoing />
              </AdminPanel>
            }
          ></Route>
          <Route
            path="/admin/price"
            element={
              <AdminPanel>
                <Price />
              </AdminPanel>
            }
          ></Route>
          <Route
            path="/admin/price/addPrice"
            element={
              <AdminPanel>
                <AddPrice />
              </AdminPanel>
            }
          ></Route>
          <Route
            path="/admin/addRole"
            element={
              <AdminPanel>
                <AddRoles />
              </AdminPanel>
            }
          ></Route>
          <Route
            path="/admin/warehouse"
            element={
              <AdminPanel>
                <AddWarehouseOfficer />
              </AdminPanel>
            }
          ></Route>
          <Route
            path="/admin/price/editPrice/:priceId"
            element={
              <AdminPanel>
                <EditPrice />
              </AdminPanel>
            }
          ></Route>
          <Route
            path="/admin/ongoing/detail/:transactionId/:warehouseId"
            element={
              <AdminPanel>
                <TrasnactionDetail />
              </AdminPanel>
            }
          ></Route>

          <Route
            path="/admin/deactivated"
            element={
              <AdminPanel>
                <Deactivated />
              </AdminPanel>
            }
          ></Route>

          <Route
            path="/admin/completed"
            element={
              <AdminPanel>
                <Completed />
              </AdminPanel>
            }
          ></Route>

          <Route
            path="/admin/register"
            element={
              <AdminPanel>
                <RegisterProduct />
              </AdminPanel>
            }
          ></Route>
          <Route
            path="/admin/product"
            element={
              <AdminPanel>
                <Products />
              </AdminPanel>
            }
          ></Route>

          <Route path="/buyer" element={<BuyerPage />}></Route>
          <Route path="/auction" element={<AuctionPage />}></Route>
          <Route
            path="/joinAuction/:auctionRoomId/:productId"
            element={<JoinAuction socket={newSocket} />}
          ></Route>
          <Route path="/seller" element={<SellerPage />}></Route>
          <Route
            path="/productDetail/:productId"
            element={<ProductDetail />}
          ></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route
            path="/winner/:productId/:amount"
            element={<WinnerPage />}
          ></Route>
          <Route path="/pay/:warehouseId" element={<AddTransaction />}></Route>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
