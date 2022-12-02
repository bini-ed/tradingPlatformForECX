import React, { useState } from "react";

import { Form, Formik } from "formik";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";

import Background from "../asset/bgm.png";
import FormField from "../components/FormField";

import CustomToast from "../components/CustomToast";
import Loader from "../components/Loader";
import { loginService } from "../service/userService";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().required().label("Password"),
  });

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const { data } = await loginService(values);
      if (data) {
        // console.log(data);
        localStorage.setItem("userInfo", data);
        window.location = "/";
      }
    } catch (error) {
      CustomToast("error", error.response.data);

      console.log(error.response.data);
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen  h-full">
      {loading && <Loader />}
      <div className="flex justify-center items-center flex-wrap h-full w-[90%] sm:w-[80%] md:w-[90%] text-gray-800">
        <div className="w-[100%] xl:w-10/12">
          <div className="block border-[1px] border-slate-200 shadow-lg rounded-lg">
            <div className="lg:flex lg:flex-wrap g-0">
              <div className="w-[100%] lg:w-6/12 px-4 md:px-0">
                <div className="md:p-12 md:mx-6">
                  <div className="text-center mt-5">
                    <h4 className="text-xl font-semibold pb-1">ECX eTrading</h4>
                  </div>

                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                    }}
                    onSubmit={(values) => {
                      handleLogin(values);
                    }}
                    validationSchema={validationSchema}
                  >
                    {({ isSubmitting, setFieldValue }) => (
                      <Form className="flex flex-col flex-wrap w-[100%] items-center rounded-lg">
                        <FormField
                          label="Email"
                          name="email"
                          type="email"
                          placeholder="Email"
                        />

                        <FormField
                          label="Password"
                          name="password"
                          type="password"
                          placeholder="Password"
                        />
                        <div className="flex flex-col justify-center my-5 items-center w-full">
                          <button
                            type="submit"
                            className="bg-[#232536] px-10 py-2 xs:w-[90%] md:w-[40%] lg:w-[30%] rounded-lg text-white"
                            // disabled={isSubmitting}
                          >
                            Login
                          </button>

                          <NavLink to="/signup" className="text-[#232536] my-5">
                            Don't have an Account? Signup
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
                  <img src={Background}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
