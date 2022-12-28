import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CustomAppTable from "../../components/CustomAppTable";
import CustomTable from "../../components/CustomTable";

import CustomToast from "../../components/CustomToast";
import Loader from "../../components/Loader";
import { getAllPriceService } from "../service/priceService";
import { getAllProductNameService } from "../service/productNameService";

const ProductName = () => {
  const [productName, setProductName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    setLoading(true);
    try {
      const { data } = await getAllProductNameService();
      if (data) setProductName(data);
    } catch (error) {
      CustomToast("error", error.response?.data ?? error.message);
    }
    setLoading(false);
  };

  let filteredProductName = productName?.filter((productName) => {
    return productName?.productName?.match(new RegExp(filter, "i"));
  });

  return (
    <div className="flex flex-col px-20 items-center">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-row rounded-md  bg-slate-500  my-3 place-self-end">
            <Link
              to={"/admin/productName/addProductName"}
              className="text-lg text-white font-semibold p-1"
            >
              Add Product Name
            </Link>
          </div>
          {filteredProductName.length ? (
            <CustomAppTable
              column={[
                {
                  productName: "Product Name",
                },
              ]}
              field={filteredProductName}
              count={filteredProductName.length}
              filter={filter}
              setFilter={setFilter}
              color="bg-slate-800"
              path={"/admin/productName/editProductName"}
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

export default ProductName;
