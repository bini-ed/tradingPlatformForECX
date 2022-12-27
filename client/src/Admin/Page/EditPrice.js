import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import CustomToast from "../../components/CustomToast";
import FormField from "../../components/FormField";
import Loader from "../../components/Loader";
import { editPriceService, getPriceByIdService } from "../service/priceService";

const EditPrice = () => {
  const { priceId } = useParams();
  const [price, setPrice] = useState({});
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    priceMax: Yup.string().required().label("Maximum Price"),
    priceMin: Yup.string().required().label("Minimum Price"),
    type: Yup.string().required().label("Product Type"),
    grade: Yup.string().required().label("Product Grade"),
  });

  useEffect(() => {
    getPrice();
  }, []);

  const getPrice = async () => {
    setLoading(true);
    try {
      const { data } = await getPriceByIdService(priceId);
      if (data) setPrice(data);
    } catch (error) {
      CustomToast("error", error.response.data ?? error.message);
    }
    setLoading(false);
  };

  const handleEditPrice = async (values) => {
    setLoading(true);
    values.id = priceId;
    try {
      const { data } = await editPriceService(values);
      if (data) CustomToast("success", data);
    } catch (error) {
      console.log(error);
      CustomToast("Error", error?.response?.data || error?.message);
    }
    setLoading(false);
  };

  return (
    <div>
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
                priceMax: price?.priceMax,
                priceMin: price?.priceMin,
                type: price.type,
                grade: price.grade,
              }}
              onSubmit={(values) => {
                handleEditPrice(values);
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
        )}
      </div>
    </div>
  );
};

export default EditPrice;
