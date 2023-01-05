import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";

import FormField from "../../../../components/FormField";
import CustomToast from "../../../../components/CustomToast";
import { addProductService } from "../../../../service/productService";
import Loader from "../../../../components/Loader";
import { addPriceService } from "../../../service/priceService";

const AddPrice = () => {
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    priceMax: Yup.string().required().label("Maximum Price"),
    priceMin: Yup.string().required().label("Minimum Price"),
    type: Yup.string().required().label("Product Type"),
    grade: Yup.string().required().label("Product Grade"),
  });

  const handleAddPrice = async (values) => {
    setLoading(true);
    try {
      const { data } = await addPriceService(values);
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
            priceMax: "",
            priceMin: "",
            type: "",
            grade: "",
          }}
          onSubmit={(values) => {
            handleAddPrice(values);
          }}
          validationSchema={validationSchema}
        >
          {({ errors }) => (
            <div className="w-full flex justify-center">
              <Form className="flex flex-col flex-wrap w-[90%] md:w-[70%] lg:w-[60%] lg:max-w-[500px]  rounded-lg bg-slate-200 items-center">
                <FormField
                  label="Product Grade"
                  name="grade"
                  type="text"
                  error={errors.grade}
                />

                <FormField
                  label="Product Type"
                  name="type"
                  type="text"
                  error={errors.type}
                />
                <FormField
                  label="Maximum Price"
                  name="priceMax"
                  type="text"
                  error={errors.priceMax}
                />
                <FormField
                  label="Minimum Price"
                  name="priceMin"
                  type="text"
                  error={errors.priceMin}
                />

                <div className="flex flex-col justify-center my-5 items-center w-full">
                  <button
                    type="submit"
                    className="bg-[#232536] px-10 py-2 xs:w-[90%] sm:w-[60%] md:w-[60%] lg:w-[50%] rounded-lg text-white"
                    // disabled={isSubmitting}
                  >
                    Add Price
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

export default AddPrice;
