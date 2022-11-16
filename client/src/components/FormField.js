import React from "react";
import { Field, ErrorMessage } from "formik";

function FormField({ type, name, label, placeholder, isLogin }) {
  return (
    <div className={`w-[90%] md:w-[90%] px-5 my-2`}>
      <p className="text-[#4D5959] text-left my-1">{label}</p>
      <Field
        placeholder={placeholder}
        className="w-full outline-[#99d5e9] rounded-md p-2 my-2 bg-[#ffffff] border-[0.5px] border-slate-300"
        type={type}
        name={name}
      ></Field>
      <ErrorMessage
        className="text-[red] text-left"
        name={name}
        component="p"
      />
    </div>
  );
}

export default FormField;
