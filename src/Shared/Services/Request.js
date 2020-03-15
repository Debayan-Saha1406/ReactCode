import axios     from 'axios'
import { apiUrl } from '../Constants';

const token = "";

const client = axios.create({baseURL: apiUrl.baseUrl, auth: { Authorization: 'Bearer ' + {token} } });

const request = async function(options) {
  const onSuccess = function(response) {
    console.log('Request Successful!', response);
    return response.data;
  }

  const onError = function(error) {
    console.log('Request Failed:', error.config);

    if (error.response) {
      console.log('Status:',  error.response.status);
      console.log('Headers:', error.response.headers);

    } else {
      console.log('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  }

  try {
    const response = await client(options);
    return onSuccess(response);
  }
  catch (error) {
    return onError(error);
  }
}

export default request;