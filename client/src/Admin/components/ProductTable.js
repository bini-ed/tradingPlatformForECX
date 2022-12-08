import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { paginate } from "../../components/paginate";
import Paginations from "../../components/pagination";

const ProductTable = ({ product, handleAdd }) => {
  const [filter, setFilter] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (product?.length == 0)
    return <p className="text-red-400 text-[30px]">There is no product </p>;

  let filteredProduct = product?.filter(
    (field) =>
      field?.product?.productName?.match(new RegExp(filter, "i")) ||
      field?.productName?.match(new RegExp(filter, "i"))
  );
  const products = paginate(filteredProduct, currentPage, pageSize);

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center  w-[100%]">
        <div className="flex flex-row rounded-md bg-[#48a9a6] my-3 place-self-start">
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
                  <thead className="bg-[#48a9a6]  w-[100%]">
                    <tr>
                      <th className="border text-[18px] text-white p-5 border-slate-100">
                        Product Name
                      </th>
                      <th className="border text-[18px] text-white p-5 border-slate-100">
                        Product Quantity
                      </th>
                      <th className="border text-[18px] text-white p-5 border-slate-100">
                        Grade
                      </th>
                      <th className="border text-[18px] text-white p-5 border-slate-100">
                        Location
                      </th>
                      <th className="border text-[18px] text-white p-5 border-slate-100">
                        Type
                      </th>

                      <th className="border text-[18px] text-white p-5 border-slate-100">
                        Add to Auction
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {products?.map((product, index) => (
                      <tr
                        className={`cursor-pointer ${
                          index % 2 == 0 ? "bg-[#d7f8ee]" : "bg-[#f6f7f6]"
                        } `}
                        key={index}
                      >
                        <td className="border border-slate-300 text-slate-800 p-2 text-lg text-left ">
                          {product?.productName ||
                            product?.product?.productName}
                        </td>
                        <td className="border border-slate-300 text-slate-800 p-2 text-lg text-left ">
                          {product?.productQuantity ||
                            product?.product?.productQuantity}
                        </td>
                        <td
                          className={
                            "border border-slate-300 text-slate-800 p-2 text-lg text-left "
                          }
                        >
                          <p
                            className={`text-center rounded-md ${
                              product?.grade || product?.product?.grade
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white "
                            }`}
                          >
                            {(product?.grade || product?.product?.grade) ??
                              "Not graded"}
                          </p>
                        </td>
                        <td className="border border-slate-300 text-slate-800 p-2 text-lg text-left ">
                          {product?.location || product?.product?.location}
                        </td>
                        <td className="border border-slate-300 text-slate-800 p-2 text-lg text-left ">
                          {product?.productType ||
                            product?.product?.productType}
                        </td>

                        <td
                          className={`border border-slate-300 text-slate-800 p-2 text-lg text-left`}
                        >
                          <p
                            onClick={() => handleAdd(product._id)}
                            className={`bg-slate-700 rounded-md text-white text-center ${
                              product?.product?.productName
                                ? "bg-transparent text-black"
                                : " hover:bg-slate-600"
                            }`}
                          >
                            {product?.product?.productName
                              ? "In Auction"
                              : "Add to auction"}
                          </p>
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
