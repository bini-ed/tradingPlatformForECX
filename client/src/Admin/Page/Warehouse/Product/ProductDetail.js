import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loader from "../../../../components/Loader";
import CustomToast from "../../../../components/CustomToast";
import { getSpecififcProductInWarehouseService } from "../../../../service/wareHouseService";
import LabelWithField from "../../../components/LabelWithField";
import { releaseWarehouseService } from "../../../service/warehouseService";

const ProductDetail = () => {
  const { warehouseId } = useParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getSpecififcProduct();
  }, []);

  const getSpecififcProduct = async () => {
    setLoading(true);
    try {
      const { data } = await getSpecififcProductInWarehouseService(warehouseId);
      if (data) setProduct(data);
    } catch (error) {
      console.log(error.response.data ? error.response.data : error.message);
    }
    setLoading(false);
  };

  console.log(product);
  const handleRelease = async () => {
    setLoading(true);
    try {
      const { data } = await releaseWarehouseService(warehouseId);
      if (data) {
        CustomToast("success", data.msg);
        setProduct(data.data);
      }
    } catch (error) {
      CustomToast(
        "error",
        error.response.data ? error.response.data : error.message
      );
    }
    setLoading(false);
  };
  console.log(product);
  return (
    <div className="flex flex-col ">
      {loading ? (
        <Loader />
      ) : (
        <div className=" flex flex-col p-10">
          <div className="flex justify-evenly flex-col md:flex-row flex-wrap  ">
            <LabelWithField
              label={"Product Name"}
              value={product?.product?.productName}
            />
            <LabelWithField
              label={"Product Grade"}
              value={product?.product?.grade}
            />
            <LabelWithField
              label={"Product Type"}
              value={product?.product?.productType}
            />
            <LabelWithField
              label={"Product Quantity"}
              value={product?.productQuantity}
            />
            {product.bought ? (
              <LabelWithField
                label={"Payment Status"}
                pros={product?.paymentDone ? "bg-green-300" : "bg-red-300"}
                value={product?.paymentDone ? "Paid" : "Not paid"}
              />
            ) : (
              <LabelWithField label={"Owners"} value={"Owners Product"} />
            )}
            <LabelWithField label={"Owner"} value={product?.owner?.firstName} />
          </div>
          {product.bought ? (
            <p
              onClick={handleRelease}
              className={`self-center mt-20 cursor-pointer ${
                !product.inWarehouse ? "bg-red-400" : "bg-[#256025]"
              } w-[20%] rounded-md text-white p-2`}
            >
              {!product.inWarehouse ? "Released Product" : "Release"}
            </p>
          ) : (
            <p
              className={`self-center mt-20 cursor-pointer bg-[brown]
               w-[50%] md:w-[30%] rounded-md text-white p-2`}
            >
              Not sold yet
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
