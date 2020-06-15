import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

const defaultResponseOptions = {
  fullResponse: false,
};

const makeAxiosRequest = (requestOptions, responseOptions = defaultResponseOptions) =>
  trackPromise(
    axios(requestOptions)
      .then(response => (responseOptions.fullResponse ? response : response.data))
      .catch(error => {
        throw responseOptions.fullResponse ? error.response : error.response.data;
      })
  );

export default class Request {
  static get(url, params) {
    const requestOptions = { method: 'get', url };
    if (params) {
      Object.assign(requestOptions, { params });
    }
    return makeAxiosRequest(requestOptions);
  }

  static post(url, data, options) {
    const requestOptions = { method: 'post', url, data };
    return makeAxiosRequest(requestOptions, options);
  }

  static put(url, data, options) {
    const requestOptions = { method: 'put', url, data };
    return makeAxiosRequest(requestOptions, options);
  }

  static delete(url, params, options) {
    const requestOptions = { method: 'delete', url, params };
    return makeAxiosRequest(requestOptions, options);
  }
}
