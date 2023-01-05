import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import CustomToast from "../../../../components/CustomToast";
import { Form, Formik } from "formik";
import FormField from "../../../../components/FormField";
import Loader from "../../../../components/Loader";
import {
  editStorageService,
  getStorageByIdService,
} from "../../../service/storageService";

const EditWarehouse = () => {
  const { warehouseId } = useParams();
  const [warehouse, setWarehouse] = useState({});
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    warehouseName: Yup.string().required().label("Warehouse Name"),
    location: Yup.string().required().label("Warehouse Location"),
  });

  useEffect(() => {
    getWarehouse();
  }, []);

  const getWarehouse = async () => {
    setLoading(true);
    try {
      const { data } = await getStorageByIdService(warehouseId);
      if (data) setWarehouse(data);
    } catch (error) {
      CustomToast("error", error.response.data ?? error.message);
    }
    setLoading(false);
  };
  console.log(warehouse);

  const handleEditWarehouse = async (values) => {
    setLoading(true);
    values.id = warehouseId;
    try {
      const { data } = await editStorageService(values);
      if (data) {
        CustomToast("success", data.msg);
        setWarehouse(data.data);
      }
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
                ECX eTrading warehouse Panel
              </h4>
            </div>
            <Formik
              initialValues={{
                warehouseName: warehouse?.warehouseName,
                location: warehouse?.location,
              }}
              onSubmit={(values) => {
                handleEditWarehouse(values);
              }}
              validationSchema={validationSchema}
            >
              {() => (
                <div className="w-full flex justify-center">
                  <Form className="flex flex-col flex-wrap w-[90%] md:w-[70%] lg:w-[60%] lg:max-w-[500px]  rounded-lg bg-slate-200 items-center">
                    <FormField
                      label="Warehouse Name"
                      name="warehouseName"
                      type="text"
                    />
                    <FormField
                      label="Warehouse Location"
                      name="location"
                      type="text"
                    />

                    <div className="flex flex-col justify-center my-5 items-center w-full">
                      <button
                        type="submit"
                        className="bg-[#232536] px-10 py-2 xs:w-[90%] sm:w-[60%] md:w-[60%] lg:w-[50%] rounded-lg text-white"
                        // disabled={isSubmitting}
                      >
                        Edit warehouse
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

export default EditWarehouse;
