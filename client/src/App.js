import { Route, Router, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

import "./App.css";

import AdminNavigation from "./Admin/components/AdminNavigation";
import SideBar from "./Admin/components/SideBar";
import AdminPanel from "./Admin/Page/AdminPanel";
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

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
  }, [user.id]);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("userInfo");
      if (token) {
        const user = await jwtDecode(token);
        setUser(user);
      } else {
        setUser({});
      }
    } catch (error) {
      console.log(error);
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
          <Route path="/seller" element={<SellerPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
