import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import FormField from "../../components/FormField";

const RegisterProduct = () => {
  const validationSchema = Yup.object().shape({
    productName: Yup.string().required().label("Product Name"),
    quantity: Yup.string().required().label("Quantity"),
    location: Yup.string().required().label("Location"),
    productType: Yup.string().required().label("Product Type"),
    productDate: Yup.string().required().label("Product Date"),
  });

  return (
    <div className="w-full flex flex-col justify-center min-h-[calc(100vh-66px)]">
      <div className="p-15 md:mx-6">
        <div className="text-center">
          <h4 className="text-xl font-semibold block text-gray-500 my-1 ">
            ECX eTrading Admin Panel
          </h4>
        </div>
        <Formik
          initialValues={{
            productName: "",
            quantity: "",
            location: "",
            productType: "",
            productDate: "",
          }}
          onSubmit={(values) => {
            // handleSignup(values);
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
                />
                <FormField
                  label="Product Quantity"
                  name="quantity"
                  type="text"
                  error={errors.quantity}
                />
                <FormField
                  label="Location"
                  name="location"
                  type="text"
                  error={errors.location}
                />
                <FormField
                  label="Product Type"
                  name="productType"
                  type="text"
                  error={errors.productType}
                />
                <FormField
                  label="Product Date"
                  name="productDate"
                  type="text"
                  error={errors.productDate}
                />
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
