import React, { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable";
import CustomToast from "../../components/CustomToast";
import { getAllProductService } from "../../service/productService";
import ProductTable from "../components/ProductTable";
import Loader from "../../components/Loader";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    setLoading(true);
    try {
      const { data } = await getAllProductService(
        localStorage.getItem("userInfo")
      );
      console.log(data);
      if (data) setProduct(data);
    } catch (error) {
      console.log(error.response.data || error.message);
      CustomToast("error", error.response.data);
    }
    setLoading(false);
  };

  return (
    <div className="px-5">
      {loading ? (
        <Loader />
      ) : (
        <ProductTable product={product} count={product.length} />
      )}
    </div>
  );
};

export default Products;
