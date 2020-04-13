import axios from "axios";
import { apiUrl } from "../Constants";
import "react-toastify/dist/ReactToastify.css";
import { showErrorMessage } from "../../Provider/ToastProvider";

const token = "";

const client = axios.create({
  baseURL: apiUrl.baseUrl,
  auth: { Authorization: "Bearer " + { token } },
});

const request = async function (options) {
  const onSuccess = function (response) {
    return response;
  };

  const onError = function (error) {
    return error.response || error.message;
  };

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export default request;
