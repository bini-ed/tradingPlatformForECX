import React from "react";
import { Route, Routes, useRoute } from "react-router-dom";
import RegisterProduct from "../Page/RegisterProduct";

const AdminNavigation = () => {
  //   let { path } = useRouteMatch();
  return (
    <div>
      <Routes>
        <Route path="/admin/register" element={<RegisterProduct />}></Route>
      </Routes>
    </div>
  );
};

export default AdminNavigation;
