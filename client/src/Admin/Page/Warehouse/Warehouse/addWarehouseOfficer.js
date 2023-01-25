import { ErrorMessage, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import FormField from "../../../../components/FormField";
import Loader from "../../../../components/Loader";
import * as Yup from "yup";
import { getRoleService } from "../../../../service/roleService";
import { signupService } from "../../../../service/userService";
import CustomToast from "../../../../components/CustomToast";

const AddWarehouseOfficer = () => {
  const [role, setRole] = useState([]);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required().label("First Name"),
    lastName: Yup.string().required().label("Last Name"),
    phoneNumber: Yup.string().required().label("Phone Number"),
    email: Yup.string().email().required().label("Email"),
    role: Yup.string().required().label("Role"),
    password: Yup.string().required().label("Password"),
  });

  const getRole = async () => {
    setLoading(true);
    try {
      const { data } = await getRoleService();
      if (data.length) {
        setRole(data);
      }
    } catch (error) {
      console.log(error.response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getRole();
    return () => {
      setRole([]);
    };
  }, []);

  const handleSignup = async (values) => {
    setLoading(true);
    try {
      values.bank = "1000220611";
      const { data } = await signupService(values);
      if (data) {
        CustomToast("success", data);
      }
    } catch (error) {
      CustomToast("error", error?.response?.data);
      console.log(error.response.data);
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col my-5 py-5 items-center justify-center w-full">
      {loading && <Loader />}

      <div className="block border-[1px] border-slate-200 w-[90%] md:w-[50%] shadow-xl rounded-lg">
        <div className="text-center">
          <h4 className="text-xl font-semibold pb-1">
            ECX eTrading add warehouse officer
          </h4>
        </div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            password: "",
            role: "",
          }}
          onSubmit={(values) => {
            handleSignup(values);
          }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="flex flex-col flex-wrap w-[100%] items-center rounded-lg">
              <FormField label="First Name" name="firstName" type="text" />
              <FormField label="Last Name" name="lastName" type="text" />
              <FormField label="Email" name="email" type="email" />
              <FormField label="Phone Number" name="phoneNumber" type="text" />
              <FormField label="Password" name="password" type="password" />

              <div className="w-[90%] px-5 my-2">
                <label
                  htmlFor="field"
                  className="block mb-2 text-left text-[#4D5959]"
                >
                  Select Role
                </label>
                <select
                  onChange={(e) => {
                    setFieldValue("role", e.currentTarget.value);
                  }}
                  id="field"
                  className="bg-gray-50 outline-[#99d5e9] text-gray-900 rounded-lg w-full p-2.5 "
                >
                  <option value="">Select</option>
                  <option value={role[3]?._id} className="capitalize">
                    {role[3]?.roleName} officer
                  </option>
                </select>
                <ErrorMessage
                  className="text-[red] text-left"
                  name="role"
                  component="p"
                />
              </div>

              <div className="flex flex-col justify-center my-5 items-center w-full">
                <button
                  type="submit"
                  className="bg-[#232536] px-10 py-2 xs:w-[90%] sm:w-[60%] md:w-[60%] lg:w-[50%] rounded-lg text-white"
                  disabled={isSubmitting}
                >
                  Add Warehouse Officer
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddWarehouseOfficer;
