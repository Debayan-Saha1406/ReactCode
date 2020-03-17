import axios from "axios";
import { apiUrl} from "../Constants";
import "react-toastify/dist/ReactToastify.css";
import {showToast} from "../../Provider/ToastProvider";

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

export default request;



