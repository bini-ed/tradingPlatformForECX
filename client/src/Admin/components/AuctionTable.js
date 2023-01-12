import React, { useState } from "react";

import { paginate } from "../../components/paginate";
import Paginations from "../../components/pagination";

const AuctionTable = ({ field, filter, setFilter, count, handler }) => {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fields = paginate(field, currentPage, pageSize);

  return (
    <div className="w-full px-10">
      <div className="flex flex-col justify-center m-auto w-[100%] ">
        <div
          className={`flex flex-row rounded-md bg-slate-800 my-3 place-self-start`}
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
              <div className="border rounded-[20px] overflow-hidden">
                <table className="min-w-full  divide-y divide-slate-800 ">
                  <thead className={`bg-slate-800 w-[100%]`}>
                    <tr>
                      <th className="border text-sm md:text-md lg:text-lg w-[20%] text-white py-5 border-slate-100">
                        Auction
                      </th>
                      <th className="border text-sm md:text-md lg:text-lg w-[20%] text-white py-5 border-slate-100">
                        Quantity
                      </th>
                      <th className="border text-sm md:text-md lg:text-lg w-[20%] text-white py-5 border-slate-100">
                        Is Started
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields?.map((field, index) => (
                      <tr
                        className={`bg-slate-500 hover:bg-slate-400 cursor-pointer  ${
                          index % 2 == 0 ? "bg-slate-400 " : "bg-slate-300 "
                        } `}
                        key={field._id}
                      >
                        <td
                          key={index}
                          className={`border border-slate-100 text-white text-sm md:text-md lg:text-lg p-2`}
                        >
                          {field?.product?.product?.productName}
                        </td>
                        <td
                          key={index}
                          className={`border border-slate-100 text-white text-sm md:text-md lg:text-lg p-2`}
                        >
                          {field?.product?.productQuantity}
                        </td>
                        <td
                          onClick={() => handler(field._id)}
                          key={index}
                          className={`border border-slate-100 text-white text-sm md:text-md lg:text-lg p-2`}
                        >
                          {field?.isStarted ? (
                            <p className="bg-[green] rounded-md">Started</p>
                          ) : (
                            <p className="bg-[#e97f7f] rounded-md cursor-pointer hover:bg-red-200">
                              Not Started
                            </p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Paginations
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        ></Paginations>
      </div>
    </div>
  );
};

export default AuctionTable;
