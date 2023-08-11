import React, { useEffect, useState } from "react";
import CustomToast from "../../components/CustomToast";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";
import { addTransactionService } from "../../Admin/service/transactionService";
import { useParams } from "react-router-dom";
import { getAuctionRoomUsingProductIdService } from "../../service/auctionService";
import { getBidsForSpecificAuctionService } from "../../service/bidService";
import Loader from "../../components/Loader";

const AddTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [bid, setBid] = useState({});
  const [bank, setBank] = useState("");
  const { warehouseId } = useParams();
  const validationSchema = Yup.object().shape({
    picture: Yup.mixed()
      .required()
      .test(
        "FILE_TYPE",
        "Invalid file type, Only images and pdf is allowed",
        (value) =>
          value &&
          ["image/png", "image/jpg", "image/jpeg", "pdf"].includes(value.type)
      )
      .label("Picture "),
  });

  const handleRegister = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("document", values.picture);
    const bidId = bid._id;
    try {
      const { data } = await addTransactionService(bidId, formData);
      if (data) {
        CustomToast("success", data);
      }
    } catch (error) {
      CustomToast(
        "error",
        error?.response?.data ? error?.response?.data : error.message
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    getAuction();
    return () => {
      setBid([]);
    };
  }, []);

  const getAuction = async () => {
    setLoading(true);
    try {
      await getAuctionRoomUsingProductIdService(warehouseId).then(
        async ({ data }) => {
          setBank(data?.seller?.bank);
          const res = await getBidsForSpecificAuctionService(data._id);
          if (res.data) setBid(res.data);
        }
      );
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-90px)]">
          <p className="block text-gray-500 text-2xl font-semibold text-left my-1 pr-4">
            Please upload a bank statement image
          </p>
          <Formik
            initialValues={{
              picture: "",
            }}
            onSubmit={(values) => {
              handleRegister(values);
            }}
            validationSchema={validationSchema}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form className="flex flex-col shadow-2xl w-[70%] p-5 items-center rounded-lg">
                <div className={`w-[90%] md:w-[70%] px-5 my-2`}>
                  {/* {console.log(bank)} */}
                  <p className="block text-gray-500 font-semibold text-left my-1 pr-4">
                    Bank Account: {bank}
                  </p>
                  <p className="block text-gray-500 font-semibold text-left my-1 pr-4">
                    Picture
                  </p>
                  <input
                    className="w-full outline-[#99d5e9] rounded-md p-2 my-2 bg-[#EFF0F2]"
                    name="picture"
                    type="file"
                    onChange={(e) =>
                      setFieldValue("picture", e.target.files[0])
                    }
                  ></input>
                  <ErrorMessage
                    className="text-[red]"
                    name={"picture"}
                    component="p"
                  />
                </div>

                <div className="flex flex-col justify-center my-5 items-center w-full">
                  <button
                    type="submit"
                    className="bg-[#232536] px-10 py-2 xs:w-[90%] md:w-[40%] lg:w-[30%] rounded-lg text-white"
                    // disabled={isSubmitting}
                  >
                    Add Transaction
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default AddTransaction;
