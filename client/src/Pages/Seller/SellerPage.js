import React, { useEffect, useState } from "react";

import ProductTable from "../../Admin/components/ProductTable";
import CustomToast from "../../components/CustomToast";
import Header from "../../components/Header";
import {
  addProductToAuctionService,
  getMyProductInAuctionService,
} from "../../service/auctionService";
import { getMyProductService } from "../../service/productService";

const SellerPage = () => {
  const [product, setProduct] = useState([]);
  const [productInAuction, setProductInAuction] = useState([]);
  const [laoding, setLoading] = useState(false);
  const [prodLaoding, setProLoading] = useState(false);

  useEffect(() => {
    getAllProduct();
    myProductInAuction();
  }, []);

  const getAllProduct = async () => {
    const token = localStorage.getItem("userInfo");
    setLoading(true);
    try {
      const { data } = await getMyProductService(token);
      if (data) setProduct(data);
      // checkIfProductExist(data);
    } catch (error) {
      console.log(error.response.data || error.message);
      CustomToast("error", error.response.data);
    }
    setLoading(false);
  };

  const myProductInAuction = async (products) => {
    const token = localStorage.getItem("userInfo");
    setProLoading(true);
    try {
      const { data } = await getMyProductInAuctionService(token);
      if (data) {
        setProductInAuction(data);
      }
    } catch (error) {
      console.log(error.response.data || error.message);
      CustomToast("error", error.response.data || error.message);
    }
    setProLoading(false);
  };

  const handleAddProduct = async (productId) => {
    try {
      const { data } = await addProductToAuctionService(productId);
      if (data) {
        CustomToast("success", data?.msg);
        myProductInAuction();
      }
    } catch (error) {
      CustomToast("error", error.response.data || error.message);
    }
  };

  return (
    <div>
      <Header ref={[]} />
      <div className="px-20">
        <h4 className="text-xl font-semibold my-5 text-left text-[#996D6D]">
          My Product
        </h4>
        {laoding ? (
          <p>Loading</p>
        ) : product?.length ? (
          <ProductTable handleAdd={handleAddProduct} product={product} />
        ) : (
          <p className="text-red">No product found</p>
        )}
      </div>

      <div className="px-20">
        <h4 className="text-xl font-semibold my-5 text-left text-[#996D6D]">
          Product in auction
        </h4>
        {prodLaoding ? (
          <p>Loading</p>
        ) : productInAuction?.length ? (
          <ProductTable product={productInAuction} />
        ) : (
          <p className="text-[#c45d5d] font-mono text-[17px]">
            You don't have a product in auction
          </p>
        )}
      </div>
    </div>
  );
};

export default SellerPage;
