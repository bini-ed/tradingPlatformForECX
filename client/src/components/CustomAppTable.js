import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { paginate } from "./paginate";
import Paginations from "./pagination";

function CustomAppTable({
  field,
  column,
  filter,
  setFilter,
  count,
  path,
  handler,
}) {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (count === 0)
    return <p className="text-red-400 text-[30px]">There is no field </p>;

  const fields = paginate(field, currentPage, pageSize);

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center m-auto w-[100%] ">
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
                      {column?.map((columns, index) =>
                        Object.keys(columns).map((key, index) => (
                          <th
                            key={index}
                            className="border text-[18px] w-[20%] text-white py-5 border-slate-100"
                          >
                            {columns[key]}
                          </th>
                        ))
                      )}
                      {handler ? (
                        <th className="border text-[18px] w-[20%] text-white  border-slate-100">
                          <p>Add to auction</p>
                        </th>
                      ) : (
                        ""
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {fields?.map((field, index) => (
                      <tr
                        className={`cursor-pointer ${
                          index % 2 == 0 ? "bg-[#d7f8ee]" : "bg-[#f6f7f6]"
                        } hover:bg-[#b8e6cf]`}
                        key={index}
                      >
                        {Object.keys(field).map((key, index) =>
                          column?.map((columns) =>
                            Object.keys(columns)
                              .filter((keys) => keys == key)
                              .map((c) => (
                                <td
                                  key={index}
                                  className="border border-slate-100 text-slate-800 p-2 text-lg text-left "
                                >
                                  {field[c]}
                                </td>
                              ))
                          )
                        )}
                        {handler ? (
                          <tr
                            className={`flex justify-center items-center cursor-pointer py-1 px-2 ${"bg-[#f6f7f6"} hover:bg-[#b8e6cf]`}
                          >
                            <Link
                              to={`/productDetail/${field._id}`}
                              className={`rounded-md p-2 text-white text-center bg-slate-600 hover:bg-slate-600`}
                            >
                              Add to auction
                            </Link>
                          </tr>
                        ) : (
                          ""
                        )}
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
}

export default CustomAppTable;
