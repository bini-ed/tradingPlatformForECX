import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { paginate } from "../../components/paginate";
import Paginations from "../../components/pagination";

const TransactionTable = ({ transaction }) => {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  let filteredTransaction = transaction?.filter((product) =>
    product?.bid?.bids[
      product?.bid?.bids?.length - 1
    ]?.buyerId?.firstName.match(new RegExp(filter, "i"))
  );
  const trans = paginate(filteredTransaction, currentPage, pageSize);

  return (
    <div>
      <div className="w-full">
        <div className="flex flex-col justify-center w-[100%]">
          <div className="flex flex-col">
            <div className="px-20 my-10 inline-block align-middle">
              <div className="flex w-max rounded-md bg-slate-500 my-3 place-self-start">
                <label
                  className="text-lg text-white font-semibold p-1"
                  htmlFor="filter"
                >
                  Filter
                </label>
                <input
                  type="text"
                  name="filter"
                  className="border border-slate-400 m-2 focus:outline-none rounded-sm focus:border-blue-200 focus:ring-1 focus:ring-blue-200"
                  value={filter}
                  onChange={(e) => setFilter(e.currentTarget.value)}
                ></input>
              </div>

              <table className="table-auto justify-center border-slate-500 w-[100%]">
                <thead className="bg-slate-800 w-[100%]">
                  <tr>
                    <th className="border text-white p-2 border-slate-600">
                      Auction
                    </th>
                    <th className="border text-white p-2 border-slate-600">
                      Buyer
                    </th>
                    <th className="border text-white p-2 border-slate-600">
                      Price
                    </th>
                    <th className="border text-white p-2 border-slate-600">
                      Approved
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {trans?.map((product, index) => (
                    <tr
                      onClick={() => {
                        navigate(
                          `/admin/ongoing/detail/${product._id}/${product.bid.auctionId.product._id}`
                        );
                      }}
                      className="cursor-pointer  bg-slate-500 hover:bg-slate-400"
                      key={index}
                    >
                      {console.log(product)}
                      <td className="border text-center border-slate-800 text-[whitesmoke] p-2 text-lg  ">
                        {product?.bid?.auctionId?.product?.product?.productName}
                      </td>
                      <td className="border text-center border-slate-800 text-[whitesmoke] p-2 text-lg  ">
                        {
                          product.bid.bids[product?.bid?.bids?.length - 1]
                            ?.buyerId?.firstName
                        }
                      </td>
                      <td className="border text-center border-slate-800 text-[whitesmoke] p-2 text-lg  ">
                        {
                          product.bid.bids[product?.bid?.bids?.length - 1]
                            ?.amount
                        }
                      </td>
                      <td className="border text-center border-slate-800 text-[whitesmoke] p-2 text-lg  ">
                        {product?.approved ? (
                          <p className="text-lg bg-[#2bb92b] rounded-md">
                            Approved
                          </p>
                        ) : (
                          <p className="text-lg bg-[#ae4328] rounded-md">
                            Not Approved
                          </p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="m-5">
            <Paginations
              itemsCount={trans?.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            ></Paginations>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
