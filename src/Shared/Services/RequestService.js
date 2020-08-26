import axios from "axios";
import { apiUrl, constants } from "../Constants";
import "react-toastify/dist/ReactToastify.css";
import { showErrorMessage } from "../../Provider/ToastProvider";
import { getLocalStorageItem } from "./../../Provider/LocalStorageProvider";

let token = "";

const client = axios.create({
  baseURL: apiUrl.baseUrl,
  headers: {
    Authorization: {
      toString() {
        return `Bearer ${token}`;
      },
    },
  },
});

axios.interceptors.response.use(
  function (response) {
    debugger;
    response.headers["Access-Control-Allow-Origin:"] = "*";
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const request = async function (options) {
  const onSuccess = function (response) {
    return response;
  };

  const onError = function (error) {
    return error.response || error.message;
  };

  try {
    token =
      getLocalStorageItem(constants.userDetails) !== null
        ? getLocalStorageItem(constants.userDetails).accessToken
        : null;
    debugger;
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export default request;
