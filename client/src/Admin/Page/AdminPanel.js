import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminNavigation from "../components/AdminNavigation";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import RegisterProduct from "./RegisterProduct";

function AdminPanel({ children }) {
  return (
    <div className="min-h-screen">
      <Header />

      <SideBar>{children}</SideBar>

      {/* <section>{children}</section> */}
    </div>
  );
}

export default AdminPanel;
