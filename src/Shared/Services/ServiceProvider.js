import request from './Request';
import { httpVerbs } from '../Constants';

function get(url) {
  return request({
    url:    url,
    method: httpVerbs.Get
  });
}

function create(url, data) {
    return request({
      url:    url,
      method: httpVerbs.Post,
      data:  data
    });
  }

  const ServiceProvider = {
    get, create
  }
  
  export default ServiceProvider;