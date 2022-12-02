import { ErrorMessage, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import * as Yup from "yup";

import Background from "../asset/bg.png";
import FormField from "../components/FormField";
import CustomToast from "../components/CustomToast";
import Loader from "../components/Loader";
import { getRoleService } from "../service/roleService";
import { signupService } from "../service/userService";

function SignUpPage() {
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
      {loading && <Loader />}
      <div className="flex justify-center items-center flex-wrap h-[90%] w-[90%] sm:w-[80%] md:w-[90%] text-gray-800">
        <div className=" w-[100%] xl:w-10/12">
          <div className="block border-[1px] border-slate-200 shadow-xl rounded-lg">
            <div className="lg:flex lg:flex-wrap g-0">
              <div className="w-[100%] lg:w-6/12 px-2 md:px-0">
                <div className="p-15 md:mx-6">
                  <div className="text-center">
                    <h4 className="text-xl font-semibold pb-1">ECX eTrading</h4>
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
                        <FormField
                          label="First Name"
                          name="firstName"
                          type="text"
                        />
                        <FormField
                          label="Last Name"
                          name="lastName"
                          type="text"
                        />

                        <FormField label="Email" name="email" type="email" />
                        <FormField
                          label="Phone Number"
                          name="phoneNumber"
                          type="text"
                        />
                        <FormField
                          label="Password"
                          name="password"
                          type="password"
                        />

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
                            <option value={role[0]?._id} className="">
                              {role[0]?.roleName}
                            </option>
                            <option value={role[1]?._id} className="">
                              {role[1]?.roleName}
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
                            // disabled={isSubmitting}
                          >
                            Sign up
                          </button>

                          <NavLink to="/login" className="text-[#232536] my-5">
                            Already have an Account? Login
                          </NavLink>
                          <NavLink to="/" className="text-[#4a764d] my-5">
                            Back to home
                          </NavLink>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              <div className="lg:w-6/12 hidden lg:flex bg-slate-100 justify-center items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none">
                <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                  <img src={Background} style={{ width: "1920px" }}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
