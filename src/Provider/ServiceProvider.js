import request from "../Shared/Services/RequestService";
import { httpVerbs } from "../Shared/Constants";

function get(url) {
  return request({
    url: url,
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

const ServiceProvider = {
  get,
  post,
};

export default ServiceProvider;
