import { toast } from "react-toastify";
import { statusCode } from "../Shared/Constants";

export const showToast = status => {
  return toast.error(statusCode[status], {
    position: toast.POSITION.TOP_RIGHT
  });
};

export const showErrorMessage = msg => {
  return toast.error(msg, {
    position: toast.POSITION.TOP_RIGHT
  });
};
