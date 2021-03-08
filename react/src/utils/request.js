import axios from 'axios';
function formatUrl(url) {
  let checkIsParamsExit = url.split('').find(text => text === '?');
  return url + `${checkIsParamsExit ? '&' : '?'}token=${localStorage.getItem('access_token_ebni')}`;
}

const makeAxiosRequest = async requestOptions => {
  try {
    const res = await axios(requestOptions);
    if (res.status >= 200 && res.status < 400) {
      return res;
    } else if (res.status === 401) {
      localStorage.removeItem('access_token_ebni');
      localStorage.removeItem('bni_UserRole');
      window.location.replace('/auth/login');
      window.location.reload();
    } else if (res.status === 404) {
      window.location.replace('/not-found');
    }
  } catch (error) {
    throw error;
  }
};

export default class Request {
  static get(url, params) {
    url = formatUrl(url);
    const requestOptions = { method: 'get', url };
    if (params) {
      Object.assign(requestOptions, { params });
    }
    return makeAxiosRequest(requestOptions);
  }
  static getWithAuth(url) {
    url = formatUrl(url);
    const requestOptions = {
      method: 'get',
      url,
      // headers: {
      //   'x-access-token': localStorage.getItem('access_token_ebni'),
      // },
    };
    return makeAxiosRequest(requestOptions);
  }

  static getFileWithAuth(url) {
    url = formatUrl(url);
    const requestOptions = {
      method: 'get',
      url,
      headers: {
        // 'x-access-token': localStorage.getItem('access_token_ebni'),
        'Content-Type': 'application/json',
      },
      responseType: 'blob',
    };
    return makeAxiosRequest(requestOptions);
  }

  static post(url, data) {
    url = formatUrl(url);
    const requestOptions = {
      method: 'post',
      url,
      data,
    };
    return makeAxiosRequest(requestOptions);
  }
  static postWithAuth(url, data, isFormData) {
    url = formatUrl(url);
    const requestOptions = {
      method: 'post',
      url,
      data,
      headers: {
        'Content-Type': isFormData ? 'application/x-www-form-urlencoded' : 'application/json',
        // 'x-access-token': localStorage.getItem('access_token_ebni'),
      },
    };
    return makeAxiosRequest(requestOptions);
  }

  static postFileWithAuth(url, data, isFormData) {
    url = formatUrl(url);
    const requestOptions = {
      method: 'post',
      url,
      data,
      headers: {
        'Content-Type': isFormData ? 'application/x-www-form-urlencoded' : 'application/json',
        // 'x-access-token': localStorage.getItem('access_token_ebni'),
      },
      responseType: 'blob',
    };
    return makeAxiosRequest(requestOptions);
  }

  static put(url, data) {
    url = formatUrl(url);
    const requestOptions = { method: 'put', url, data };
    return makeAxiosRequest(requestOptions);
  }

  static putWithAuth(url, data, isFormData) {
    url = formatUrl(url);
    const requestOptions = {
      method: 'put',
      url,
      data,
      headers: {
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        // 'x-access-token': localStorage.getItem('access_token_ebni'),
      },
    };
    return makeAxiosRequest(requestOptions);
  }

  static delete(url, params) {
    url = formatUrl(url);
    const requestOptions = { method: 'delete', url, params };
    return makeAxiosRequest(requestOptions);
  }

  static deleteWithAuth(url, data, isFormData) {
    url = formatUrl(url);
    const requestOptions = {
      method: 'delete',
      url,
      data,
      headers: {
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        // 'x-access-token': localStorage.getItem('access_token_ebni'),
      },
    };
    return makeAxiosRequest(requestOptions);
  }
}
