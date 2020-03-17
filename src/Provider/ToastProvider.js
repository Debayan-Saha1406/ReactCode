 
 import { toast } from "react-toastify";
 import { statusCode } from "../Shared/Constants";
 
 export const showToast =(status) => {
    return toast.error(statusCode[status], {
      position: toast.POSITION.TOP_RIGHT
    });
  }