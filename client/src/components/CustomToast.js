import { toast } from "react-toastify";

function CustomToast(status, data) {
  const toastProperty = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };
  return status == "success"
    ? toast.success(data, toastProperty)
    : toast.error(data, toastProperty);
}

export default CustomToast;
