import React from "react";

const LabelWithField = ({ label, value, pros }) => {
  return (
    <div className="w-[90%] md:w-[40%] my-5 h-[40px]">
      <p className="text-left text-[18px] my-2 text-slate-500">{label ?? ""}</p>
      <p
        className={`text-left text-[18px] bg-slate-200 ${pros} rounded-md p-2 text-slate-900`}
      >
        {value ?? ""}
      </p>
    </div>
  );
};

export default LabelWithField;
