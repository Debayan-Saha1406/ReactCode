import axios from "axios";
import { apiUrl, statusCode } from "../Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const token = "";

const client = axios.create({
  baseURL: apiUrl.baseUrl,
  auth: { Authorization: "Bearer " + { token } }
});

const request = async function(options) {
  const onSuccess = function(response) {
    return response.data;
  };

  const onError = function(error) {
    if (error.response) {
      showToast(error.response.status);
    } else {
      console.log("Error Message:", error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

function showToast(status) {
  toast.error(statusCode[status], {
    position: toast.POSITION.TOP_RIGHT
  });
}

export default request;



