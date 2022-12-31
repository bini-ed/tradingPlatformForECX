import { Route, Router, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

import "./App.css";

import BuyerPage from "./Pages/Buyer/BuyerPage";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import AuthContext from "./context/AuthContext";
import SellerPage from "./Pages/Seller/SellerPage";
import AuctionPage from "./Pages/Auction/AuctionPage";
import JoinAuction from "./Pages/Auction/JoinAuction";
import { getLocalStorageData } from "./components/localStorage";
import { io } from "socket.io-client";
import { URL } from "./config";
import WinnerPage from "./Pages/Auction/WinnerPage";
import ProductDetail from "./Pages/Seller/ProductDetail";
import AddTransaction from "./Pages/Buyer/AddTransaction";
import UserInformation from "./Pages/UserInformation";
import AdminRoute from "./Admin/components/AdminRoute";
import Header from "./components/Header";
import PageRoute from "./components/PageRoute";

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
          <Route path="/admin/*" element={<AdminRoute />}></Route>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/*" element={<PageRoute socket={newSocket} />}></Route>

          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
