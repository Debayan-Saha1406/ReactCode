import request from "../Shared/Services/RequestService";
import { httpVerbs, apiKey } from "../Shared/Constants";

function get(url) {
  return request({
    url: url,
    method: httpVerbs.Get,
  });
}

function getWithParam(url, id) {
  return request({
    url: url + id,
    method: httpVerbs.Get,
  });
}

function getWithTwoParams(url, id1, id2) {
  return request({
    url: url + id1 + "/" + id2,
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

function newsApiUrlGet(url, currentPage, mediaType) {
  return request({
    url: url + mediaType + `/day?api_key=${apiKey}&page=` + currentPage,
    method: httpVerbs.Get,
  });
}

const ServiceProvider = {
  get,
  post,
  put,
  deleteItem,
  getWithParam,
  getWithTwoParams,
  newsApiUrlGet,
};

export default ServiceProvider;
