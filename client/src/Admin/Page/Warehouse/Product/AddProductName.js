import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

import FormField from "../../../../components/FormField";
import CustomToast from "../../../../components/CustomToast";
import Loader from "../../../../components/Loader";
import { addProductNameService } from "../../../service/productNameService";

const AddProductName = () => {
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    productName: Yup.string().required().label("Product Name"),
    grade: Yup.array().min(1).required().label("Product Grade"),
  });

  const [inputList, setInputList] = useState([{ grade: "" }]);
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { grade: "" }]);
  };

  const handleAddProductName = async (values) => {
    setLoading(true);
    try {
      const { data } = await addProductNameService(values);
      if (data) CustomToast("success", data);
    } catch (error) {
      console.log(error);
      CustomToast("Error", error?.response?.data || error?.message);
    }
    setLoading(false);
    console.log(values);
  };
  return (
    <div className="w-full flex flex-col justify-center min-h-[calc(100vh-66px)]">
      {loading && <Loader />}
      <div className="p-15 md:mx-6">
        <div className="text-center">
          <h4 className="text-xl font-semibold block text-gray-500 my-1 ">
            ECX eTrading Warehouse officer Panel
          </h4>
        </div>
        <Formik
          initialValues={{
            productName: "",
            grade: [],
          }}
          onSubmit={(values) => {
            handleAddProductName(values);
          }}
          validationSchema={validationSchema}
        >
          {({ values, errors, setFieldValue }) => (
            <div className="w-full flex justify-center">
              <Form className="flex flex-col flex-wrap w-[90%] md:w-[70%] lg:w-[60%] lg:max-w-[500px]  rounded-lg bg-slate-200 items-center">
                <FormField
                  label="Product Name"
                  name="productName"
                  type="text"
                />

                {inputList.map((x, i) => {
                  return (
                    <div key={i} className={`w-[90%]`}>
                      <div className="px-5 my-2 w-full">
                        <label
                          className="block text-gray-500 font-semibold text-left my-1 pr-4"
                          htmlFor={"grade"}
                        >
                          Product Grade
                        </label>
                        <div className="flex items-center">
                          <input
                            placeholder={"Product Grade"}
                            type={"text"}
                            name={"grade"}
                            value={x.grade}
                            onChange={(e) => {
                              handleInputChange(e, i);
                              setFieldValue("grade", inputList);
                            }}
                            className={`w-full  ${
                              errors.grade
                                ? "outline-[red] border-red-300"
                                : "outline-[#99d5e9]"
                            } rounded-md p-2 my-2 bg-[#ffffff] border-[0.5px] border-slate-300`}
                          />
                          <div className="ml-5">
                            {inputList.length !== 1 && (
                              <button onClick={() => handleRemoveClick(i)}>
                                Remove
                              </button>
                            )}
                            {inputList.length - 1 === i && (
                              <button onClick={handleAddClick}>Add</button>
                            )}
                          </div>
                        </div>
                        <ErrorMessage
                          className="text-[red] text-left"
                          name={"grade"}
                          component="p"
                        />
                      </div>
                    </div>
                  );
                })}

                <div className="flex flex-col justify-center my-5 items-center w-full">
                  <button
                    type="submit"
                    className="bg-[#232536] px-10 py-2 xs:w-[90%] sm:w-[60%] md:w-[60%] lg:w-[50%] rounded-lg text-white"
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

export default AddProductName;

// To add more input fields when the user clicks on a plus sign in ReactJS, you can follow these steps:

// Create a state variable to keep track of the number of input fields that are currently displayed.

// Create a function that will be called when the plus sign is clicked. This function should increase the value of the state variable by one.

// In the render method of your component, create a loop that generates the input fields based on the value of the state variable.

// Add an onClick event handler to the plus sign element that calls the function you created in step 2.

// Here's an example of how this could look:
class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numInputs: 1,
    };
  }

  handleAddInput = () => {
    this.setState((prevState) => ({ numInputs: prevState.numInputs + 1 }));
  };

  render() {
    const inputs = [];
    for (let i = 0; i < this.state.numInputs; i++) {
      inputs.push(<input key={i} />);
    }

    return (
      <div>
        {inputs}
        <button onClick={this.handleAddInput}>+</button>
      </div>
    );
  }
}

// This will create a form with one input field and
// a plus sign button.
//  When the plus sign button is clicked,
//  the handleAddInput function will be called,
//  which will increase the value of numInputs by one.
//  This will cause the component to re-render,
//  and an additional input field will be displayed.
