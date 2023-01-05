import React, { useEffect, useState } from "react";
import CustomTable from "../../../../components/CustomTable";
import CustomToast from "../../../../components/CustomToast";
import { getAllProductService } from "../../../../service/productService";
import ProductTable from "../../../components/ProductTable";
import Loader from "../../../../components/Loader";
import { getProductInWarehouse } from "../../../../service/wareHouseService";
import { getProductInStorageService } from "../../../service/storageService";
import { Link, useParams } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const { warehouseId } = useParams();

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    setLoading(true);
    try {
      const { data } = await getProductInStorageService(warehouseId);
      if (data) setProduct(data);
    } catch (error) {
      // CustomToast("error", error.response.data);
    }
    setLoading(false);
  };

  return (
    <div className="p-5">
      {loading ? (
        <Loader />
      ) : (
        <div className="relative">
          <Link
            className="bg-slate-500 text-white rounded-md absolute p-2 right-[5px]"
            to={`/admin/warehouse/editWarehouse/${warehouseId}`}
          >
            Edit this warehouse
          </Link>
          <ProductTable
            color="bg-slate-800"
            product={product}
            count={product.length}
          />
        </div>
      )}
    </div>
  );
};

export default Products;
