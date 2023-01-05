import React, { useContext, useEffect, useState } from "react";

import ProductTable from "../../Admin/components/ProductTable";
import CustomAppTable from "../../components/CustomAppTable";
import CustomTable from "../../components/CustomTable";
import CustomToast from "../../components/CustomToast";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import AuthContext from "../../context/AuthContext";
import {
  addProductToAuctionService,
  getMyProductInAuctionService,
} from "../../service/auctionService";
import { getMyProductService } from "../../service/productService";
import { getSellerProductService } from "../../service/wareHouseService";

const SellerPage = () => {
  const { user, setBidId } = useContext(AuthContext);
  const [product, setProduct] = useState([]);
  const [productInAuction, setProductInAuction] = useState([]);
  const [productInWare, setProductInWare] = useState([]);
  const [laoding, setLoading] = useState(false);
  const [filter, setFilter] = useState([]);
  const [prodLaoding, setProLoading] = useState(false);
  const [wareLaoding, setWareLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
    getAllProduct();
    myProductInAuction();
    getAllProductInWareHouse();
  }, []);

  const getAllProduct = async () => {
    const token = localStorage.getItem("userInfo");
    setLoading(true);
    try {
      const { data } = await getMyProductService(token);
      if (data) setProduct(data);
    } catch (error) {
      setErrorMessage(error.response.data || error.message);
      console.log(error.response.data || error.message);
      // CustomToast("error", error.response.data);
    }
    setLoading(false);
  };
  const getAllProductInWareHouse = async () => {
    setWareLoading(true);
    const token = localStorage.getItem("userInfo");
    try {
      const { data } = await getSellerProductService(token);
      if (data) setProductInWare(data);
    } catch (error) {
      console.log(error.response.data || error.message);
      // CustomToast("error", error.response.data);
      setErrorMessage(error.response.data || error.message);
    }
    setWareLoading(false);
  };

  const myProductInAuction = async () => {
    const token = localStorage.getItem("userInfo");
    setProLoading(true);
    try {
      const { data } = await getMyProductInAuctionService(token);
      if (data) {
        const filtered = data.filter(
          (items) => items?.product != null && items?.product != undefined
        );
        setProductInAuction(filtered);
      }
    } catch (error) {
      // console.log(error.response.data || error.message);
      setErrorMessage(error.response.data || error.message);
      // CustomToast("error", error.response.data || error.message);
    }
    setProLoading(false);
  };

  let filteredProduct = product?.filter((product) =>
    product?.productName?.match(new RegExp(filter, "i"))
  );
  const handleAddProduct = true;

  return (
    <div>
      <div className="px-20">
        <h4 className="text-xl font-semibold  text-left text-[#996D6D]">
          All Products
        </h4>
        {laoding ? (
          <Loader />
        ) : product?.length ? (
          <CustomAppTable
            column={[
              {
                productName: "Product Name",
                productQuantity: "Quantitiy",
                warehouse: "Warehouse",
                grade: "Grade",
              },
            ]}
            handler={handleAddProduct}
            field={filteredProduct}
            count={filteredProduct.length}
            filter={filter}
            setFilter={setFilter}
            path="/productDetail"
          />
        ) : (
          <p className="text-[#c45d5d] font-mono text-[17px]">
            No product found
          </p>
        )}
      </div>

      <div className="px-20">
        <h4 className="text-xl font-semibold text-left text-[#996D6D]">
          Product in auction
        </h4>
        {prodLaoding ? (
          <Loader />
        ) : productInAuction?.length ? (
          <ProductTable product={productInAuction} />
        ) : (
          <p className="text-[#c45d5d] font-mono text-[17px]">
            You don't have a product in auction
          </p>
        )}
      </div>

      <div className="px-20">
        <h4 className="text-xl font-semibold text-left text-[#996D6D]">
          Product in Warehouse
        </h4>
        {wareLaoding ? (
          <Loader />
        ) : productInWare?.length ? (
          <CustomTable
            handler={handleAddProduct}
            count={productInWare.length}
            auction={productInWare}
          />
        ) : (
          <p className="text-[#c45d5d] font-mono text-[17px]">
            You don't have a product in warhouse
          </p>
        )}
      </div>
    </div>
  );
};

export default SellerPage;
