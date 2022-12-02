import React, { useContext } from "react";

import AuthContext from "../../context/AuthContext";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

function AdminPanel({ children }) {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  return (
    <div className="min-h-screen">
      <Header user={user} />

      <SideBar>{children}</SideBar>
    </div>
  );
}

export default AdminPanel;
