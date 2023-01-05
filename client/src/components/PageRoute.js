import React from "react";
import { Route, Routes } from "react-router-dom";
import AuctionPage from "../Pages/Auction/AuctionPage";
import JoinAuction from "../Pages/Auction/JoinAuction";
import WinnerPage from "../Pages/Auction/WinnerPage";
import AddTransaction from "../Pages/Buyer/AddTransaction";
import BuyerPage from "../Pages/Buyer/BuyerPage";
import Notification from "../Pages/Notification";
import ProductDetail from "../Pages/Seller/ProductDetail";
import SellerPage from "../Pages/Seller/SellerPage";
import UserInformation from "../Pages/UserInformation";
import Header from "./Header";

const PageRoute = ({ socket }) => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/buyer" element={<BuyerPage />}></Route>
        <Route path="/auction" element={<AuctionPage />}></Route>
        <Route
          path="/joinAuction/:auctionRoomId/:productId"
          element={<JoinAuction socket={socket} />}
        ></Route>
        <Route path="/userInfo" element={<UserInformation />}></Route>
        <Route path="/seller" element={<SellerPage />}></Route>
        <Route path="/notification" element={<Notification />}></Route>
        <Route
          path="/productDetail/:productId"
          element={<ProductDetail />}
        ></Route>
        <Route
          path="/winner/:productId/:amount"
          element={<WinnerPage />}
        ></Route>
        <Route path="/pay/:warehouseId" element={<AddTransaction />}></Route>
      </Routes>
    </>
  );
};

export default PageRoute;
