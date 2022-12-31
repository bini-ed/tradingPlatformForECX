import { ErrorMessage, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import { useParams } from "react-router-dom";

import FormField from "../../components/FormField";
import CustomToast from "../../components/CustomToast";
import Loader from "../../components/Loader";
import { addProductToAuctionService } from "../../service/auctionService";
import { getSpecificProductOfSellerService } from "../../service/wareHouseService";
import AuthContext from "../../context/AuthContext";

const ProductDetail = () => {
  const validationSchema = Yup.object().shape({
    productName: Yup.string().required().label("Product Name"),
    productQuantity: Yup.string().required().label("Quantity"),
    location: Yup.string().required().label("Location"),
    productType: Yup.string().required().label("Product Type"),
    productDate: Yup.string().required().label("Product Date"),
  });

  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const getProductDetail = async () => {
    const token = localStorage.getItem("userInfo");
    setLoading(true);
    try {
      const { data } = await getSpecificProductOfSellerService(
        productId,
        token
      );
      if (data) setProduct(data);
    } catch (error) {
      console.log(error.response.data);
    }
    setLoading(false);
  };
  console.log(product);

  useEffect(() => {
    getProductDetail();
    return () => {
      setProduct({});
    };
  }, []);

  const handleAddProductToAuction = async (values) => {
    const token = localStorage.getItem("userInfo");
    setLoading(true);
    console.log(values, productId);
    try {
      const { data } = await addProductToAuctionService(
        productId,
        values,
        user.id,
        token
      );
      if (data) CustomToast("success", data);
    } catch (error) {
      console.log(error);
      CustomToast("Error", error?.response?.data || error?.message);
    }
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col justify-center min-h-[calc(100vh-66px)]">
      {loading ? (
        <Loader />
      ) : (
        <div className="p-15 md:mx-6">
          <div className="text-center">
            <h4 className="text-xl font-semibold block text-gray-500 my-1 ">
              ECX eTrading Admin Panel
            </h4>
          </div>
          <Formik
            initialValues={{
              productName: product?.product?.productName,
              productQuantity: product.productQuantity,
              location: product?.product?.location,
              productType: product?.product?.productType,
              productDate: moment(product?.product?.date).format("DD-MMM-yyyy"),
            }}
            onSubmit={(values) => {
              handleAddProductToAuction(values.productQuantity);
            }}
            validationSchema={validationSchema}
          >
            {({ isSubmitting, errors }) => (
              <div className="w-full flex justify-center">
                <Form className="flex flex-col flex-wrap w-[90%] md:w-[70%] lg:w-[60%] lg:max-w-[500px]  rounded-lg bg-slate-200 items-center">
                  <FormField
                    label="Product Name"
                    name="productName"
                    type="text"
                    error={errors.productName}
                    disabled={true}
                  />
                  <FormField
                    label="Product Quantity per KG"
                    name="productQuantity"
                    type="text"
                    error={errors.productQuantity}
                    disabled={false}
                  />
                  <FormField
                    label="Location"
                    name="location"
                    type="text"
                    error={errors.location}
                    disabled={true}
                  />

                  <FormField
                    label="Product Type"
                    name="productType"
                    type="text"
                    error={errors.productType}
                    disabled={true}
                  />
                  <FormField
                    label="Product Date"
                    name="productDate"
                    type="text"
                    error={errors.productDate}
                    disabled={true}
                  />

                  <div className="flex flex-col justify-center my-5 items-center w-full">
                    <button
                      type="submit"
                      className="bg-[#232536] px-10 py-2 xs:w-[90%] sm:w-[60%] md:w-[60%] lg:w-[50%] rounded-lg text-white"
                      disabled={isSubmitting}
                    >
                      Add Product to auction
                    </button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
