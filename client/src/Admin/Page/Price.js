import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CustomAppTable from "../../components/CustomAppTable";
import CustomTable from "../../components/CustomTable";

import CustomToast from "../../components/CustomToast";
import Loader from "../../components/Loader";
import { getAllPriceService } from "../service/priceService";

const Price = () => {
  const [price, setPrice] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getAllPrice();
  }, []);

  const getAllPrice = async () => {
    setLoading(true);
    try {
      const { data } = await getAllPriceService();
      if (data) setPrice(data);
    } catch (error) {
      CustomToast("error", error.response?.data ?? error.message);
    }
    setLoading(false);
  };

  let filteredPrice = price?.filter((price) => {
    return price?.grade?.match(new RegExp(filter, "i"));
  });

  return (
    <div className="flex flex-col px-20 items-center">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-row rounded-md  bg-slate-500  my-3 place-self-end">
            <Link
              to={"/admin/price/addPrice"}
              className="text-lg text-white font-semibold p-1"
            >
              Add Price
            </Link>
          </div>
          {price.length ? (
            <CustomAppTable
              column={[
                {
                  // _id: "Id",
                  priceMin: "Minimum Price",
                  priceMax: "Maximum Price",
                  grade: "Type",
                  type: "Grade",
                },
              ]}
              field={filteredPrice}
              count={filteredPrice.length}
              filter={filter}
              setFilter={setFilter}
              color="bg-slate-800"
              path={"/admin/price/editPrice"}
            />
          ) : (
            <>
              <p className="text-[red] font-mono text-lg">No price found</p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Price;
