import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import Ongoing from "../../asset/icons/onGoing.png";
import Deactivated from "../../asset/icons/deactivated.png";
import Completed from "../../asset/icons/completed.png";
import Add from "../../asset/icons/add.png";
import Price from "../../asset/icons/price.png";
import Product from "../../asset/icons/product.png";
import Warehouse from "../../asset/icons/warehouse.png";
import AuthContext from "../../context/AuthContext";

const SideBar = ({ children }) => {
  const { user } = useContext(AuthContext);

  const options = [
    { name: "Add Role", path: "/admin/addRole", icon: Ongoing },
    { name: "Ongoing", path: "/admin/ongoing", icon: Ongoing },
    {
      name: "Add warehouse officer",
      path: "/admin/warehouseOfficer",
      icon: Deactivated,
    },
    { name: "Deactivated", path: "/admin/deactivated", icon: Deactivated },
    { name: "Completed", path: "/admin/completed", icon: Completed },

    // { name: "Products", path: "/admin/product", icon: Completed },
    { name: "Register Product", path: "/admin/register", icon: Add },
    { name: "Price", path: "/admin/price", icon: Price },
    { name: "Add Product", path: "/admin/productName", icon: Product },
    { name: "Warehouse", path: "/admin/warehouse", icon: Warehouse },
  ];

  return (
    <div className="min-h-[calc(100vh-70px)] flex border-t-2 border-y-slate-600">
      <div className="bg-slate-800 w-[100px] lg:w-[20%] lg:max-w-[350px] min-h-[calc(100vh-66px)] p-2">
        {options.map((option, index) => (
          <div key={index}>
            {user.role === "admin" &&
            index !== 5 &&
            index !== 6 &&
            index !== 7 &&
            index !== 8 &&
            index !== 9 ? (
              <NavLink
                to={option.path}
                key={index}
                className={({ isActive }) =>
                  `flex flex-row items-center text-left justify-start px-2 my-2 hover:bg-slate-500 rounded-md ${
                    isActive ? " bg-[#9ba6e4]" : ""
                  }`
                }
              >
                <img
                  src={option.icon}
                  style={{ color: "white" }}
                  width={30}
                  height={30}
                  className="flex justify-center items-center w-[50px] h-[50px] p-3 m-2 rounded-md"
                ></img>

                <p className="text-[18px] text-white font-mono hidden lg:flex">
                  {option.name}
                </p>
              </NavLink>
            ) : user.role == "warehouse" &&
              (index == 5 ||
                index == 6 ||
                index == 7 ||
                index == 8 ||
                index == 9) ? (
              <NavLink
                to={option.path}
                key={index}
                className={({ isActive }) =>
                  `flex flex-row items-center text-left justify-start px-2 my-2 hover:bg-slate-500 rounded-md ${
                    isActive ? " bg-[#9ba6e4]" : ""
                  }`
                }
              >
                <img
                  src={option.icon}
                  style={{ color: "white" }}
                  width={30}
                  height={30}
                  className="flex justify-center items-center w-[50px] h-[50px] p-3 m-2 rounded-md"
                ></img>

                <p className="text-[18px] text-white font-mono hidden lg:flex">
                  {option.name}
                </p>
              </NavLink>
            ) : (
              console.log(user.role, index)
            )}
          </div>
        ))}
      </div>
      <section className="w-full">{children}</section>
    </div>
  );
};

export default SideBar;
