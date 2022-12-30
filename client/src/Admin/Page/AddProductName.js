import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

import FormField from "../../components/FormField";
import CustomToast from "../../components/CustomToast";
import Loader from "../../components/Loader";
import { addProductNameService } from "../service/productNameService";

const AddProductName = () => {
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    productName: Yup.string().required().label("Product Name"),
    productType: Yup.string().required().label("Product Type"),
    grade: Yup.string().required().label("Product Grade"),
  });

  const handleAddProductName = async (values) => {
    setLoading(true);
    try {
      const { data } = await addProductNameService(values);
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
            productType: [],
            grade: [],
          }}
          onSubmit={(values) => {
            handleAddProductName(values);
          }}
          validationSchema={validationSchema}
        >
          {({ values }) => (
            <div className="w-full flex justify-center">
              <Form className="flex flex-col flex-wrap w-[90%] md:w-[70%] lg:w-[60%] lg:max-w-[500px]  rounded-lg bg-slate-200 items-center">
                <FormField
                  label="Product Name"
                  name="productName"
                  type="text"
                />
                <FormField
                  label="Product Type"
                  name="productType"
                  type="text"
                />
                <FormField label="Product Grade" name="grade" type="text" />

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

export default AddProductName;
