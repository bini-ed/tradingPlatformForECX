import { ErrorMessage, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import * as Yup from "yup";

import Background from "../asset/bg.png";
import FormField from "../components/FormField";
import CustomToast from "../components/CustomToast";
import Loader from "../components/Loader";
import { getRoleService } from "../service/roleService";
import {
  getUserInformationService,
  signupService,
} from "../service/userService";

const UserInformation = () => {
  const [user, setRole] = useState({});
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
      const { data } = await getUserInformationService(
        localStorage.getItem("userInfo")
      );
      if (data) {
        console.log(data);
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
      const { data } = await signupService(values);
      if (data) {
        CustomToast("success", data);
        window.location = "/login";
      }
    } catch (error) {
      CustomToast("error", error?.response?.data);
      console.log(error.response.data);
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col min-h-screen py-5 items-center justify-center w-full">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center w-full items-center  h-[90%] text-gray-800">
          <div className="border-[1px] border-slate-200 shadow-xl w-[90%] sm:w-[80%] md:w-[50%] rounded-lg">
            <div className="p-15 md:mx-6">
              <div className="text-center">
                <h4 className="text-xl font-semibold pb-1">My Profile</h4>
              </div>
              <Formik
                initialValues={{
                  firstName: user?.firstName,
                  lastName: user?.lastName,
                  phoneNumber: user?.phoneNumber,
                  email: user?.email,
                  password: user?.password,
                  role: user?.role,
                }}
                onSubmit={(values) => {
                  handleSignup(values);
                }}
                validationSchema={validationSchema}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form className="flex flex-col flex-wrap w-[100%] items-center rounded-lg">
                    <FormField
                      label="First Name"
                      name="firstName"
                      type="text"
                    />
                    <FormField label="Last Name" name="lastName" type="text" />

                    <FormField label="Email" name="email" type="email" />
                    <FormField
                      label="Phone Number"
                      name="phoneNumber"
                      type="text"
                    />

                    <div className="flex flex-col justify-center my-5 items-center w-full">
                      <button
                        type="submit"
                        className="bg-[#232536] px-10 py-2 xs:w-[90%] sm:w-[60%] md:w-[60%] lg:w-[50%] rounded-lg text-white"
                        // disabled={isSubmitting}
                      >
                        Update
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInformation;
