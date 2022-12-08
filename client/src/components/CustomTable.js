import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { paginate } from "./paginate";
import Paginations from "./pagination";

const CustomTable = ({ auction, count }) => {
  const [filter, setFilter] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (count === 0)
    return <p className="text-red-400 text-[30px]">There is no product </p>;

  let filteredAuction = auction?.filter((field) =>
    field?.productName?.match(new RegExp(filter, "i"))
  );
  const auctions = paginate(filteredAuction, currentPage, pageSize);

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
                      <th className="border text-[18px] w-[20%] text-white p-5 border-slate-100">
                        Product Name
                      </th>
                      <th className="border text-[18px] w-[20%] text-white p-5 border-slate-100">
                        Payment
                      </th>
                      <th className="border text-[18px] w-[25%] text-white p-5 border-slate-100">
                        Warehouse status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {auctions?.map((auction, index) => (
                      <tr
                        className={`cursor-pointer ${
                          index % 2 == 0 ? "bg-[#d7f8ee]" : "bg-[#f6f7f6]"
                        } hover:bg-[#b8e6cf]`}
                        key={index}
                      >
                        <td className="border border-slate-100 text-slate-800 p-2 text-lg text-left ">
                          {auction.productName}
                        </td>
                        <td className="border border-slate-100 text-slate-800 p-2 text-lg text-left ">
                          {auction.productType}
                        </td>
                        <td className="border border-slate-100 text-slate-800 p-2 text-lg text-left ">
                          {auction.location}
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
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          ></Paginations>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
