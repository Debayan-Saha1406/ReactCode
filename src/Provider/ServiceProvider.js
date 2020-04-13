import request from "../Shared/Services/RequestService";
import { httpVerbs } from "../Shared/Constants";

function get(url) {
  return request({
    url: url,
    method: httpVerbs.Get,
  });
}

function getWithParams(url, paramName, paramValue) {
  return request({
    url: `${url}?${paramName}=${paramValue}`,
    method: httpVerbs.Get,
  });
}

function post(url, data) {
  return request({
    url: url,
    method: httpVerbs.Post,
    data: data,
  });
}

function put(url, id, data) {
  return request({
    url: url + id,
    method: httpVerbs.Put,
    data: data,
  });
}

function deleteItem(url, id) {
  return request({
    url: url + id,
    method: httpVerbs.Delete,
  });
}

const ServiceProvider = {
  get,
  post,
  put,
  deleteItem,
  getWithParams,
};

export default ServiceProvider;
