import React from "react";
import { Field, ErrorMessage } from "formik";

function FormField({ type, name, label, error }) {
  return (
    <div className={`w-[90%] px-5 my-2`}>
      <label
        className="block text-gray-500 font-semibold text-left my-1 pr-4"
        htmlFor={name}
      >
        {label}
      </label>
      {/* <p className="text-[#4D5959] text-left my-1">{label}</p> */}

      <Field
        placeholder={label}
        className={`w-full outline-[#99d5e9] ${
          error ? "outline-[red] border-red-300" : ""
        } rounded-md p-2 my-2 bg-[#ffffff] border-[0.5px] border-slate-300`}
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
