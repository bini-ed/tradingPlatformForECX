import React, { useEffect, useState } from "react";
import ProductTable from "../../Admin/components/ProductTable";
import CustomToast from "../../components/CustomToast";
import Header from "../../components/Header";
import { getMyProductService } from "../../service/productService";

const SellerPage = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    try {
      const { data } = await getMyProductService(
        localStorage.getItem("userInfo")
      );
      if (data) setProduct(data);
    } catch (error) {
      console.log(error.response.data || error.message);
      CustomToast("error", error.response.data);
    }
  };
  return (
    <div>
      <Header ref={[]} />
      <div className="px-20">
        <h4 className="text-xl font-semibold my-5 text-left text-[#996D6D]">
          My Product
        </h4>
        <ProductTable product={product} count={product.length} />
      </div>
    </div>
  );
};

export default SellerPage;
