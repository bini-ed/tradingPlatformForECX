import React, { useEffect, useState } from "react";
import { paginate } from "../../components/paginate";
import Paginations from "../../components/pagination";

const ProductTable = ({ product, color }) => {
  const [filter, setFilter] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  if (product?.length == 0)
    return (
      <p className="text-red-400 font-mono text-[30px]">There is no product </p>
    );

  let filteredProduct = product?.filter(
    (field) =>
      field?.product?.product?.productName?.match(new RegExp(filter, "i")) ||
      field?.product?.productName?.match(new RegExp(filter, "i")) ||
      field?.productName?.match(new RegExp(filter, "i")) ||
      field?.owner?.firstName?.match(new RegExp(filter, "i"))
  );

  const products = paginate(filteredProduct, currentPage, pageSize);

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center  w-[100%]">
        <div
          className={`flex flex-row rounded-md ${
            color ? color : "bg-[#48a9a6]"
          } my-3 place-self-start`}
        >
          <label
            className="text-lg text-white font-semibold p-1"
            htmlFor="filter"
          >
            Filter
          </label>
          <input
            type="text"
            name="filter"
            className="border border-slate-400 m-2 focus:outline-none rounded-sm focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            value={filter}
            onChange={(e) => setFilter(e.currentTarget.value)}
          ></input>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="border rounded-[20px] overflow-hidden dark:border-[#69dc9e]">
                <table className="min-w-full  divide-y divide-[#69dc9e] dark:divide-[#69dc9e]">
                  <thead
                    className={`${
                      color ? `${color}` : "bg-[#48a9a6]"
                    }  w-[100%]`}
                  >
                    <tr>
                      <th className="border text-sm md:text-md lg:text-lg w-[20%] text-white p-5 border-slate-100">
                        Product Name
                      </th>
                      <th className="border text-sm md:text-md lg:text-lg w-[20%] text-white p-5 border-slate-100">
                        Quantity
                      </th>
                      <th className="border text-sm md:text-md lg:text-lg w-[20%] text-white p-5 border-slate-100">
                        Grade
                      </th>
                      <th className="border text-sm md:text-md lg:text-lg w-[20%] text-white p-5 border-slate-100">
                        Location
                      </th>
                      {color ? (
                        <th className="border text-sm md:text-md lg:text-lg w-[20%] text-white p-5 border-slate-100">
                          Owner
                        </th>
                      ) : (
                        <th className="border text-sm md:text-md lg:text-lg w-[20%] text-white p-5 border-slate-100">
                          Auction Status
                        </th>
                      )}
                      {
                        <th className="border text-sm md:text-md lg:text-lg w-[20%] text-white p-5 border-slate-100">
                          Warhouse Status
                        </th>
                      }
                    </tr>
                  </thead>

                  <tbody>
                    {products?.map((product, index) => (
                      <tr
                        className={`cursor-pointer ${
                          color
                            ? `bg-slate-500 hover:bg-slate-400`
                            : index % 2 == 0
                            ? "bg-[#d7f8ee]  hover:bg-[#b8e6cf]"
                            : "bg-[#f6f7f6]  hover:bg-[#b8e6cf]"
                        }`}
                        key={index}
                      >
                        <td
                          className={`border 
                          border-slate-300 ${
                            color ? "text-white" : "text-slate-800"
                          } p-2 text-sm md:text-md lg:text-lg`}
                        >
                          {product?.productName
                            ? product?.productName
                            : product?.product?.productName
                            ? product?.product?.productName
                            : product?.product?.product?.productName}
                        </td>
                        <td
                          className={`border  border-slate-300 ${
                            color ? "text-white" : "text-slate-800"
                          } p-2 text-sm md:text-md lg:text-lg`}
                        >
                          {console.log(product)}
                          {product?.productQuantity ||
                            product?.product?.productQuantity}
                        </td>
                        <td
                          className={`border border-slate-300 ${
                            color ? "text-white" : "text-slate-800"
                          } p-2 text-sm md:text-md lg:text-lg`}
                        >
                          <p
                            className={`text-center p-2 rounded-md ${
                              product?.grade ||
                              product?.product?.grade ||
                              product?.product?.product?.grade
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white "
                            }`}
                          >
                            {(product?.grade ||
                              product?.product?.grade ||
                              product?.product?.product?.grade) ??
                              "Not graded"}
                          </p>
                        </td>
                        <td
                          className={`border  border-slate-300 ${
                            color ? "text-white" : "text-slate-800"
                          } p-2 text-sm md:text-md lg:text-lg`}
                        >
                          {product?.location
                            ? product?.location
                            : product?.product?.location
                            ? product?.product?.location
                            : product?.product?.product?.location}
                        </td>
                        {/* remove this row from admin product page by using color props */}
                        {color ? (
                          <td
                            className={`border  border-slate-300 text-white p-2 text-sm md:text-md lg:text-lg`}
                          >
                            {product?.owner?.firstName}
                          </td>
                        ) : (
                          <td
                            className={`border border-slate-300 text-slate-800 p-1 text-sm md:text-md lg:text-lg`}
                          >
                            <p
                              className={`rounded-md py-1 px-2 text-white text-center ${
                                product?.isDone ? "bg-[green]" : "bg-[#3b58a7]"
                              }`}
                            >
                              {product?.isActive
                                ? "Pending auction"
                                : product?.isDone
                                ? "Completed"
                                : "Pending payment"}
                            </p>
                          </td>
                        )}
                        <td
                          className={`border  border-slate-300 ${
                            color ? "text-white" : "text-slate-800"
                          } p-2 text-sm md:text-md lg:text-lg`}
                        >
                          {product?.inWarehouse
                            ? "In warehouse"
                            : product?.product?.inWarehouse
                            ? "In warehouse"
                            : "Released"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="m-5">
          <Paginations
            itemsCount={product?.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          ></Paginations>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
