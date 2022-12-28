import { ErrorMessage, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";

import FormField from "../../components/FormField";
import CustomToast from "../../components/CustomToast";
import { addProductService } from "../../service/productService";
import Loader from "../../components/Loader";
import { getAllProductNameService } from "../service/productNameService";

const RegisterProduct = () => {
  const validationSchema = Yup.object().shape({
    productName: Yup.string().required().label("Product Name"),
    productQuantity: Yup.string().required().label("Quantity"),
    location: Yup.string().required().label("Location"),
    productType: Yup.string().required().label("Product Type"),
    productDate: Yup.string().required().label("Product Date"),
    seller: Yup.string().required().label("Seller"),
  });

  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState([]);

  useEffect(() => {
    getProductName();
    return () => {};
  }, []);

  const getProductName = async () => {
    setLoading(true);
    try {
      const { data } = await getAllProductNameService();
      if (data) setProductName(data);
    } catch (error) {
      CustomToast("error", error.response.data ?? error.message);
    }
    setLoading(false);
  };

  const handleAddProduct = async (values) => {
    const token = localStorage.getItem("userInfo");
    setLoading(true);
    try {
      const { data } = await addProductService(values, token);
      if (data) CustomToast("success", data);
    } catch (error) {
      console.log(error);
      CustomToast("Error", error?.response?.data || error?.message);
    }
    setLoading(false);
  };
  return (
    <div className="w-full flex flex-col justify-center min-h-[calc(100vh-66px)]">
      {loading && <Loader />}
      <div className="p-15 md:mx-6">
        <div className="text-center">
          <h4 className="text-xl font-semibold block text-gray-500 my-1 ">
            ECX eTrading Admin Panel
          </h4>
        </div>
        <Formik
          initialValues={{
            productName: "",
            productQuantity: "",
            location: "",
            productType: "",
            productDate: "",
            seller: "",
          }}
          onSubmit={(values) => {
            handleAddProduct(values);
          }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, values, setFieldValue, errors }) => (
            <div className="w-full flex justify-center">
              <Form className="flex flex-col flex-wrap w-[90%] md:w-[70%] lg:w-[60%] lg:max-w-[500px]  rounded-lg bg-slate-200 items-center">
                <div className="w-[90%] px-5 my-2">
                  <label
                    htmlFor="productName"
                    className="block mb-2 text-left text-[#4D5959]"
                  >
                    Product Type
                  </label>
                  <select
                    onChange={(e) => {
                      setFieldValue("productName", e.currentTarget.value);
                    }}
                    id="productName"
                    className="bg-gray-50 outline-[#99d5e9] text-gray-900 rounded-lg w-full p-2.5 "
                  >
                    <option
                      value=""
                      className="bg-slate-800 text-white rounded-md"
                    >
                      Product Name
                    </option>
                    {productName.map((name) => (
                      <option
                        value={name.productName}
                        className="bg-slate-800 text-white rounded-md"
                      >
                        {name.productName}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage
                    className="text-[red] text-left"
                    name="productName"
                    component="p"
                  />
                </div>

                <FormField
                  label="Product Quantity per KG"
                  name="productQuantity"
                  type="text"
                  error={errors.productQuantity}
                />
                <FormField
                  label="Location"
                  name="location"
                  type="text"
                  error={errors.location}
                />
                <FormField
                  label="Seller"
                  name="seller"
                  type="text"
                  error={errors.seller}
                />

                <div className="w-[90%] px-5 my-2">
                  <label
                    htmlFor="field"
                    className="block mb-2 text-left text-[#4D5959]"
                  >
                    Product Type
                  </label>
                  <select
                    onChange={(e) => {
                      setFieldValue("productType", e.currentTarget.value);
                    }}
                    id="field"
                    className="bg-gray-50 outline-[#99d5e9] text-gray-900 rounded-lg w-full p-2.5 "
                  >
                    <option value="">Select</option>
                    <option value="Washed" className="">
                      Washed
                    </option>
                    <option value="Unwashed" className="">
                      Unwashed
                    </option>
                  </select>
                  <ErrorMessage
                    className="text-[red] text-left"
                    name="productType"
                    component="p"
                  />
                </div>

                <div className={`w-[90%] px-5 my-2`}>
                  <p className="text-[#4D5959] text-left">Product Date</p>
                  <ReactDatePicker
                    autoComplete="off"
                    className={`w-full outline-[#99d5e9] ${
                      errors.productDate ? "outline-[red] border-red-300" : ""
                    } rounded-md p-2 my-2 bg-[#ffffff] border-[0.5px] border-slate-300`}
                    selected={values.productDate}
                    onChange={(date) => {
                      setFieldValue("productDate", date);
                    }}
                    placeholderText="Date of product"
                    name="startDate"
                    dateFormat="dd/MM/yyyy"
                  />

                  <ErrorMessage
                    className="text-[red] text-left"
                    name="productDate"
                    component="p"
                  />
                </div>
                <div className="flex flex-col justify-center my-5 items-center w-full">
                  <button
                    type="submit"
                    className="bg-[#232536] px-10 py-2 xs:w-[90%] sm:w-[60%] md:w-[60%] lg:w-[50%] rounded-lg text-white"
                    // disabled={isSubmitting}
                  >
                    Add Product
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterProduct;
